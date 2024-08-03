import React, { useEffect } from "react";
import { JobApplicationWithJob } from "@/lib/types/Application";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const ViewApplication = (application: JobApplicationWithJob) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold capitalize p-1 md:p-4">
        your Application
      </h1>
      <Card className="p-1 md:p-4 m-1 md:m-4">
        <CardHeader>
          <Link href={`/jobs/${application.job?.id}`}>
            <CardTitle className=" capitalize">
              {application.job?.job_role}
            </CardTitle>
          </Link>
          <p className="text-sm font-medium leading-none">
            {application.job?.location}
          </p>
        </CardHeader>
        <CardContent>
          <h1>About the job</h1>
          <CardDescription>{application.job?.description}</CardDescription>
        </CardContent>
        <CardFooter className="grid grid-cols-1">
          <div>
            {application.job.questions.map((question, index) => (
              <div key={index} className="grid grid-cols-1 gap-2 mb-2  ">
                <h1>{question}</h1>
                <CardDescription>{application.answers[index]}</CardDescription>
              </div>
            ))}
          </div>
          <Link href={application.resume_url}>
            <Button variant={"outline"}>submitted resume</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewApplication;
