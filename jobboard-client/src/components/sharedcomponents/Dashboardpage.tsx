"use client";
import React from "react";
import AuthCheck from "./Authcheck";
import CandidateDashboard from "./CandidateDashboard";
import { CompanyDashboard } from "./CompanyDashboard";
import { Provider } from "react-redux";
import store from "@/lib/redux/applyjobs/store";

const DashboardPage = () => {
  return (
    <>
      <Provider store={store}>
        <AuthCheck requiredRole="job_candidate">
          <CandidateDashboard />
        </AuthCheck>
        <AuthCheck requiredRole="job_employer">
          <CompanyDashboard />
        </AuthCheck>
      </Provider>
    </>
  );
};

export default DashboardPage;
