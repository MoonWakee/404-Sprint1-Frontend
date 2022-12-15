import React, { useState } from "react";
import Button from "./component/button";
import { useNavigate } from "react-router-dom";


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
            let res = await fetch("http://127.0.0.1:5000/users/signup", {
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
        navigate("/", { replace: true });
    }


    return (
            <div>
                <div>
                    <h2 className="title"> Create Account </h2>
                </div>
                <form>
                    <div>
                        <label> First Name </label>
                        <input
                            className="input"
                            type="text"
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label> Last Name </label>
                        <input
                            className="input"
                            type="text"
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label> User Name </label>
                        <input
                            className="input"
                            type="text"
                            name="username"
                            value={values.user_name}
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
                        <label> Email </label>
                        <input
                            className="input"
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {/* <button 
                        className="submit" onClick = {handleFormSubmit}> Sign Up </button> */}
                        <Button handleClick={handleFormSubmit} buttonLabel="Sign Up"></Button>
                    </div>
                </form>
            </div>
        );
    }

    export default SignUpForm;
