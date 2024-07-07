// lib/redux/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job, addJob } from "../types/job";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      // We're not setting the token here anymore
      return headers;
    },
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], { token: string }>({
      // Change the type to accept a string parameter
      query: ({token}) => ({
        // Accept token as a parameter
        url: "jobs/company",
        headers: {
          Authorization: token, // Set the token in the headers
        },
      }),
    }),
    addJob: builder.mutation<Job, { job: addJob; token: string }>({
      query: ({ job, token }) => ({
        url: "jobs",
        method: "POST",
        body: job,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation<Job, { job: Job; token: string }>({
      query: ({ job, token }) => ({
        url: `jobs/${job.id}`,
        method: "PUT",
        body: job,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation<void, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `jobs/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
