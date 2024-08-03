import { z } from "zod";

const addjobSchema = z.object({
  job_role: z.string().min(5, {
    message: "job_role must be at least 5 characters.",
  }),
  description: z.string().min(30, {
    message: "description must be at least 30 characters.",
  }),
  location: z.string().min(5, {
    message: "location must be at least 5 characters.",
  }),
  category: z.string().min(3, {
    message: "category must be at least 3 characters.",
  }),
  openings: z.coerce.number(),
  questions: z.array(z.string().min(1, "Question cannot be empty")),
});

const jobSchema = addjobSchema.extend({
  id: z.string().uuid(),
  createdDate: z.string().datetime(),
});
const editjobschema = jobSchema.omit({
  description:true,openings:true,createdDate:true,location:true
})
export type addJob = z.infer<typeof addjobSchema>;
export type Job = z.infer<typeof jobSchema>;
export type editJob = z.infer<typeof editjobschema>;
export { addjobSchema, jobSchema };
export interface employerJobsResponse {
  job: Job[];
  message: string;
};
export type ErrorResponse = {
  data: {
    message: string;
  };
};