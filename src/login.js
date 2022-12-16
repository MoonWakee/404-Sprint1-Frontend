import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from './chrome/Page';
import { TextField, InputLabel, Button } from '@mui/material';




const LoginForm = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // navigate("/AddSchedulePage", { replace: true });
        try {
            let res = await fetch("http://127.0.0.1:5000/users/login", {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            });
            let resJson = await res.json();
            if (resJson.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(resJson.data));
            }
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
                    <h2 className="title"> Log In </h2>
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
                        <InputLabel> Password </InputLabel>
                        <TextField
                            className="input"
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleFormSubmit}
                        >LogIn</Button>
                        <Button component="label" color="primary" onClick={() => navigate('/')}>
                            Signup
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    // export default LoginForm;

    export const LoginPage = () => (
        <Page title="Login" maxWidth="lg">
          <LoginForm />
        </Page>
      );
