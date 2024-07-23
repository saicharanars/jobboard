"use client";
import AuthContext from "@/lib/context/auth";
import React, { useContext, useEffect } from "react";
import Profile from "./Profile";
import CompanyProfile from "./CompanyProfile"; // Assuming you have this component
import AuthCheck from "./Authcheck";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "@/lib/redux/profile/profileapi";
import { setProfile, setUser } from "@/lib/redux/profile/profilereducer";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const role = authCtx.role;
  const tok = authCtx.token;
  const reduxprofile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useGetProfileQuery(
    { token: tok },
    {
      skip: !tok,
    }
  );

  useEffect(() => {
    if (tok) {
      refetch();
    }
  }, [tok, refetch]);

  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile.profile));
      dispatch(setUser(profile));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (error && error === "Unauthorized") {
      authCtx.logout();
      redirect("/auth");
    }
  }, [error, authCtx]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error && error !== "Unauthorized") {
    console.error("Error fetching profile:", error);
    return <p>Error loading profile. Please try again later.</p>;
  }

  return (
    <>
      <AuthCheck requiredRole="job_candidate">
        <Profile />
      </AuthCheck>
      <AuthCheck requiredRole="job_employer">
        <CompanyProfile {...reduxprofile} />
      </AuthCheck>
    </>
  );
};

export default ProfilePage;
