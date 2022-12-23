import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import authHeader from "../utils/authHeader";

import { useNavigate, Link as RouterLink } from "react-router-dom";

class HeaderProps {
  title;
}

const getUserData = async () => {
  try {
    let res = await fetch("http://127.0.0.1:5000/api/user/info", {
      method: "GET",
      headers: {
        ...authHeader(),
      },
    });
    var data = await res.json();
    console.log(data);
    return await data;
  } catch (err) {
    console.error(err);
  }
};

export const Header = ({ title }) => {
  var user = localStorage.getItem("user");
  const [userName, setUserName] = useState(false);

  console.log(user);
  if (user) {
    getUserData().then(function (res) {
      console.log(res);
      var user_name = res["user_name"];
      console.log(user_name);
      setUserName(user_name)
    });
  }
  const navigate = useNavigate();
  var cur = false;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if (!user) setDropdownOpen(false);
  }, [user]);

  if (window.location.href === "http://localhost:3000/") cur = true;
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src={require("../wemeetlogo.png")}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              WeMeet
            </span>
          </a>

          <div className="absolute right-24 z-10">
            <a
              style={{ cursor: "pointer" }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                {
                  if (!user) cur ? navigate("/signup") : navigate("/");
                  else {
                    setDropdownOpen(!dropdownOpen);
                  }
                }
              }}
            >
              {user && 'Welcome, ' + userName}
              {!user && (cur ? "Sign Up" : "Log In")}
            </a>
          </div>
        </div>
      </nav>
      {dropdownOpen && (
        <div
          id="dropdownInformation"
          class="absolute right-24 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            class="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Page
              </a>
            </li>
          </ul>
          <div class="py-1">
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>

    // <AppBar position="static">
    //   <Toolbar>
    //     <Typography
    //       component={RouterLink}
    //       to="/"
    //       variant="h6"
    //       sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
    //     >
    //       WeMeet
    //     </Typography>
    //     <Button color="inherit" onClick={() => {
    //       {cur ? navigate("/login") : navigate("/")}
    //       }}
    //       >
    //       {cur ? "Sign Up" : "Log In"}
    //     </Button>
    //   </Toolbar>
    // </AppBar>
  );
};
