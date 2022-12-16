import React, { useState, useEffect } from "react";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import authHeader from "../utils/authHeader";

const ListGroupPage = () => {
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
        console.log(resJson[0].groups)
        setGroupList(resJson[0].groups);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, []);

  const handleClick = () => {

  }

  const group_items = groupList.map((group) =>
    <ul key={group.group_id}>
        <Button onClick={handleClick}>
            {group.group_name}
        </Button>
    </ul>
    );

  return (
    <div>
        <div>
            My Groups
        </div>
        <div>
            {group_items}
        </div>
    </div>
  );
};

export default ListGroupPage;