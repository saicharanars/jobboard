"use client";
import AuthContext from "@/lib/context/auth";
import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import AuthCheck from "./Authcheck";
import axios from "axios";
import CompanyProfile from "./CompanyProfile";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [profile, setProfile] = useState({
    profile: {
      id: "",
      description: "",
      date_of_birth: "",
      resume_url: "",
      profile_picture_url: "",
      location: "",
      sociallinks: {
        linkedin: " ",
        github: " ",
        website: " ",
      },
      createdDate: "",
      updatedDate: "",
    },
    message: "Successfully updated Profile",
  });
  const role = authCtx.role;
  const token = authCtx.token;

  const url = "http://localhost:3001/profiles/";

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: token,
            },
          });
          console.log(response.data);
          setProfile(response.data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
      console.log(profile);
    }
  }, [token]);

  return (
    <AuthCheck>
      {role === "job_candidate" && profile && <Profile {...profile} />}
      {role === "job_employer" && <CompanyProfile {...profile} />}
    </AuthCheck>
  );
};

export default ProfilePage;
