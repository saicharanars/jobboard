import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { editprofile, profile, user } from "@/lib/types/user";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<user, { token: string }>({
      query: ({ token }) => ({
        url: "profiles",
        headers: {
          Authorization: token, // Set the token in the headers
        },
      }),
      transformResponse: (response) => response.profile,
      transformErrorResponse: (response) => response.data.message,
    }),

    editProfile: builder.mutation<
      editprofile,
      { editProfile: editprofile; token: string }
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
      transformResponse: (response) => response.profile,
      transformErrorResponse: (response) => response.data.message,
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
        // Transform the response based on mediatype
        if (arg.mediatype === "profile_picture_url") {
          return { url: response.profile_picture_url };
        } else if (arg.mediatype === "resume_url") {
          return { url: response.resume_url };
        }
        return response;
      },
      transformErrorResponse: (response) => response.data.message,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useEditProfileMutation,
  useUploadProfilePhotoMutation,
} = profileApi;
