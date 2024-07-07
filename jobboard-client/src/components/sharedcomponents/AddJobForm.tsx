"use client";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "@/lib/context/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
const url = "http://localhost:3001/";
import { addjobSchema, Job, addJob } from "../../lib/types/job";
import { useDispatch } from "react-redux";
import { addjobslice, updatejobslice } from "@/lib/redux/Jobreducer";
import { useUpdateJobMutation, useAddJobMutation } from "@/lib/redux/jobsapi";
import { Loader, LoaderCircle } from "lucide-react";
const AddJobForm = ({ job }: { job?: Job }) => {
  const authctx = useContext(AuthContext);
  const [sucess, OnSucess] = useState(false);
  const [myerror, setmyerror] = useState("");
  const dispatch = useDispatch();
  const [editjob, { isLoading: isupdating }] = useUpdateJobMutation();
  const [Addjob, { isLoading: isadding }] = useAddJobMutation();
  const jobform = useForm<addJob>({
    resolver: zodResolver(addjobSchema),
    defaultValues: {
      job_role: job?.job_role || "",
      description: job?.description || "",
      location: job?.location || "",
      category: job?.category || "",
      openings: job?.openings || 1,
    },
  });

  const addjob = async (values: addJob) => {
    try {
      if (job && job.id) {
        const updatedJob = { ...job, ...values };
        const result = await editjob({
          job: updatedJob,
          token: authctx.token,
        }).unwrap();
        if (result && result.job) {
          dispatch(updatejobslice(updatedJob));
          OnSucess(true);
        }
      } else {
        const result = await Addjob({
          job: values,
          token: authctx.token,
        }).unwrap();
        console.log(result);
        if (result && result.job) {
          dispatch(addjobslice(result.job));
          OnSucess(true);
        }
      }
      setTimeout(() => {
        OnSucess(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md max-h-fit mx-2 p-1 scroll-m-1">
      <Card>
        <CardHeader className="text-center p-1">
          <CardTitle>{job ? "Edit Job" : "Add job"}</CardTitle>
          
          {myerror.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{myerror}</AlertDescription>
            </Alert>
          )}
          {sucess && (
            <Alert variant="sucess">
              <AlertTitle>Sucess</AlertTitle>
              <AlertDescription>
                {job ? "Successfully updated job" : "Successfully added job"}
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="my-2">
          <Form {...jobform}>
            <form onSubmit={jobform.handleSubmit(addjob)}>
              <FormField
                control={jobform.control}
                name="job_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job role</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={jobform.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your description here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={jobform.control}
                name="openings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Openings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter openings"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={jobform.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={jobform.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full  mt-3 text-white  transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
              >
                {(isadding || isupdating) && (
                  <LoaderCircle
                    strokeWidth="3"
                    className="text-white h-6 w-6 animate-spin mx-4 "
                  />
                )}

                {job ? "Update Job" : "Add Job"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddJobForm;
