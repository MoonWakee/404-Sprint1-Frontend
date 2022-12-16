import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../utils/authHeader";
import { Button } from "devextreme-react";

const GroupPage = () => {

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


      const updateGroup = async (user) => {
        try {
            const headers = {
                ...authHeader(), 
            }
            const url = "http://127.0.0.1:5000/api/group/" + id
            let res = await fetch(url, {
              method: "PUT",
              headers: headers,
              body: JSON.stringify({
                userId: user.uuid
              }),
            });
            let resJson = await res.json();
            console.log(resJson);
            setGroupMemberList(resJson.users);
          } catch (err) {
            console.log(err);
          }
      }

      const users = members.map((user) =>
        <ul key = {user.email}>
            {user.email}
            <Button onClick={() => updateGroup(user)}>
                add
            </Button>
        </ul>
      );

      const currentGroupMembers = groupMemberList.map((member) => 
        <ul key = {member.email}   style={{display: 'inline-flex', flexWrap: 'nowrap'}} >
          <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300"> {member.firstname} </span>
          </div>
        </ul>
      )

      return (
        <div>
            <div>
              {"Group " + groupName}
              {"Members"}
              <div>
                {currentGroupMembers}  
              </div>     
            </div>

            {"Add Members"}
            {users}
            <div>
            <Button>
              Quit Group
            </Button>
            </div>
        </div>
      )
}



export default GroupPage;