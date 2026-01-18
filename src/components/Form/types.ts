export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  age?: number;
  website?: string;
  bio?: string;
  country?: string;
  contactMethod?: "email" | "phone" | "none";
  interests?: string[];
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  subscribe?: boolean;
  agreeToTerms?: boolean;
};
