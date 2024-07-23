"use client";

import React from "react";
import Applications from "./Applications";
import AuthCheck from "./Authcheck";
import CompanyApplications from "./CompanyApplications";

const ProfilePage: React.FC = () => {
  return (
    <>
      <AuthCheck requiredRole="job_candidate">
        <Applications />
      </AuthCheck>
      <AuthCheck requiredRole="job_employer">
        <CompanyApplications />
      </AuthCheck>
    </>
  );
};

export default ProfilePage;
