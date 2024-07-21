import { z } from "zod";
import { jobSchema } from "./job";
import { Joan } from "next/font/google";
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
export type JobApplicationwithjob = z.infer<typeof JobApplicationwithjobschema>;
export type addJobApplication = z.infer<typeof addJobApplicationschema>;
export type JobApplication = z.infer<typeof JobApplicationschema>;
export {
  addJobApplicationschema,
  JobApplicationschema,
  JobApplicationwithjobschema,
};
