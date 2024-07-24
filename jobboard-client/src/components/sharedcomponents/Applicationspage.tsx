"use client";

import React from "react";
import Applications from "./Applications";
import AuthCheck from "./Authcheck";
import CompanyApplications from "./CompanyApplications";

const ProfilePage: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-md p-1 md:p-2 m-2">
        <AuthCheck requiredRole="job_candidate">
          <Applications />
        </AuthCheck>
        <AuthCheck requiredRole="job_employer">
          <CompanyApplications />
        </AuthCheck>
      </div>
    </>
  );
};

export default ProfilePage;
