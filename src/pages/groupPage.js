import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../utils/authHeader";
import { Button } from "devextreme-react";

const GroupPage = () => {

    const { id } = useParams()
    const [members, setMembers] = useState([])
    const [groupMemberList, setGroupMemberList] = useState([]);

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
                console.log(resJson)
                setGroupMemberList(resJson)
              } catch (err) {
                console.log(err);
              }
        }
        //fetchGroupData();
        fetchMembers();
      }, []);


      const handleAddMember = async (user) => {
            setGroupMemberList([...groupMemberList, user]);
      }

      const handleUpdate = async () => {
        try {

            const url = "http://127.0.0.1:5000/api/group/" + id
            let res = await fetch(url, {
              method: "PUT",
              headers: authHeader(),
              body: JSON.stringify({
                members: groupMemberList
              }),
            });
            let resJson = await res.json();
            console.log(resJson)
            setGroupMemberList(resJson)
          } catch (err) {
            console.log(err);
          }
      }

      const users = members.map((user) =>
        <ul key = {user.email}>
            {user.email}
            <Button onClick={() => handleAddMember(user)}>
                add
            </Button>
        </ul>
      );

      return (
        <div>
            {/* <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            
            <div id="dropdownSearch" class="hidden z-10 w-60 bg-white rounded shadow dark:bg-gray-700">
                <div class="p-3">
                    <label for="input-group-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="input-group-search" class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
                    </div>
                </div>
                <ul class="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                    {users}
                </ul>
                <a href="#" class="flex items-center p-3 text-sm font-medium text-red-600 bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                    <svg class="mr-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>
                    Delete user
                </a>
            </div> */}
            {users}
            <Button onClick = {handleUpdate}>
                done
            </Button>
        </div>
      )
}

export default GroupPage;