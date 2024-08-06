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
  role: z.enum(["job_candidate", "job_employer"]),
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
  date_of_birth: z.string().refine(
    (date) => {
      return !isNaN(Date.parse(date)); // Ensure the date string is valid
    },
    {
      message: "Invalid date format",
    }
  ),
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

const editprofileschema = profileSchema.pick({
  description: true,
  date_of_birth: true,
  location: true,
  sociallinks: true,
});
export const addprofileschema = z.object({
  description: z
    .string()
    .min(30, "Description must be at least 50 characters long"),
  date_of_birth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  resume_url: z.string().url("Invalid URL format"),
  profile_picture_url: z.string().url("Invalid URL format").optional(),
  location: z.string(),
  sociallinks: z
    .object({
      linkedin: z.string().url("Invalid URL format").optional(),
      github: z.string().url("Invalid URL format").optional(),
      website: z.string().url("Invalid URL format").optional(),
    })
    .optional(),
});

export type addprofile = z.infer<typeof addprofileschema>;

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = ["application/pdf"];

// Create a custom type for FileList that works in both browser and server environments
const FileListLike = z.custom<FileList>((val) => {
  return typeof window !== "undefined" && val instanceof FileList;
}, "Must be a FileList");

const profilePhotoSchema = z.object({
  picture: FileListLike.refine(
    (file) =>
      file.length === 0 ||
      (file.length === 1 && ACCEPTED_IMAGE_TYPES.includes(file[0].type)),
    "Invalid file. Choose either JPEG or PNG image"
  ).refine(
    (file) =>
      file.length === 0 || (file.length === 1 && file[0].size <= MAX_FILE_SIZE),
    "Max file size allowed is 2MB."
  ),
});

const resumeSchema = z.object({
  resume: FileListLike.refine(
    (file) =>
      file.length === 0 ||
      (file.length === 1 && ACCEPTED_DOC_TYPES.includes(file[0].type)),
    "Invalid file. Choose PDF"
  ).refine(
    (file) =>
      file.length === 0 || (file.length === 1 && file[0].size <= MAX_FILE_SIZE),
    "Max file size allowed is 2MB."
  ),
});

const getprofileResponseschema = userschema.extend({
  profile: profileSchema,
});

// Type exports
export type user = z.infer<typeof userschema>;
export type profile = z.infer<typeof profileSchema>;
export type getprofileResponse = z.infer<typeof getprofileResponseschema>;
export type profilePhoto = z.infer<typeof profilePhotoSchema>;
export type resume = z.infer<typeof resumeSchema>;
export type editprofile = z.infer<typeof editprofileschema>;
export type signup = z.infer<typeof signupSchema>;
export type login = z.infer<typeof loginSchema>;

// Schema exports
export {
  signupSchema,
  loginSchema,
  profileSchema,
  editprofileschema,
  profilePhotoSchema,
  resumeSchema,
  userschema,
};

export interface getprofileres {
  message: string;
  profile: getprofileResponse;
}
