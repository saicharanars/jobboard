"use client";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useContext, useState } from "react";
import AuthContext from "@/lib/context/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Job } from "../../lib/types/job";
import { useDispatch } from "react-redux";
// import { useSubmitApplicationMutation } from "@/lib/redux/jobsapi";
import { CircleX, LoaderCircle } from "lucide-react";
import {
  addJobApplication,
  addJobApplicationschema,
} from "@/lib/types/Application";

const AddapplicationForm = ({ job }: { job: Job }) => {
  const authctx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [myerror, setMyError] = useState("");
  const dispatch = useDispatch();
  //   const [submitApplication, { isLoading }] = useSubmitApplicationMutation();

  const jobApplicationForm = useForm<addJobApplication>({
    resolver: zodResolver(addJobApplicationschema),
    defaultValues: {
      resumeUrl: "",
      answers: job.questions.map(() => "") || [],
    },
  });

  const { fields } = useFieldArray({
    control: jobApplicationForm.control,
    name: "answers",
  });

  const onSubmitApplication = async (values: addJobApplication) => {
    console.log(values);
  };

  return (
    <div className="max-w-md mx-2 p-1 overflow-y-scroll">
      <Card>
        <CardHeader className="text-center p-1">
          <CardTitle>Job Application</CardTitle>
          {myerror.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{myerror}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Successfully submitted the application
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="my-2">
          <Form {...jobApplicationForm}>
            <form
              onSubmit={jobApplicationForm.handleSubmit(onSubmitApplication)}
            >
              <FormField
                control={jobApplicationForm.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter resume URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={jobApplicationForm.control}
                  name={`answers.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question {index + 1}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={`Answer for question ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="submit"
                className="w-full mt-3 text-white transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
              >
                {isLoading && (
                  <LoaderCircle
                    strokeWidth="3"
                    className="text-white h-6 w-6 animate-spin mx-4"
                  />
                )}
                Submit Application
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddapplicationForm;
