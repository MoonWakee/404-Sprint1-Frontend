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
        let res = await fetch("http://127.0.0.1:5000/api/user/info", {
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
        {profile.email}
        {profile.user_name}
        {profile.first_name}
        {profile.last_name}
    </div>
    
  );
};

export default UserProfile;