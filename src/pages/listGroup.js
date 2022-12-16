import React, { useState, useEffect } from "react";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import authHeader from "../utils/authHeader";

const ListGroupPage = () => {
  const [groupList, setGroupList] = useState([]);
  const navigate = useNavigate();

  const List = ({ list, onClick }) => (
    <ul>
      {list.map((item) => (
        <Button component="label" color="primary" onClick={onClick(item.uuid)}>
          {item.groupname}
        </Button>
      ))}
    </ul>
  );

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        let res = await fetch("http://127.0.0.1:5000/group/list", {
          method: "GET",
          headers: authHeader(),
        });
        let resJson = await res.json();
        console.log(resJson);
        setGroupList(resJson);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  });

  const handleClick = (groupid) => {
    const path = `/group/${groupid}`;
    navigate(path);
  };

  return (
    <div>
      <List list={grouplist} onClick={handleClick()} />
    </div>
  );
};

export default ListGroupPage;
