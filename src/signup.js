import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "./chrome/Page";
import { TextField, InputLabel, Button, Grid } from "@mui/material";

const SignUpForm = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
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
      let res = await fetch(
        "http://127.0.0.1:5000/api/user/signup",
        {
          method: "POST",
          body: JSON.stringify({
            first_name: values.firstname,
            last_name: values.lastname,
            username: values.username,
            password: values.password,
            email: values.email,
          }),
        }
      );
      let resJson = await res.json();
      if (resJson.data.token) {
        localStorage.setItem("user", JSON.stringify(resJson.data))
      }
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign Up
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="uni@columbi.edu"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Donald"
                value={values.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ferguson"
                value={values.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="wemeet_love"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleFormSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    // <div className="px-64">
    //   <div>
    //     <h2 className="title"> Create Account </h2>
    //   </div>
    //   <form>
    //     <div>
    //       <InputLabel> Email </InputLabel>
    //       <TextField
    //         className="input"
    //         type="text"
    //         name="email"
    //         value={values.email}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <Grid container style={{marginTop : 15}}>
    //         <Grid item>
    //           <InputLabel> First Name </InputLabel>
    //           <TextField
    //             className="input"
    //             type="text"
    //             name="firstname"
    //             value={values.firstname}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <br />
    //         <Grid item style={{marginLeft : 30}}>
    //           <InputLabel> Last Name </InputLabel>
    //           <TextField
    //             className="input"
    //             type="text"
    //             name="lastname"
    //             value={values.lastname}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //       </Grid>
    //     </div>
    //     <div>
    //       <Grid container style={{marginTop : 15}}>
    //         <Grid item>
    //           <InputLabel> User Name </InputLabel>
    //           <TextField
    //             className="input"
    //             type="text"
    //             name="username"
    //             value={values.user_name}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item style={{marginLeft : 30}}>
    //           <InputLabel> Password </InputLabel>
    //           <TextField
    //             className="input"
    //             type="text"
    //             name="password"
    //             value={values.password}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //       </Grid>
    //     </div>
    //     <div>
    //       {/* <button
    //                     className="submit" onClick = {handleFormSubmit}> Sign Up </button> */}
    //       <Button
    //         style={{ marginTop: 20 }}
    //         variant="contained"
    //         component="label"
    //         color="primary"
    //         onClick={handleFormSubmit}
    //       >
    //         Sign Up
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
};

export const SignUpPage = () => (
  <Page title="Sign Up" maxWidth="lg">
    <SignUpForm />
  </Page>
);
