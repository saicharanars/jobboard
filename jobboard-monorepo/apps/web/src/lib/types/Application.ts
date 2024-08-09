import { z } from "zod";
import { Job, jobSchema } from "./job";
import { userschema } from "./user";

// Schemas
const addJobApplicationschema = z.object({
  resume_url: z.string().url(),
  answers: z.array(z.string()),
});
const ApplicationSchema = addJobApplicationschema.extend({
  status: z.enum([
    "pending",
    "inreview",
    "shortlisted",
    "interview",
    "declined",
    "hired",
  ]),
});
const updateApplicationSchema = ApplicationSchema.partial();

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

const statusSchema = z.object({
  pending: z.number(),
  inreview: z.number(),
  shortlisted: z.number(),
  interview: z.number(),
  declined: z.number(),
  hired: z.number(),
});

// Interfaces and Types
export interface CategoryCounts {
  [category: string]: number; // Changed to number for consistency
}

export interface StatusCounts {
  [status: string]: number; // Changed to number for consistency
}

export interface ApiResponse {
  status: StatusCounts;
  category: CategoryCounts;
  message: string;
}
export interface statusResponse {
  status_counts: StatusCounts;
  message: string;
}

export interface ApplicationsResponse {
  applications: JobApplication[];
  total: number;
  message: string;
}
export interface EmployerApplicationsResponse {
  applications: EmployerApplications[];
  message: string;
}

export interface AddJobResponse {
  job: Job;
  message: string;
}

export type Status = z.infer<typeof statusSchema>;
export type EmployerApplications = z.infer<typeof EmployApplicationsSchme>;
export type EmployeeJob = z.infer<typeof jobapplicationwithemploy>;
export type JobApplicationWithJob = z.infer<typeof JobApplicationwithjobschema>;
export type AddJobApplication = z.infer<typeof addJobApplicationschema>;
export type updateJobApplication = z.infer<typeof updateApplicationSchema>;

export type JobApplication = z.infer<typeof JobApplicationschema>;

export {
  addJobApplicationschema,
  JobApplicationschema,
  JobApplicationwithjobschema,
  jobapplicationwithemploy,
};
