import React, { useContext, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ApplicatiosChart from "./ApplicationsChart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useGetApplicationscountQuery } from "@/lib/redux/applyjobs/applicationsapi";
import { UserTokenDto } from "../../../../jobboard-server/src/auth/dto/userTokenDto";
import AuthContext from "@/lib/context/auth";
import { LoaderCircle } from "lucide-react";
import { object } from "zod";
import LatestApplications from "./LatestApplications";

const CandidateDashboard = () => {
  const authctx = useContext(AuthContext);
  const {
    data: statusCounts,
    isLoading,
    error,
  } = useGetApplicationscountQuery({ token: authctx.token });
  useEffect(() => {
    console.log("Fetched counts from API:", statusCounts,); // Add this line
  }, [statusCounts]);
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
    <div className="bg-white p-1 m-1 md:p-3">
      <SectionHeader
        title="Dashboard"
        actionElement={<Button variant={"outline"}>Back to Homepage</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 z-40 ">
        <div className="  grid grid-cols-1 grid-rows-2 gap-2 ">
          <div className=" w-full  bg-white p-4 mx-auto  rounded-md border border-blue-200 border-solid ">
            <h1 className="mx-auto text-[#25324B] text-xl text-center ">
              Total jobs applied
            </h1>
            <h1 className="mx-auto text-[#25324B] text-7xl text-center">
              {statusCounts &&
                Object.values(statusCounts).reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
            </h1>
          </div>
          <div className=" w-full  bg-white p-4 mx-auto rounded-md border border-blue-200  border-solid ">
            <h1 className="mx-auto text-[#25324B] text-xl text-center">
              Total jobs Interviwed
            </h1>
            <h1 className="mx-auto text-[#25324B] text-7xl text-center">
              {statusCounts?.interview}
            </h1>
          </div>
          {/* <Separator orientation={"vertical"} /> */}
        </div>
        <div className=" md:col-span-2 grid grid-cols-1 grid-rows-2  z-40">
          <div className=" row-span-2">
            <ApplicatiosChart
              shortlisted={statusCounts ? statusCounts.shortlisted : 0}
              totalApplications={
                statusCounts &&
                Object.values(statusCounts).reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
              }
            />
          </div>
        </div>
        <Card className=" w-full md:col-span-2">
          <CardHeader className="p-2 mt-3">
            <CardTitle>Latest Applications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <LatestApplications />
           
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboard;
