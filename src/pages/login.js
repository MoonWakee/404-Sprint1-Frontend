import React, { useState } from "react";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: ""
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
                // headers: {
                //     "Content-Type": "application/json; charset=utf-8"
                // },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSignup = () => {
        navigate("/", { replace: true });
    }

    return (
            <div>
                <div>
                    <h2 className="title"> Login </h2>
                </div>
                <form>
                    <div>
                        <label> Username </label>
                        <input
                            className="input"
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label> Password </label>
                        <input
                            className="input"
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Button handleClick={handleFormSubmit} buttonLabel="Login"></Button>
                    </div>
                    <div>
                        <Button handleClick={handleSignup} buttonLabel="Sign Up"></Button>
                    </div>
                </form>
            </div>
        );
    }

export default LoginForm;
