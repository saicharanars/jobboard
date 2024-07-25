import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/lib/context/auth";
import {
  useGetApplicationsCategorycountQuery,
  useGetApplicationscountQuery,
} from "@/lib/redux/applyjobs/applicationsapi";
import { LoaderCircle } from "lucide-react";
import ApplicationsReceivedByCategory from "./ApplicationsReceivedByCategory";
import SectionHeader from "./SectionHeader";
import { Button } from "../ui/button";
import Link from "next/link";

const transformStatusData = (statusArray) => {
  if (!Array.isArray(statusArray)) {
    console.error("Invalid status data:", statusArray);
    return {};
  }

  let transformedData = {
    pending: 0,
    inreview: 0,
    shortlisted: 0,
    interview: 0,
    declined: 0,
    hired: 0,
  };
  statusArray.forEach((item) => {
    if (
      item &&
      typeof item === "object" &&
      "status" in item &&
      "count" in item
    ) {
      transformedData[item.status] = parseInt(item.count);
    }
  });

  return transformedData;
};

export const CompanyDashboard = () => {
  const authctx = useContext(AuthContext);
  const [statustcount, setStatuscount] = useState({});
  const {
    data: stats,
    isLoading,
    error,
  } = useGetApplicationsCategorycountQuery({ token: authctx.token });
  useEffect(() => {
    console.log("Fetched counts from API:", stats);
    if (stats && stats.status) {
      const transformedStatus = transformStatusData(stats.status);
      console.log("Transformed status data:", transformedStatus);
      setStatuscount(transformedStatus);
    } // Add this line
  }, [stats]);
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
      <SectionHeader
        title="Good Morning,Your Dashboard"
        actionElement={
          <Link href={"/"}>
            <Button variant={"outline"}>Back to Homepage</Button>
          </Link>
        }
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 grid-rows-6  md:grid-rows-5 gap-2 p-2 h-full ">
        <div className="bg-[#4640DE]  col-span-1 row-span-1 flex flex-row justify-center gap-2 px-5 py-3">
          <h1 className="text-5xl text-white my-auto">
            {statustcount.pending}
          </h1>
          <p className="my-auto text-white text-lg">
            {" "}
            New Candiadates to review
          </p>
        </div>
        <div className="bg-[#56CDAD] col-span-1 row-span-1 flex flex-row justify-center gap-2 px-5 py-3">
          <h1 className="text-5xl text-white my-auto">
            {statustcount.shortlisted}
          </h1>
          <p className="my-auto text-white text-lg"> Shortlisted</p>
        </div>
        <div className="bg-[#26A4FF] col-span-1 row-span-1 flex flex-row justify-center gap-2 px-5 py-3">
          <h1 className="text-5xl text-white my-auto">
            {statustcount.interview}
          </h1>
          <p className="my-auto text-white text-lg"> Interview</p>
        </div>
        <div className=" col-span-1 row-span-1  md:col-span-2 md:row-span-4 ">
          {stats && stats.category && (
            <ApplicationsReceivedByCategory category={stats.category} />
          )}
        </div>
        <div className=" col-span-1 row-span-1 md:row-span-2 bg-[#56CDAD]  flex flex-row justify-center gap-2 px-5 py-3">
          <h1 className="text-5xl text-white my-auto">{statustcount.hired}</h1>
          <p className="my-auto text-white text-lg"> Hired</p>
        </div>
        <div className=" col-span-1 row-span-1 md:row-span-2 bg-[#FF6550] flex flex-row justify-center gap-2 px-5 py-3 ">
          <h1 className="text-5xl text-white my-auto">
            {statustcount.declined}
          </h1>
          <p className="my-auto text-white text-lg"> Declined</p>
        </div>
      </div>
    </>
  );
};
