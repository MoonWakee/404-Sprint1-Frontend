import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "./chrome/Page";
import { TextField, InputLabel, Button } from "@mui/material";

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
      let res = await fetch(
        "http://ec2-44-206-245-116.compute-1.amazonaws.com:5000/users/login", 
        {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      let resJson = await res.json();
      if (resJson.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(resJson.data))
      }
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
    navigate("/calendar");
  };

  return (
    <div class="grid place-items-center h-screen">
      <div class="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our WeMeet
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            onSubmit={handleFormSubmit}
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="/login"
              class="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
    // <div className="px-64">
    //   <div>
    //     <h2 className="title"> Log In </h2>
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
    //       <InputLabel> Password </InputLabel>
    //       <TextField
    //         className="input"
    //         type="text"
    //         name="password"
    //         value={values.password}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <Button
    //         style={{ marginTop : 20 }}
    //         variant="contained"
    //         component="label"
    //         color="primary"
    //         onClick={handleFormSubmit}
    //       >
    //         Log In
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
};

// export default LoginForm;

export const LoginPage = () => (
  <Page title="Login" maxWidth="lg">
    <LoginForm />
  </Page>
);
