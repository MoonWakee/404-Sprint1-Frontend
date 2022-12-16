import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { TextField, InputLabel, Button } from '@mui/material';
import authHeader from "./utils/authHeader";

const AddGroupForm = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        groupname: "",
        members: [],
        new: ""
    });

    const handleChange = (event) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
        }

    const handleAddMember = () => {
        setValues({
            ...values,
            members: [...values.members, values.new],
            new: ""
        })
    }

    const membersList = values.members.map((member) =>
        <li key= {member}>{member}</li>
    );

    const handleFormSubmit = async (event) => {
        console.log(values.groupname)
        console.log(values.members)
        event.preventDefault();
        try {
            const headers = {
                ...authHeader(), 
                Accept: 'application/json',
            }
            let res = await fetch("http://127.0.0.1:5000/api/group/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    group_name: values.groupname
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
        navigate('/calendar');
    }


    return (
            <div>
                <div>
                    <h2 className="title"> Add Group </h2>
                </div>
                <form>
                    <div>
                        <InputLabel> Group Name </InputLabel>
                        <TextField
                            className="input"
                            type="text"
                            name="groupname"
                            value={values.groupname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        Group Members
                    </div>
                    <div>
                        {membersList}
                    </div>
                    <div>
                        <TextField
                            className="input"
                            type="text"
                            name="new"
                            value={values.new}
                            onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleAddMember}
                        >Add Member</Button>
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleFormSubmit}
                        >Create Group</Button>
                    </div>
                </form>
            </div>
        );
    }

    export const AddGroupPage = () => (
          <AddGroupForm />
      );
