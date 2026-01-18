import { z } from "zod";
import type { FormValues } from "./types";

export const formSchema: z.ZodType<FormValues> = z.object({
  firstName: z.string().min(2, "firstName.error.minLength"),
  lastName: z.string().min(2, "lastName.error.minLength"),
  email: z.string().email("email.error.invalid"),
  password: z.string().min(6, "password.error.minLength"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  age: z.coerce.number().int().min(0).max(120).optional(),
  website: z.union([z.string().url("website.error.invalid"), z.literal("")]).optional(),
  bio: z.string().min(10, "bio.error.minLength").max(300).optional(),
  country: z.string().optional(),
  contactMethod: z.enum(["email", "phone", "none"]).optional(),
  interests: z.array(z.string()).optional(),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  subscribe: z.boolean().optional(),
  agreeToTerms: z.boolean().optional(),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "passwords.error.mismatch",
});
