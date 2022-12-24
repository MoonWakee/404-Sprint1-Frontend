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
            let res = await fetch("https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/user/list", {
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
                const url = "https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/group/" + id
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
          const url = "https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/group/" + id
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
          const url = "https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/group/" + id
          await fetch(url, {
            method: "DELETE",
            headers: headers,
          });
          navigate('/listGroup');
        } catch (err) {
          console.log(err);
        }
      }

      const checkMembership = (member) => {
        let groupMembers = groupMemberList.map((member) => member.email)
        return !groupMembers.includes(member.email)
      }

      const nonMembers = members.filter(checkMembership).map((member) => 
          // <ul key = {member.userId}>
          //     {member.email}
          //     <Button onClick={() => handleAddMember(member)}>
          //         add
          //     </Button>
          // </ul>
          <ul class="py-3 sm:py-4" key = {member.userId}>
              <div class="flex items-center space-x-4">
                <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {member.first_name}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {member.email}
                    </p>
                </div>
                <div class="items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Button onClick={() => handleAddMember(member)}>
                        add
                    </Button>
                </div>
              </div>
       </ul>
      )

      const currentGroupMembers = groupMemberList.map((member) => 
        <ul key = {member.userId}   style={{display: 'inline-flex', flexWrap: 'nowrap'}} >
          <div>
            <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            {member.first_name == "" ? "N/A": member.first_name }
          </div>
        </ul>
      )

      return (
        <div>
            <div>
              <p class="text-4xl font-medium text-gray-900 dark:text-white"> {groupName} </p>
              <div>
                <p class="text-xl text-gray-900 dark:text-white">Members</p>
              </div>
              <div>
                {currentGroupMembers}  
              </div>     
            </div>
            <div>
              <div>
                Add Members
              </div>
              {nonMembers}
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