import "./Form.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useFormCache } from "../../hooks/useFormCache";
import { formSchema } from "./schema";
import type { FormValues } from "./types";

export default function Form({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation("form");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
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

  useFormCache(watch, setValue);

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Submitted:", data);
    localStorage.setItem("registrationComplete", "true");
    localStorage.removeItem("registration-form-cache");
    onSuccess();
  });

  return (
    <div className="form-shell">
      <h1>{t("title")}</h1>

      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="firstName">
            {t("firstName.label")}
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> {t("required")}</span>
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
            <p role="alert" id="firstName-error">{t(`firstName.${errors.firstName.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="lastName">
            {t("lastName.label")}
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> {t("required")}</span>
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
            <p role="alert" id="lastName-error">{t(`lastName.${errors.lastName.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">
            {t("email.label")}
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> {t("required")}</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("email.placeholder")}
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" id="email-error">{t(`email.${errors.email.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">
            {t("password.label")}
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> {t("required")}</span>
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
            <p role="alert" id="password-error">{t(`password.${errors.password.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">
            {t("confirmPassword.label")}
            <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only"> {t("required")}</span>
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
            <p role="alert" id="confirmPassword-error">{t(`confirmPassword.${errors.confirmPassword.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phoneNumber">{t("phoneNumber.label")}</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder={t("phoneNumber.placeholder")}
            autoComplete="tel"
            aria-invalid={!!errors.phoneNumber || undefined}
            aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p role="alert" id="phoneNumber-error">{errors.phoneNumber.message as string}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="age">
            {t("age.label")}: <strong>{watch("age") ?? 0}</strong>
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

        <div className="field">
          <label htmlFor="website">{t("website.label")}</label>
          <input
            id="website"
            type="url"
            placeholder={t("website.placeholder")}
            aria-invalid={!!errors.website || undefined}
            aria-describedby={errors.website ? "website-error" : undefined}
            {...register("website")}
          />
          {errors.website && (
            <p role="alert" id="website-error">{t(`website.${errors.website.message}`)}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="bio">{t("bio.label")}</label>
          <textarea
            id="bio"
            rows={4}
            maxLength={300}
            placeholder={t("bio.placeholder")}
            aria-invalid={!!errors.bio || undefined}
            aria-describedby={`${errors.bio ? "bio-error " : ""}bio-help bio-count`}
            {...register("bio")}
          />
          {errors.bio && (
            <p role="alert" id="bio-error">{t(`bio.${errors.bio.message}`)}</p>
          )}
          <small id="bio-help" className="help">{t("bio.help")}</small>
          <div id="bio-count" className="muted" aria-live="polite">
            {(watch("bio")?.length ?? 0)}/300
          </div>
        </div>

        <div className="field">
          <label htmlFor="country">{t("country.label")}</label>
          <select
            id="country"
            aria-invalid={!!errors.country || undefined}
            aria-describedby={errors.country ? "country-error" : undefined}
            {...register("country")}
          >
            <option value="">{t("country.options.select")}</option>
            <option value="us">{t("country.options.us")}</option>
            <option value="il">{t("country.options.il")}</option>
            <option value="uk">{t("country.options.uk")}</option>
            <option value="ca">{t("country.options.ca")}</option>
            <option value="de">{t("country.options.de")}</option>
          </select>
          {errors.country && (
            <p role="alert" id="country-error">{errors.country.message as string}</p>
          )}
        </div>

        <fieldset className="field">
          <legend>{t("contactMethod.legend")}</legend>
          <label className="custom-radio">
            <input type="radio" value="email" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>{t("contactMethod.email")}</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="phone" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>{t("contactMethod.phone")}</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="none" {...register("contactMethod")} />
            <span className="custom-radio-indicator" />
            <span>{t("contactMethod.none")}</span>
          </label>
          {errors.contactMethod && (
            <p role="alert">{errors.contactMethod.message as string}</p>
          )}
        </fieldset>

        <fieldset className="field">
          <legend>{t("interests.legend")}</legend>
          <label className="custom-checkbox">
            <input type="checkbox" value="frontend" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("interests.frontend")}</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="backend" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("interests.backend")}</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="devops" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("interests.devops")}</span>
          </label>
          <label className="custom-checkbox">
            <input type="checkbox" value="uiux" {...register("interests")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("interests.uiux")}</span>
          </label>
          {errors.interests && (
            <p role="alert">{errors.interests.message as string}</p>
          )}
        </fieldset>

        <fieldset className="field">
          <legend>{t("experienceLevel.legend")}</legend>
          <label className="custom-radio">
            <input type="radio" value="beginner" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>{t("experienceLevel.beginner")}</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="intermediate" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>{t("experienceLevel.intermediate")}</span>
          </label>
          <label className="custom-radio">
            <input type="radio" value="advanced" {...register("experienceLevel")} />
            <span className="custom-radio-indicator" />
            <span>{t("experienceLevel.advanced")}</span>
          </label>
          {errors.experienceLevel && (
            <p role="alert">{errors.experienceLevel.message as string}</p>
          )}
        </fieldset>

        <div className="field">
          <label className="custom-checkbox">
            <input type="checkbox" {...register("subscribe")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("subscribe")}</span>
          </label>
        </div>

        <div className="field">
          <label className="custom-checkbox">
            <input type="checkbox" {...register("agreeToTerms")} />
            <span className="custom-checkbox-indicator" />
            <span>{t("agreeToTerms")}</span>
          </label>
          {errors.agreeToTerms && (
            <p role="alert">{errors.agreeToTerms.message as string}</p>
          )}
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}