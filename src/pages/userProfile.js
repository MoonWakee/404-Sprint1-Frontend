import React, { useState, useEffect } from "react";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import authHeader from "../utils/authHeader";

const UserProfile = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
            ...authHeader(), 
            Accept: 'application/json',
        }
        let res = await fetch("https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/user/info", {
          method: "GET",
          headers: headers
        });
        let resJson = await res.json();
        console.log(resJson)
        setProfile(resJson)
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);



  return (

    <div>
        {/* {profile.email}
        {profile.user_name}
        {profile.first_name}
        {profile.last_name} */}
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          UserName: {profile.user_name}
        </p> */}
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {profile.user_name} </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Email: {profile.email}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          First Name: {profile.first_name}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Last Name: {profile.last_name}
        </p>
      </div>
    </div>
    
  );
};

export default UserProfile;