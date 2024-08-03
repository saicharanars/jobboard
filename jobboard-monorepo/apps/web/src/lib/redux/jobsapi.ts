// lib/redux/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job, addJob, employerJobsResponse } from "../types/job";
import { AddJobResponse } from "../types/Application";
const url = "https://jobboard-4945.onrender.com/";



export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      // We're not setting the token here anymore
      return headers;
    },
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<employerJobsResponse, { token: string }>({
      // Change the type to accept a string parameter
      query: ({ token }) => ({
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
      transformResponse: (response: AddJobResponse) => response.job,
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
    getJobsForUser: builder.query<
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
  }),
});

export const {
  useGetJobsQuery,
  useLazyGetJobsForUserQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
