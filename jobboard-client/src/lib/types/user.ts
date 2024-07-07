import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not be more than 20 characters.",
    }),
  mobile_number: z.coerce.number(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not be more than 20 characters.",
    }),
});

export type signup = z.infer<typeof signupSchema>;
export type login = z.infer<typeof loginSchema>;
export { signupSchema, loginSchema };
