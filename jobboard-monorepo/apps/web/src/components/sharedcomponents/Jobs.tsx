"use client";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/lib/context/auth";
import { DataTable } from "./DataTable";
import { columns } from "./Employerjobtablecolumns";
import { useDispatch, useSelector } from "react-redux";
import { getjobslice } from "@/lib/redux/Jobreducer";
import { useGetJobsQuery } from "@/lib/redux/jobsapi";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobDispatch, useJobSelector } from "@/lib/redux/jobhooks";
import { Job } from "@/lib/types/job";

const Jobs = () => {
  // const jobs = useSelector((state) => state.job.items);
  const jobs: Job[] = useJobSelector((state) => state.job.items);
  const authctx = useContext(AuthContext);
  const dispatch = useJobDispatch();
  // const [shouldFetch, setShouldFetch] = useState(false); // Initialize shouldFetch with false

  // Fetch jobs using Redux Toolkit Query hook
  const {
    data: jobsFromApi,
    isLoading,
    error,
  } = useGetJobsQuery({ token: authctx.token });

  // Dispatch jobs to Redux store when jobsFromApi updates
  useEffect(() => {
    console.log(jobsFromApi);

    if (jobsFromApi && jobsFromApi.job) {
      console.log(jobsFromApi);
      dispatch(getjobslice(jobsFromApi.job));
    }
  }, [jobsFromApi, dispatch]);

  // Loading state: show loading spinner
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

  // Error state: show error message
  if (error) {
    return <div>An error occurred: {JSON.stringify(error)}</div>;
  }

  // Placeholder logic for employeerror check
  const employeerror = false; // Replace with actual logic as needed

  // Render error message if user is not an employer
  if (employeerror) {
    return <div>You are not an employer.</div>;
  }

  // Render DataTable with columns and jobs data
  return (
    <div className="container mx-auto py-1 md:py-10">
      <DataTable
        columns={columns}
        data={jobs}
        filters={["category", "location"]}
        customFilterColumn="job_role"
      />
    </div>
  );
};

export default Jobs;
