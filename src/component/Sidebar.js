import React, { useState, useEffect } from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";
import SearchIcon from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import authHeader from "../utils/authHeader";

function Sidebar({ selectGroup }) {
  const routeChange = (p) => {
    let isCur;
    if (p == window.location.pathname) {
      isCur = "/";
    } else {
      isCur = p;
    }
    window.location.pathname = isCur;
  };

  const fetchGroups = async () => {
    try {
      const headers = {
        ...authHeader(),
        Accept: "application/json",
      };
      let res = await fetch("http://127.0.0.1:5000/api/group/list", {
        method: "GET",
        headers: headers,
      });
      let resJson = await res.json();
      console.log(resJson);
      setGroupList(resJson[0].groups);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const [groupList, setGroupList] = useState([]);
  const [openDialog, setOpen] = useState(false);
  const [openGroupDialog, setOpenGroup] = useState(false);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [members, setMembers] = useState([]);
  const [values, setValues] = useState({
    groupname: "",
  });

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseGroupDialog = () => {
    setOpenGroup(false);
    setGroupId("");
    setGroupName("");
  };

  const handleOpenGroupDialog = (name, id) => {
    // console.log(name)
    setGroupId(id);
    console.log(id);
    setOpenGroup(true);
    setGroupName(name);
    fetchGroupData(id);
    fetchAllUsers();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers = {
        ...authHeader(),
        Content: "application/json",
      };
      let res = await fetch("http://127.0.0.1:5000/api/group/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          group_name: values.groupname,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      fetchGroups();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    // navigate('/listGroup');
  };

  const fetchAllUsers = async () => {
    try {
      const headers = {
        ...authHeader(),
        Accept: "application/json",
      };
      let res = await fetch("http://127.0.0.1:5000/api/user/list", {
        method: "GET",
        headers: headers,
      });
      let resJson = await res.json();
      console.log(resJson);
      setMembers(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGroupData = async (group_id) => {
    try {
      const headers = {
        ...authHeader(),
        Accept: "application/json",
      };
      console.log(group_id);
      const url = "http://127.0.0.1:5000/api/group/" + group_id;
      console.log(url);
      let res = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      let resJson = await res.json();
      console.log(resJson);
      setGroupMemberList(resJson.users);
      // setGroupName(resJson.group_name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (group_id) => {
    console.log("delete");
    try {
      const headers = {
        ...authHeader(),
        Accept: "application/json",
      };
      const url = "http://127.0.0.1:5000/api/group/" + group_id;
      await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      fetchGroups();
      setOpenGroup(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMember = async (user) => {
    console.log(user);
    try {
      const headers = {
        ...authHeader(),
      };
      const url = "http://127.0.0.1:5000/api/group/" + groupId;
      await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          userId: user.userId,
        }),
      });
      setGroupMemberList([...groupMemberList, user]);
      console.log(groupMemberList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside class="w-64" aria-label="Sidebar">
      <div class="min-h-screen py-4 px-3 bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2">
          <Dialog
            fullWidth={true}
            open={openDialog}
            onClose={handleCloseDialog}
            style={{ backgroundColor: "transparent" }}
          >
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
              <InputLabel> Group Name </InputLabel>
              <TextField
                className="input"
                type="text"
                name="groupname"
                value={values.groupname}
                onChange={handleChange}
              />
              <Button
                component="label"
                color="primary"
                onClick={handleFormSubmit}
              >
                Create Group
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <button
            onClick={handleOpenDialog}
            class="mb-2 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 22"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <span class="ml-3">Create group</span>
          </button>
          <li className="invisible">
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              <span class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>
          <Dialog
            fullWidth={true}
            open={openGroupDialog}
            onClose={handleCloseGroupDialog}
            style={{ backgroundColor: "transparent" }}
          >
            <DialogTitle>Group: {groupName}</DialogTitle>
            <DialogContent>
              <div>
                <h2>Members</h2>
                {groupMemberList.map((member) => (
                  <ul
                    key={member.userId}
                    style={{ display: "inline-flex", flexWrap: "nowrap" }}
                  >
                    <div>
                      <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg
                          class="absolute -left-1 w-12 h-12 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      {member.first_name == "" ? "N/A" : member.first_name}
                    </div>
                  </ul>
                ))}
                {"\n"}
                <h2>Add New Members</h2>
                {members
                  .filter((member) => {
                    let groupMembers = groupMemberList.map(
                      (member) => member.email
                    );
                    return !groupMembers.includes(member.email);
                  })
                  .map((member) => (
                    <ul class="py-3 sm:py-4" key={member.userId}>
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
                  ))}
              </div>
              <div>
                <Button onClick={() => handleDelete(groupId)} color="error">
                  Delete Group
                </Button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseGroupDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          {groupList.map((group) => (
            <li key={group.id}>
              <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span
                  class="flex-1 ml-3 whitespace-nowrap"
                  onClick={() => {
                    selectGroup(group);
                  }}
                >
                  {group.group_name}
                </span>
                <button
                  onClick={() =>
                    handleOpenGroupDialog(group.group_name, group.group_id)
                  }
                  class="mb-2 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                {/* <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg> */}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
