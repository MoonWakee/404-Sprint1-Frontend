import React, { useState } from "react";
import Button from "./component/button";
import { useNavigate } from "react-router-dom";


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
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
            <div>
                <div>
                    <h2 className="title"> Log In </h2>
                </div>
                <form>
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
                        {/* <button 
                        className="submit" onClick = {handleFormSubmit}> Sign Up </button> */}
                        <Button handleClick={handleFormSubmit} buttonLabel="Log In"></Button>
                    </div>
                </form>
            </div>
        );
    }

    export default LoginForm;
