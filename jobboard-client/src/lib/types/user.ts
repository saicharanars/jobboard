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

const profileSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  date_of_birth: z.string().date(),
  resume_url: z.string().url(),
  profile_picture_url: z.string().url(),
  location: z.string(),
  sociallinks: z.object({
    linkedin: z.string().url(),
    github: z.string().url(),
    website: z.string().url(),
  }),
});
const omituser = signupSchema.omit({ password: true });
const userschema = omituser.extend({
  id: z.string().uuid(),
  role: z.string(),
  createdDate: z.string().datetime(),
  updatedDate: z.string().datetime(),
});
export type profile = z.infer<typeof profileSchema>;
const editprofileschema = profileSchema.pick({
  description: true,
  date_of_birth: true,
  location: true,
  sociallinks: true,
});
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = ["application/pdf"];
const profilePhotoSchema = z.object({
  picture: z
    .instanceof(FileList)
    .refine(
      (file) =>
        file.length == 1
          ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
            ? true
            : false
          : true,
      "Invalid file. choose either JPEG or PNG image"
    )
    .refine(
      (file) =>
        file.length == 1
          ? file[0]?.size <= MAX_FILE_SIZE
            ? true
            : false
          : true,
      "Max file size allowed is 8MB."
    ),
});
const resumeSchema = z.object({
  resume: z
    .instanceof(FileList)
    .refine(
      (file) =>
        file.length == 1
          ? ACCEPTED_DOC_TYPES.includes(file?.[0]?.type)
            ? true
            : false
          : true,
      "Invalid file. choose pdf"
    )
    .refine(
      (file) =>
        file.length == 1
          ? file[0]?.size <= MAX_FILE_SIZE
            ? true
            : false
          : true,
      "Max file size allowed is 8MB."
    ),
});
export type user = z.infer<typeof userschema>;
export type profilePhoto = z.infer<typeof profilePhotoSchema>;
export type resume = z.infer<typeof resumeSchema>;
export type editprofile = z.infer<typeof editprofileschema>;

export type signup = z.infer<typeof signupSchema>;
export type login = z.infer<typeof loginSchema>;
export {
  signupSchema,
  loginSchema,
  profileSchema,
  editprofileschema,
  profilePhotoSchema,
  resumeSchema,
  userschema,
};
