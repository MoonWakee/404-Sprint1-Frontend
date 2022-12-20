import React, { useState, useEffect } from "react";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import authHeader from "../utils/authHeader";

const ListGroupPage = () => {
  let navigate = useNavigate();

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const headers = {
            ...authHeader(), 
            Accept: 'application/json',
        }
        let res = await fetch("http://127.0.0.1:5000/api/group/list", {
          method: "GET",
          headers: headers
        });
        let resJson = await res.json();
        console.log(resJson)
        setGroupList(resJson[0].groups);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, []);


  const group_items = groupList.map((group) =>
    <ul key={group.group_id}>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{group.group_name}</h5>
            </a>
            <a href = {"/group/"+ group.group_id} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View Group
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
             </a>
        </div>
    </ul>
    );

    const onClick = () => {
      navigate('/group/addgroup')
    }

  return (
    <div>
        <div>
            My Groups
        </div>
        <div>
            {group_items}
        </div>
        <div>
          <Button
            color="primary"
            onClick={onClick}
            >
            Create Group
          </Button>
        </div>
    </div>

    
  );
};

export default ListGroupPage;