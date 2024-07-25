import AuthContext from "@/lib/context/auth";
import { useGetApplicationsQuery } from "@/lib/redux/applyjobs/applicationsapi";
import { JobApplicationwithjob } from "@/lib/types/Application";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";

const LatestApplications = () => {
  const authctx = useContext(AuthContext);
  const {
    data: applications,
    isLoading,
    error,
  } = useGetApplicationsQuery({ token: authctx.token });
  useEffect(() => {
    console.log("Fetched applications from API:", applications); // Add this line
  }, [applications]);
  if (isLoading)
    return (
      <div className="h-full">
        <LoaderCircle
          strokeWidth="3"
          className="text-blue-700 h-8 w-8 m-auto animate-spin"
        />
      </div>
    );
  if (error) return <div>An error occurred: {error && error.message}</div>;
  return (
    <>
      {applications &&
        applications.map((item: JobApplicationwithjob) => (
          <div className="flex items-center gap-4" key={item.id}>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {item.job.job_role}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.job.location}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {new Date(item.createdDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
    </>
  );
};

export default LatestApplications;
