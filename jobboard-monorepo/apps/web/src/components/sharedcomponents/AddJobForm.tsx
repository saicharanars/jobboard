"use client";
import React, { useContext, useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Control,
  UseFormReturn,
  FieldArrayPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
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
import AuthContext from "@/lib/context/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { addjobSchema, addJob, Job } from "../../lib/types/job";
import { useDispatch } from "react-redux";
import { useUpdateJobMutation, useAddJobMutation } from "@/lib/redux/jobsapi";
import { CircleX, LoaderCircle } from "lucide-react";
import { addjobslice, updatejobslice } from "@/lib/redux/Jobreducer";
import { z } from "zod";
import { useJobDispatch } from "@/lib/redux/jobhooks";

const AddJobForm: React.FC<{ job?: Job  }> = ({ job }) => {
  const authctx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useJobDispatch();
  const [editJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [addJob, { isLoading: isAdding }] = useAddJobMutation();
  type FormValues = z.infer<typeof addjobSchema>;
  const jobform: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(addjobSchema),
    defaultValues: {
      job_role: job?.job_role || "",
      description: job?.description || "",
      location: job?.location || "",
      category: job?.category || "",
      openings: job?.openings || 1,
      questions: job?.questions || [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: jobform.control,
    name: "questions" as FieldArrayPath<FormValues>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      if (job && job.id) {
        const updatedJob = { ...job, ...values };
        const result = await editJob({
          job: updatedJob,
          token: authctx.token,
        }).unwrap();
        if (result) {
          dispatch(updatejobslice(updatedJob));
          setSuccess(true);
        }
      } else {
        const result = await addJob({
          job: values,
          token: authctx.token,
        }).unwrap();
        if (result) {
          dispatch(addjobslice(result));
          setSuccess(true);
        }
      }
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-2 p-1 overflow-y-scroll">
      <Card>
        <CardHeader className="text-center p-1">
          <CardTitle>{job ? "Edit Job" : "Add Job"}</CardTitle>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="sucess">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                {job ? "Successfully updated job" : "Successfully added job"}
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="my-2">
          <Form {...jobform}>
            <form onSubmit={jobform.handleSubmit(onSubmit)}>
              <FormField
                control={jobform.control}
                name="job_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Questions field array */}
              <div className="flex flex-col items-center gap-3 mt-3">
                <FormLabel>Questions</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="w-full flex items-center">
                    <FormControl>
                      <Input
                        placeholder="Enter question"
                        {...jobform.register(`questions.${index}` as const)}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => remove(index)}
                      className="ml-2"
                    >
                      <CircleX className="h-8 w-8 m-1 p-2" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => append("")}
                >
                  Add Question
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full mt-3 text-white transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
              >
                {(isAdding || isUpdating) && (
                  <LoaderCircle
                    strokeWidth="3"
                    className="text-white h-6 w-6 animate-spin mx-4"
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
