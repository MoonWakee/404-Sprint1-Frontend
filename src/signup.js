import React, {useState} from "react";
import Button from "./component/button";


const SignUpForm = () => {
    const [values, setValues ] = useState({
        firstname: "",
        lastname: "",
        email: ""
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("hello")
    }


    return(
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
                        name = "firstname"
                        value = {values.firstname}
                        onChange = {handleChange}
                        />
                </div>
                <div>
                    <label> Last Name </label>
                    <input 
                        className="input" 
                        type="text" 
                        name = "lastname" 
                        value = {values.lastname}
                        onChange = {handleChange}
                        />
                </div>
                <div>
                    <label> Email </label>
                    <input 
                        className="input" 
                        type="text" 
                        name = "email" 
                        value = {values.email}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    {/* <button 
                        className="submit" onClick = {handleFormSubmit}> Sign Up </button> */}
                    <Button handleClick = {handleFormSubmit} buttonLabel = "Sign Up"></Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
