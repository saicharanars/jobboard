import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the necessary TypeScript interfaces
interface SocialLinks {
  linkedin: string;
  github: string;
  website: string;
}

interface ProfileDetails {
  id: string;
  description: string;
  date_of_birth: string;
  resume_url: string;
  profile_picture_url: string;
  location: string;
  sociallinks: SocialLinks;
  createdDate: string;
  updatedDate: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile_number: number;
  role: string;
  createdDate: string;
  updatedDate: string;
  profile: ProfileDetails;
}

interface GetProfileResponse {
  profile: UserProfile;
  message: string;
}

interface EditProfileRequest {
  description: string;
  date_of_birth: string;
  location: string;
  sociallinks: {
    linkedin: string;
    github: string;
    website: string;
  };
}

// Adjust EditProfileResponse to reflect the correct structure
interface EditProfileResponse {
  profile: ProfileDetails;
  message: string;
}

// Define the API URL
const url = "https://jobboard-4945.onrender.com/";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, { token: string }>({
      query: ({ token }) => ({
        url: "profiles",
        headers: {
          Authorization: token,
        },
      }),
      transformResponse: (response: GetProfileResponse): UserProfile => {
        return response.profile;
      },
    }),

    editProfile: builder.mutation<
      ProfileDetails, // Correct type here
      { editProfile: EditProfileRequest; token: string }
    >({
      query: ({ editProfile, token }) => ({
        url: "profiles",
        method: "PATCH",
        body: editProfile,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["profile"],
      transformResponse: (response: EditProfileResponse): ProfileDetails =>
        response.profile,
      transformErrorResponse: (response: any) => response.data.message,
    }),

    uploadProfilePhoto: builder.mutation<
      { url: string },
      { file: File; token: string; mediatype: string }
    >({
      query: ({ file, token, mediatype }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", mediatype);
        return {
          url: "profiles/upload",
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["profile"],
      transformResponse: (response: any, meta, arg) => {
        if (arg.mediatype === "profile_picture_url") {
          return { url: response.profile_picture_url };
        } else if (arg.mediatype === "resume_url") {
          return { url: response.resume_url };
        }
        return response;
      },
      transformErrorResponse: (response: any) => response.data.message,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useEditProfileMutation,
  useUploadProfilePhotoMutation,
} = profileApi;
