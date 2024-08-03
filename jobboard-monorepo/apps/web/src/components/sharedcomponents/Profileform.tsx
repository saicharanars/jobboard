import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editprofile, editprofileschema,profile as ProfileType } from "@/lib/types/user";
import React, { useContext, useState } from "react";
import AuthContext from "@/lib/context/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEditProfileMutation } from "@/lib/redux/profile/profileapi";
import { Check, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setProfile } from "@/lib/redux/profile/profilereducer";
import { useProfileSelector } from "@/lib/redux/profile/profilehooks";

// Assuming `editprofile` is your type
const ProfileForm = ({ profile }: { profile?: editprofile }) => {
  const userprofile: ProfileType = useProfileSelector(
    (state) => state.profile.profile
  );
  const authCtx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [myError, setMyError] = useState("");
  const dispatch = useDispatch();
  const [edit, { isLoading, error: iserror, isSuccess }] =
    useEditProfileMutation();

  // Form initialization with default values
  const profileForm = useForm<editprofile>({
    resolver: zodResolver(editprofileschema),
    defaultValues: {
      description: profile?.description || "",
      date_of_birth: profile?.date_of_birth || "",
      location: profile?.location || "",
      sociallinks: {
        linkedin: profile?.sociallinks?.linkedin || "",
        github: profile?.sociallinks?.github || "",
        website: profile?.sociallinks?.website || "",
      },
    },
  });

  const onSubmit = async (values: editprofile) => {
    try {
      console.log(values);
      const editProfile = {
          description: values?.description,
          date_of_birth: values?.date_of_birth,
          location: values?.location,
          sociallinks: values?.sociallinks,
        }

      // Calling the mutation with corrected payload
      const result = await edit({
        editProfile,
        token: authCtx.token!,
      }).unwrap();

      console.log(result, "fijijh");
      const profiledata = {
        ...userprofile,
        editProfile
      }
      console.log(profiledata)
      // Uncomment this line if needed
      dispatch(setProfile(profiledata));

      // Replace with your submit logic
      setSuccess(true);
    } catch (error) {
      setMyError(JSON.stringify(error));
    }
  };

  return (
    <div className="w-full mx-2 p-1 overflow-y-auto">
      <Card>
        <CardHeader className="text-center p-1">
          {myError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{myError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="sucess">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                {profile
                  ? "Profile updated successfully"
                  : "Profile added successfully"}
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="my-2">
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onSubmit)}>
              <FormField
                control={profileForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...field} placeholder="Enter description" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input {...field} type="date" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Input {...field} placeholder="Enter location" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Social Links</FormLabel>
              <FormField
                control={profileForm.control}
                name="sociallinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter LinkedIn URL"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="sociallinks.github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter GitHub URL"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="sociallinks.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter Website URL"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-3 text-white bg-blue-800 hover:bg-blue-900"
              >
                {isLoading && (
                  <LoaderCircle
                    strokeWidth="3"
                    className="text-white h-6 w-6 animate-spin mx-4"
                  />
                )}
                {profile ? "Update Profile" : "Add Profile"}
                {isSuccess && (
                  <Check strokeWidth="3" className="text-white h-6 w-6 mx-4" />
                )}
              </Button>
              {iserror && <p>{JSON.stringify(iserror)}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
