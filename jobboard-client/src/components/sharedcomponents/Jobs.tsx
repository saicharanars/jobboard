"use client";
import { useContext, useEffect } from "react";
import AuthContext from "@/lib/context/auth";
import { DataTable } from "./DataTable";
import { columns } from "./Employerjobtablecolumns";
import { useDispatch, useSelector } from "react-redux";
import { getjobslice } from "@/lib/redux/Jobreducer";
import { useGetJobsQuery } from "@/lib/redux/jobsapi";

const Jobs = () => {
  const jobs = useSelector((state) => state.job.items);
  const authctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const {
    data: jobsFromApi,
    isLoading,
    error,
  } = useGetJobsQuery({ token: authctx.token });

  useEffect(() => {
    console.log("Fetched jobs from API:", jobsFromApi); // Add this line
    if (jobsFromApi && jobsFromApi.job) {
      dispatch(getjobslice(jobsFromApi.job));
    }
  }, [jobsFromApi, dispatch]);

  useEffect(() => {
    console.log("Jobs state updated:", jobs);
  }, [jobs]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={jobs} />
    </div>
  );
};

export default Jobs;
