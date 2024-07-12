"use client";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Job as jobtype } from "@/lib/types/job";
import { Applicationform } from "./Applicationform";
import { Provider } from "react-redux";
import store from "@/lib/redux/applyjobs/store";

const Job = (job: jobtype) => {
  return (
    <>
      <Provider store={store}>
        <div className="w-full min-h-40  bg-slate-100 px-1 md:px-12 py-10 mb-10">
          <Card className="p-1 md:p-4 flex flex-col md:flex-row justify-between mt-2">
            <CardContent className="flex flex-col  items-start">
              <h1 className="text-xl md:text-2xl capitalize font-bold line-clamp-1">
                {job.job_role}
              </h1>
              <p className=" text-lg text-gray-200 capitalize ">
                {job.location}
              </p>
              <Badge
                className="  justify-self-start self-start   capitalize bg-blue-100  text-blue-400 min-w-[100] truncate  "
                variant={"outline"}
              >
                {job.category}
              </Badge>
            </CardContent>
            <Applicationform job={job} />
          </Card>
        </div>
        <div className="w-full px-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:flex-row md:px-12 py-2 mb-10">
          <div className="p-4   md:col-span-2">
            <h1 className="text-2xl md:text-3xl font-sans  font-bold line-clamp-1 mb-2">
              Description
            </h1>
            <div className="text-lg  text-pretty text-slate-500 ">
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
          </div>
          <div className="p-1 ">
            <h1 className="text-lg md:text-xl text-black text-bold line-clamp-1 mb-2">
              About The Role
            </h1>
            <div className=" flex flex-row justify-between align-middle items-start">
              <p className="text-lg  text-slate-400  font-medium">
                Job Posted On
              </p>
              <p className="text-lg  text-black  font-semibold">
                {new Date(job.createdDate).toLocaleDateString()}
              </p>
            </div>
            <div className=" flex flex-row justify-between align-middle items-start">
              <p className="text-lg   text-slate-400  font-medium">Job Type</p>
              <p className="text-lg  text-black  font-semibold">Full time</p>
            </div>
            <div className=" flex flex-row justify-between align-middle items-start">
              <p className="text-lg  text-slate-400  font-medium">Salary</p>
              <p className="text-lg  text-black     font-semibold"> 20000</p>
            </div>
            <h1 className="text-lg  md:text-xl text-black text-bold line-clamp-1 mb-2">
              Categories
            </h1>

            <Badge
              className="  justify-self-start self-start  bg-green-100  text-green-400 min-w-[100] truncate  "
              variant={"outline"}
            >
              {job.category}
            </Badge>
          </div>
        </div>
      </Provider>
    </>
  );
};

export default Job;
