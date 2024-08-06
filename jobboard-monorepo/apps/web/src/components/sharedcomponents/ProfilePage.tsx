"use client";

import React, { useContext, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import AuthContext from "@/lib/context/auth";
import Profile from "./Profile";
import CompanyProfile from "./CompanyProfile";
import AuthCheck from "./Authcheck";
import { useGetProfileQuery } from "@/lib/redux/profile/profileapi";
import { setProfile, setUser } from "@/lib/redux/profile/profilereducer";
import { useProfileDispatch } from "@/lib/redux/profile/profilehooks";
import { editprofile, profile } from "@/lib/types/user";
import UpdateProfilebutton from "./UpdateProfilebutton";
import AddProfile from "./AddProfile";
interface Error {
  statusCode: number;
  message: string;
}

const ProfilePage: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const tok = authCtx.token;
  const dispatch = useProfileDispatch();

  // Fetch profile data even if there is no token
  const {
    data: getprofile,
    isLoading,
    error,
  } = useGetProfileQuery({ token: tok! }); // Skip the query if there is no token

  useEffect(() => {
    console.log(getprofile);
    if (getprofile) {
      const userProfile: profile = getprofile.profile;
      const { profile: _, ...userData } = getprofile;
      dispatch(setProfile(userProfile));
      dispatch(setUser(userData)); // Uncomment if necessary
    }
  }, [getprofile, dispatch, tok]);

  if (!tok) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) {
    return (
      <div className="h-full">
        <LoaderCircle
          strokeWidth="3"
          className="text-blue-700 h-8 w-8 m-auto animate-spin"
        />
      </div>
    );
  }

  if (error) {
    const err = error as Error;
    switch (err.statusCode) {
      case 404:
        console.log("Not found");
        return <AddProfile />;
        break;
      case 500:
        console.log("Unexpected error");
        return <div>unepected behaviour from server</div>;
        break;
    }
    return;
  }

  return (
    <>
      <AuthCheck requiredRole="job_candidate">
        <Profile />
      </AuthCheck>
      <AuthCheck requiredRole="job_employer">
        <CompanyProfile />
      </AuthCheck>
    </>
  );
};

export default ProfilePage;
