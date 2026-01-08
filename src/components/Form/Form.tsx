import "./Form.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormCache } from "../../hooks/useFormCache";

// Explicit type you had/like to keep
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  age?: number;
  website?: string;         // empty string allowed by schema
  bio?: string;
  country?: string;
  contactMethod?: "email" | "phone" | "none";
  interests?: string[];
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  subscribe?: boolean;
  agreeToTerms?: boolean;
};

// Bind the schema to that type so TS checks they match
const schema: z.ZodType<FormValues> = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  age: z.coerce.number().int().min(0).max(120).optional(),
  website: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  bio: z.string().min(10, "At least 10 characters").max(300).optional(),
  country: z.string().optional(),
  contactMethod: z.enum(["email", "phone", "none"]).optional(),
  interests: z.array(z.string()).optional(),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  subscribe: z.boolean().optional(),
  agreeToTerms: z.boolean().optional(),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});

export default function Form({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      age: undefined,
      website: "",
      bio: "",
      country: "",
      contactMethod: "email",
      interests: [],
      experienceLevel: "beginner",
      subscribe: false,
      agreeToTerms: false,
    },
  });

  // Cache non-sensitive fields
  useFormCache(watch, setValue);

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Submitted:", data);
    localStorage.setItem("registrationComplete", "true");
    // Clear the cache after successful submission
    localStorage.removeItem("registration-form-cache");
    onSuccess();
  });

  return (
    <div className="form-shell">
      <h1>Registration</h1>

      <form onSubmit={onSubmit} noValidate>
        {/* First Name */}
        <div className="field">
          <label htmlFor="firstName">
            First Name
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.firstName || undefined}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p role="alert" id="firstName-error">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="field">
          <label htmlFor="lastName">
            Last Name
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.lastName || undefined}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p role="alert" id="lastName-error">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="field">
          <label htmlFor="email">
            Email
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" id="email-error">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="field">
          <label htmlFor="password">
            Password
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            aria-required="true"
            aria-invalid={!!errors.password || undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p role="alert" id="password-error">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="field">
          <label htmlFor="confirmPassword">
            Confirm Password
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            aria-required="true"
            aria-invalid={!!errors.confirmPassword || undefined}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p role="alert" id="confirmPassword-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="+1 555 123 4567"
            autoComplete="tel"
            aria-invalid={!!errors.phoneNumber || undefined}
            aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p role="alert" id="phoneNumber-error">{errors.phoneNumber.message as string}</p>
          )}
        </div>

        {/* Age (range slider) */}
        <div className="field">
          <label htmlFor="age">
            Age: <strong>{watch("age") ?? 0}</strong>
          </label>
          <input
            id="age"
            type="range"
            min={0}
            max={120}
            step={1}
            aria-invalid={!!errors.age || undefined}
            aria-describedby={errors.age ? "age-error" : undefined}
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p role="alert" id="age-error">{errors.age.message as string}</p>
          )}
        </div>

        {/* Website */}
        <div className="field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            placeholder="https://example.com"
            aria-invalid={!!errors.website || undefined}
            aria-describedby={errors.website ? "website-error" : undefined}
            {...register("website")}
          />
          {errors.website && (
            <p role="alert" id="website-error">{errors.website.message as string}</p>
          )}
        </div>

        {/* Bio (with helper + counter) */}
        <div className="field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={4}
            maxLength={300}
            placeholder="Tell us a bit about yourself..."
            aria-invalid={!!errors.bio || undefined}
            aria-describedby={`${errors.bio ? "bio-error " : ""}bio-help bio-count`}
            {...register("bio")}
          />
          {errors.bio && (
            <p role="alert" id="bio-error">{errors.bio.message as string}</p>
          )}
          <small id="bio-help" className="help">10–300 characters.</small>
          <div id="bio-count" className="muted" aria-live="polite">
            {(watch("bio")?.length ?? 0)}/300
          </div>
        </div>

        {/* Country */}
        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            aria-invalid={!!errors.country || undefined}
            aria-describedby={errors.country ? "country-error" : undefined}
            {...register("country")}
          >
            <option value="">Select…</option>
            <option value="us">United States</option>
            <option value="il">Israel</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="de">Germany</option>
          </select>
          {errors.country && (
            <p role="alert" id="country-error">{errors.country.message as string}</p>
          )}
        </div>

        {/* Preferred contact (radio) */}
        <fieldset className="field">
          <legend>Preferred contact</legend>
          <label className="custom-radio">
            <input type="radio" value="email" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>Email</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="phone" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>Phone</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="none" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>None</span>
          </label>
          {errors.contactMethod && (
            <p role="alert">{errors.contactMethod.message as string}</p>
          )}
        </fieldset>

        {/* Interests (checkbox group) */}
        <fieldset className="field">
          <legend>Interests</legend>
          <label className="custom-checkbox">
            <input type="checkbox" value="frontend" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>Frontend</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="backend" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>Backend</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="devops" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>DevOps</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="uiux" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>UI/UX</span>
          </label>
          {errors.interests && (
            <p role="alert">{errors.interests.message as string}</p>
          )}
        </fieldset>

        {/* Experience level (radio) */}
        <fieldset className="field">
          <legend>Experience level</legend>
          <label className="custom-radio">
            <input type="radio" value="beginner" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>Beginner</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="intermediate" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>Intermediate</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="advanced" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>Advanced</span>
          </label>
          {errors.experienceLevel && (
            <p role="alert">{errors.experienceLevel.message as string}</p>
          )}
        </fieldset>

        {/* Subscribe */}
        <div className="field">
          <label className="custom-checkbox">
            <input type="checkbox" {...register("subscribe")} />
            <span className="custom-checkbox-indicator" />
            <span>Subscribe to newsletter</span>
          </label>
        </div>

        {/* Agree to terms */}
        <div className="field">
          <label className="custom-checkbox">
            <input type="checkbox" {...register("agreeToTerms")} />
            <span className="custom-checkbox-indicator" />
            <span>I agree to the terms</span>
          </label>
          {errors.agreeToTerms && (
            <p role="alert">{errors.agreeToTerms.message as string}</p>
          )}
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}