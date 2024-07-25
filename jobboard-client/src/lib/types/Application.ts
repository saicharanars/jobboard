import { z } from "zod";
import { jobSchema } from "./job";
import { Joan } from "next/font/google";
import { userschema } from "./user";
import { type ClassValue } from "clsx";
const addJobApplicationschema = z.object({
  //   jobId: z.string().uuid(),
  resume_url: z.string().url(),
  answers: z.string().array(),
});
const JobApplicationschema = addJobApplicationschema.extend({
  id: z.string().uuid(),

  createdDate: z.string().datetime(),
  job: jobSchema,
});
const JobApplicationwithjobschema = JobApplicationschema.extend({
  job: jobSchema,
});
const empl = JobApplicationschema.extend({
  applicant: userschema,
});
const jobapplicationwithemploy = JobApplicationwithjobschema.shape.job.omit({
  openings: true,
  location: true,
});
const Employerjob = jobSchema.omit({
  description: true,
  location: true,
  openings: true,
  createdDate: true,
});
const user = userschema.omit({
  role: true,
  createdDate: true,
  updatedDate: true,
});
const EmployApplicationsSchme = addJobApplicationschema.extend({
  createdDate: z.string().datetime(),
  status: z.string(),
  id: z.string().uuid(),
  job: Employerjob,
  user: user,
});

const statusSchma = z.object({
  pending: z.number(),
  inreview: z.number(),
  shortlisted: z.number(),
  interview: z.number(),
  declined: z.number(),
  hired: z.number(),
});

export interface CategoryCounts {
  [category: string]: string; // or number, depending on your API response
}
export interface StatusCounts {
  [status: string]: string; // or number, depending on your API response
}
export interface employercount {
  status: StatusCounts;
  category: CategoryCounts;
  message: string;
}
export interface ApiResponse {
  status_counts: StatusCounts;
  message: string;
}
export interface ApplicationsResponse {
  applications: JobApplication[];
  total: number;
  message: string;
}
export type status = z.infer<typeof statusSchma>;
export type EmployerApplications = z.infer<typeof EmployApplicationsSchme>;

export type employejob = z.infer<typeof jobapplicationwithemploy>;
export type JobApplicationwithjob = z.infer<typeof JobApplicationwithjobschema>;
export type addJobApplication = z.infer<typeof addJobApplicationschema>;
export type JobApplication = z.infer<typeof JobApplicationschema>;
export {
  addJobApplicationschema,
  JobApplicationschema,
  JobApplicationwithjobschema,
  jobapplicationwithemploy,
};
