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
  questions:z.string().array()
});
const jobSchema = addjobSchema.extend({
  id: z.string().uuid(),
  createdDate:z.string().datetime()
   // Assuming id is a UUID
});

export type addJob = z.infer<typeof addjobSchema>;
export type Job = z.infer<typeof jobSchema>;
export { addjobSchema,jobSchema}
