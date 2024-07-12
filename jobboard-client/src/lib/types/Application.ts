import { z } from "zod";
const addJobApplicationschema = z.object({
//   jobId: z.string().uuid(),
  resume_url: z.string().url(),
  answers: z.string().array(),
});
export type addJobApplication = z.infer<typeof addJobApplicationschema>;
export { addJobApplicationschema };
