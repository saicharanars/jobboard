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
import { profile } from "@/lib/types/user";

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
    return <div>An error occurred: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      <AuthCheck requiredRole="job_candidate">
        <Profile />
      </AuthCheck>
      <AuthCheck requiredRole="job_employer">
        <CompanyProfile />
        {/* <div>hello</div> */}
      </AuthCheck>
    </>
  );
};

export default ProfilePage;
