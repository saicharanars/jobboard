// lib/redux/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job } from "../../types/job";
import { addJobApplication, JobApplication } from "@/lib/types/Application";

export const applicationsApi = createApi({
  reducerPath: "ApplicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    getJobsForall: builder.query<
      Job[],
      { sortdate?: string; category?: string; location?: string }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.sortdate) queryParams.append("sortdate", params.sortdate);
        if (params.category) queryParams.append("category", params.category);
        if (params.location) queryParams.append("location", params.location);

        return {
          url: `/jobs?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    addApplication: builder.mutation<
      addJobApplication,
      { application: addJobApplication; token: string; jobId: string }
    >({
      query: ({ application, token, jobId }) => ({
        url: `applications/${jobId}`,
        method: "POST",
        body: application,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Applications"],
    }),
    getApplications: builder.query<JobApplication[], { token: string }>({
      // Change the type to accept a string parameter
      query: ({ token }) => ({
        // Accept token as a parameter
        url: "applications/user",
        headers: {
          Authorization: token, // Set the token in the headers
        },
        transformResponse: (response) => response.applications,
        transformErrorResponse: (response) => response.data.message,
      }),
    }),
  }),
});

export const {
  useGetJobsForallQuery,
  useAddApplicationMutation,
  useGetApplicationsQuery,
} = applicationsApi;
