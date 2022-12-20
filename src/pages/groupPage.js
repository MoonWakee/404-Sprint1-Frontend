import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../utils/authHeader";
import { useNavigate } from "react-router-dom";
import { Button } from "devextreme-react";

const GroupPage = () => {
    let navigate = useNavigate();

    const { id } = useParams()
    const [members, setMembers] = useState([])
    const [groupMemberList, setGroupMemberList] = useState([]);
    const [groupName, setGroupName] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const headers = {
                ...authHeader(), 
                Accept: 'application/json',
            }
            let res = await fetch("http://127.0.0.1:5000/api/user/list", {
              method: "GET",
              headers: headers
            });
            let resJson = await res.json();
            console.log(resJson)
            setMembers(resJson)
          } catch (err) {
            console.log(err);
          }
        };

        const fetchGroupData = async () => {
            try {
                const headers = {
                    ...authHeader(), 
                    Accept: 'application/json',
                }
                const url = "http://127.0.0.1:5000/api/group/" + id
                let res = await fetch(url, {
                  method: "GET",
                  headers: headers
                });
                let resJson = await res.json();
                console.log(resJson);
                setGroupMemberList(resJson.users);
                setGroupName(resJson.group_name);
              } catch (err) {
                console.log(err);
              }
        }
        fetchGroupData();
        fetchMembers();
      }, []);

      const handleAddMember = async (user) => {
        console.log(user);
        try {
          const headers = {
              ...authHeader(), 
          }
          const url = "http://127.0.0.1:5000/api/group/" + id
          await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              userId: user.userId
            }),
          });
          setGroupMemberList([...groupMemberList, user])
          console.log(groupMemberList)
        } catch (err) {
          console.log(err);
        }
      }

      const handleDelete = async () => {
        console.log("delete")
        try {
          const headers = {
              ...authHeader(), 
              Accept: 'application/json',
          }
          const url = "http://127.0.0.1:5000/api/group/" + id
          await fetch(url, {
            method: "DELETE",
            headers: headers,
          });
          navigate('/listGroup');
        } catch (err) {
          console.log(err);
        }
      }

      const handleQuit = async () => {

      }

      const users = members.map((user) =>
        <ul key = {user.userId}>
            {user.email}
            <Button onClick={() => handleAddMember(user)}>
                add
            </Button>
        </ul>
      );

      // const nonMembers = members.filter(member => groupMemberList.includes(member)).map((member) => 
      //     <ul key = {member.userId}>
      //         {member.email}
      //         <Button onClick={() => handleAddMember(member)}>
      //             add
      //         </Button>
      //     </ul>
      // )

      const currentGroupMembers = groupMemberList.map((member) => 
        <ul key = {member.userId}   style={{display: 'inline-flex', flexWrap: 'nowrap'}} >
          <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300"> {member.first_name[0]} </span>
          </div>
        </ul>
      )

      return (
        <div>
            <div>
              {"Group " + groupName}
              <div>
                {currentGroupMembers}  
              </div>     
            </div>
            <div>
              {"Add Members"}
              {users}
            </div>
            <div>
              <Button onClick={handleQuit}>
                  Quit Group
              </Button>
            </div>
            <div>
                <Button onClick={handleDelete}>
                  Delete Group
                </Button>
            </div>
        </div>
      )
}



export default GroupPage;