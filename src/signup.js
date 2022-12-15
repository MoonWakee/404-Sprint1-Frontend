import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from './chrome/Page';
import { TextField, InputLabel, Button, Grid } from '@mui/material';



const SignUpForm = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: ""
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let res = await fetch("http://ec2-44-206-245-116.compute-1.amazonaws.com:5000/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    first_name: values.firstname,
                    last_name: values.lastname,
                    username: values.username,
                    password: values.password,
                    email: values.email
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
        navigate('/login');
    }


    return (
        <div>
            <div>
                <h2 className="title"> Create Account </h2>
            </div>
            <form>
                <div>
                    <InputLabel> Email </InputLabel>
                    <TextField
                        className="input"
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Grid container>
                        <Grid item>
                            <InputLabel> First Name </InputLabel>
                            <TextField
                                className="input"
                                type="text"
                                name="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <br />
                        <Grid item>
                            <InputLabel> Last Name </InputLabel>
                            <TextField
                                className="input"
                                type="text"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container>
                        <Grid item>
                            <InputLabel> User Name </InputLabel>
                            <TextField
                                className="input"
                                type="text"
                                name="username"
                                value={values.user_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel> Password </InputLabel>
                            <TextField
                                className="input"
                                type="text"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div>
                    {/* <button 
                        className="submit" onClick = {handleFormSubmit}> Sign Up </button> */}
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        onClick={handleFormSubmit}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}

export const SignUpPage = () => (
    <Page title="Sign Up" maxWidth="lg">
        <SignUpForm />
    </Page>
);
