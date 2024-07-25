// lib/redux/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job } from "../../types/job";
import {
  addJobApplication,
  ApiResponse,
  ApplicationsResponse,
  employercount,
  JobApplication,
  StatusCounts,
} from "@/lib/types/Application";

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
    getApplications: builder.query<
      ApplicationsResponse,
      { token: string; skip?: number; take?: number }
    >({
      query: ({ token, skip, take }) => {
        const params = new URLSearchParams();
        skip !== undefined && params.append("skip", skip.toString());
        take !== undefined && params.append("take", take.toString());

        return {
          url: `applications/user?${params.toString()}`,
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: ApplicationsResponse) =>
        response.applications,
      transformErrorResponse: (response: { data: { message: string } }) =>
        response.data.message,
    }),

    getApplicationsEmployer: builder.query<JobApplication[], { token: string }>(
      {
        // Change the type to accept a string parameter
        query: ({ token }) => ({
          // Accept token as a parameter
          url: "applications/employer",
          headers: {
            Authorization: token, // Set the token in the headers
          },
          transformResponse: (response) => response.applications,
          transformErrorResponse: (response) => response.data.message,
        }),
      }
    ),
    getApplicationscount: builder.query<StatusCounts, { token: string }>({
      query: ({ token }) => ({
        url: "applications/user/count/applicant",
        headers: {
          Authorization: token,
        },
      }),
      transformResponse: (response: ApiResponse) => {
        console.log("Raw API response:", response);
        return response.status_counts;
      },
      transformErrorResponse: (response: { data: { message: string } }) =>
        response.data.message,
    }),
    getApplicationsCategorycount: builder.query<
      employercount,
      { token: string }
    >({
      query: ({ token }) => ({
        url: "applications/user/count/employer",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetJobsForallQuery,
  useAddApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationsEmployerQuery,
  useGetApplicationscountQuery,
  useGetApplicationsCategorycountQuery,
} = applicationsApi;
