import { z } from "zod";
import { jobSchema } from "./job";
import { Joan } from "next/font/google";
import { userschema } from "./user";
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
