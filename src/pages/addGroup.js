import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { TextField, InputLabel, Button } from '@mui/material';
import authHeader from "../utils/authHeader";

const AddGroupForm = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        groupname: "",
    });

    const handleChange = (event) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
        }


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const headers = {
                ...authHeader(), 
                Content: 'application/json',
            }
            let res = await fetch("https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/group/", {
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
        navigate('/listGroup');
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
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleFormSubmit}
                        >Create Group
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    export const AddGroupPage = () => (
          <AddGroupForm />
      );
