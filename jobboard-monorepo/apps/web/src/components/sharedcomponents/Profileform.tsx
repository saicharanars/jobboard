import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import {
  editprofile,
  editprofileschema,
  addprofile,
  addprofileschema,
  profile as ProfileType,
} from "@/lib/types/user";
import AuthContext from "@/lib/context/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  useEditProfileMutation,
  useAddProfileMutation,
} from "@/lib/redux/profile/profileapi";
import { Check, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setProfile } from "@/lib/redux/profile/profilereducer";
import { useProfileSelector } from "@/lib/redux/profile/profilehooks";
import { AppDispatch } from "@/lib/redux/store";

interface EditProfileFormProps {
  profile: Partial<editprofile>;
}

// Edit Profile Form
const EditProfileForm: React.FC<EditProfileFormProps> = ({ profile }) => {
  const authCtx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [myError, setMyError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const userprofile: ProfileType = useProfileSelector(
    (state) => state.profile.profile
  );

  const [editProfile, { isLoading, error, isSuccess }] =
    useEditProfileMutation();

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
      const profileData: editprofile = {
        description: values.description,
        date_of_birth: values.date_of_birth,
        location: values.location,
        sociallinks: values.sociallinks,
      };

      const result = await editProfile({
        editProfile: profileData,
        token: authCtx.token!,
      }).unwrap();
      console.log(result);
      const updatedProfileData: ProfileType = {
        ...userprofile,
        ...profileData,
      };
      dispatch(setProfile(updatedProfileData));

      setSuccess(true);
    } catch (error) {
      const err = JSON.stringify(error);
      setMyError(err);
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
              <AlertDescription>Profile updated successfully</AlertDescription>
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

              {/* Duplicated Social Links Fields */}
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
                Update Profile
                {isSuccess && (
                  <Check strokeWidth="3" className="text-white h-6 w-6 mx-4" />
                )}
              </Button>
              {error && typeof error === "object" && "data" in error && (
                <p>{JSON.stringify(error.data)}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Add Profile Form
const AddProfileForm: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [myError, setMyError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const [addProfile, { isLoading, error, isSuccess }] = useAddProfileMutation();

  const profileForm = useForm<addprofile>({
    resolver: zodResolver(addprofileschema),
    defaultValues: {
      description: "",
      date_of_birth: "",
      resume_url: "",
      profile_picture_url: "",
      location: "",
      sociallinks: {
        linkedin: "",
        github: "",
        website: "",
      },
    },
  });

  const onSubmit = async (values: addprofile) => {
    try {
      const profileData: addprofile = {
        description: values.description,
        date_of_birth: values.date_of_birth,
        resume_url: values.resume_url,
        profile_picture_url: values.profile_picture_url,
        location: values.location,
        sociallinks: values.sociallinks,
      };

      const result = await addProfile({
        Addprofile: profileData,
        token: authCtx.token!,
      }).unwrap();

      dispatch(setProfile(result));
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setMyError(error.message);
      } else {
        setMyError("An unknown error occurred");
      }
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
              <AlertDescription>Profile added successfully</AlertDescription>
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
                name="resume_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter resume URL"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="profile_picture_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture URL</FormLabel>
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter profile picture URL"
                    />
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

              {/* Duplicated Social Links Fields */}
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
                Add Profile
                {isSuccess && (
                  <Check strokeWidth="3" className="text-white h-6 w-6 mx-4" />
                )}
              </Button>
              {error && typeof error === "object" && "data" in error && (
                <p>{JSON.stringify(error.data)}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { EditProfileForm, AddProfileForm };
