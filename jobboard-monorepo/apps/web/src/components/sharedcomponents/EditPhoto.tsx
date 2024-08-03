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
import { profilePhoto, profilePhotoSchema } from "@/lib/types/user";
import { useUploadProfilePhotoMutation } from "@/lib/redux/profile/profileapi";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch } from "react-redux";
import { addPhoto } from "@/lib/redux/profile/profilereducer";

const EditPhoto = () => {
  const authCtx = useContext(AuthContext);
  const [uploadProfilePhoto, { isLoading, error, isSuccess }] =
    useUploadProfilePhotoMutation();
  const token = authCtx.token;
  const dispatch = useDispatch();

  const photoForm = useForm<profilePhoto>({
    resolver: zodResolver(profilePhotoSchema),
    defaultValues: {
      picture: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = photoForm;

  const onSubmit = async (data: profilePhoto) => {
    const { picture } = data;
    if (!picture || !token) return;

    try {
      const response = await uploadProfilePhoto({
        file: picture[0],
        mediatype: "profile_picture_url",
        token,
      }).unwrap();

      console.log("File uploaded successfully:", response);
      dispatch(addPhoto({ url: response.url }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Edit Photo
          <Pencil className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-lg h-min ">
        <DialogHeader>
          <DialogTitle>Edit Profile Photo</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader className="text-center p-1">
            <CardTitle>Upload Photo</CardTitle>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{JSON.stringify(error)}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="sucess">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Photo uploaded successfully.
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className="my-2">
            <Form {...photoForm}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl>
                        <Controller
                          name="picture"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                onChange(e.target.files); // Pass the file list to react-hook-form
                              }}
                              onBlur={onBlur}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage>{errors.picture?.message}</FormMessage>
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

export default EditPhoto;
