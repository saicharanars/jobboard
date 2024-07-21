"use client";
import React, { useContext, useState } from "react";
import { Pencil, LoaderCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import AuthContext from "@/lib/context/auth";
import {
  profilePhoto,
  profilePhotoSchema,
  resume,
  resumeSchema,
} from "@/lib/types/user";
import { useUploadProfilePhotoMutation } from "@/lib/redux/profile/profileapi";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch } from "react-redux";
import { addPhoto, addResume } from "@/lib/redux/profile/profilereducer";

const Editresume = () => {
  const authCtx = useContext(AuthContext);
  const [uploadProfilePhoto, { isLoading, error, isSuccess }] =
    useUploadProfilePhotoMutation();
  const token = authCtx.token;
  const dispatch = useDispatch();

  const photoForm = useForm<resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resume: null,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = photoForm;

  const onSubmit = async (data: resume) => {
    const { resume } = data;
    if (!resume || !token) return;

    try {
      const response = await uploadProfilePhoto({
        file: resume[0],
        mediatype: "resume_url",
        token,
      }).unwrap();

      console.log("File uploaded successfully:", response);
      dispatch(addResume({ url: response.url }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Pencil className="h-3 w-3 my-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-lg h-min overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Resume</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader className="text-center p-1">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  resume uploaded successfully.
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className="my-2">
            <Form {...photoForm}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Controller
                          name="resume"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              type="file"
                              accept="application/*"
                              onChange={(e) => {
                                onChange(e.target.files); // Pass the file list to react-hook-form
                              }}
                              onBlur={onBlur}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage>{errors.resume?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full mt-3 text-white transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading && (
                    <LoaderCircle
                      strokeWidth="3"
                      className="text-white h-6 w-6 animate-spin mx-4"
                    />
                  )}
                  {isLoading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Editresume;
