import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useNavigate, Link as RouterLink } from "react-router-dom";

class HeaderProps {
  title;
}

export const Header = ({ title }) => {
  const navigate = useNavigate();
  var cur = false;
  if (window.location.href === "http://localhost:3000/") cur = true;
  return (
    <nav class="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center">
          <img
            src={require('../wemeetlogo.png')}
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            WeMeet
          </span>
        </a>
        <div class="flex items-center md:order-2">
          <a
            style={{cursor : "pointer"}}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
                    {cur ? navigate("/login") : navigate("/")}
                    }}
          >
           {cur ? "Sign Up" : "Log In"}
          </a>
        </div>
        <div
          id="mega-menu"
          class="hidden justify-between items-center w-full text-sm md:flex md:w-auto md:order-1"
        >
          <ul class="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a
                href="/calendar"
                class="block py-2 pr-4 pl-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                My Calendar
              </a>
            </li>
            <li>
              <a
                href="/"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Groups
              </a>
            </li>
            <li>
              <a
                href="/"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Friends
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

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
