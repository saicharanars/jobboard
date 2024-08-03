// lib/redux/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorResponse, Job } from "../../types/job";
import {
  AddJobApplication,
  ApiResponse,
  ApplicationsResponse,
  EmployerApplicationsResponse,
  StatusCounts,
  statusResponse,
} from "@/lib/types/Application";
const url = "https://jobboard-4945.onrender.com/";
// const url = "http://localhost:3001/";

interface jobsresponse {
  data: {
    jobs: Job[];
    totaljobs: number;
  };
  message: string;
}

export const applicationsApi = createApi({
  reducerPath: "ApplicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    getJobsForAll: builder.query<
      jobsresponse,
      {
        sortdate?: string;
        category?: string;
        location?: string;
        skip?: number;
        take?: number;
      }
    >({
      query: (params) => {
        const queryParams: Record<string, string | number> = {};
        if (params.sortdate) queryParams.sortdate = params.sortdate;
        if (params.category) queryParams.category = params.category;
        if (params.location) queryParams.location = params.location;
        if (params.skip !== undefined) queryParams.skip = params.skip;
        const queryString = Object.entries(queryParams)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
        return {
          url: `jobs?${queryString}&take=${params?.take || 10}`,
          method: "GET",
        };
      },
    }),
    addApplication: builder.mutation<
      AddJobApplication,
      { application: AddJobApplication; token: string; jobId: string }
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
      transformResponse: (response: ApplicationsResponse) => response,
    }),

    getApplicationsEmployer: builder.query<
      EmployerApplicationsResponse,
      { token: string }
    >({
      // Change the type to accept a string parameter
      query: ({ token }) => ({
        // Accept token as a parameter
        url: "applications/employer",
        headers: {
          Authorization: token, // Set the token in the headers
        },
        transformResponse: (
          response: EmployerApplicationsResponse,

          arg: any
        ) => {
          console.log("Raw API response:", response);
          return {
            originalArg: arg,
            data: response.applications,
          };
        },
        // transformResponse: (response: EmployerApplicationsResponse) =>{

        //   console.log("Raw API response:", response),
        //   response.applications,
        // },
        transformErrorResponse: (response: ErrorResponse) =>
          response.data.message,
      }),
    }),
    getApplicationscount: builder.query<StatusCounts, { token: string }>({
      query: ({ token }) => ({
        url: "applications/user/count/applicant",
        headers: {
          Authorization: token,
        },
      }),
      transformResponse: (response: statusResponse) => {
        console.log("Raw API response:", response);
        return response.status_counts;
      },
    }),
    getApplicationsCategorycount: builder.query<ApiResponse, { token: string }>(
      {
        query: ({ token }) => ({
          url: "applications/user/count/employer",
          headers: {
            Authorization: token,
          },
        }),
      }
    ),
  }),
});

export const {
  useGetJobsForAllQuery,
  useAddApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationsEmployerQuery,
  useGetApplicationscountQuery,
  useGetApplicationsCategorycountQuery,
} = applicationsApi;
