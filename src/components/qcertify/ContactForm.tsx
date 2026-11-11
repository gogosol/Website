"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { intentLabels, interestLabels, interests, legacyGoals, type Intent } from "@/lib/contact";
import styles from "./ContactForm.module.css";

type FormState = { status: "idle" | "submitting" | "success" | "error"; message: string };
type FieldName = "name" | "email" | "company" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const requiredMessages: Record<Exclude<FieldName, "message">, string> = {
  name: "Enter your name.",
  email: "Enter your work email.",
  company: "Enter your organisation.",
};

const intentDetails: Record<Intent, string> = {
  demo: "A guided walkthrough of discovery, policy, enforcement and posture, mapped to your network.",
  deployment: "Scope a pilot or a first protected path: placement, trust, reachability and policy.",
};

function validate(form: HTMLFormElement): FieldErrors {
  const errors: FieldErrors = {};
  for (const name of ["name", "email", "company"] as const) {
    const field = form.elements.namedItem(name) as HTMLInputElement;
    const value = field.value.trim();
    if (!value) errors[name] = requiredMessages[name];
    else if (name === "email" && (!field.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) errors.email = "Enter a valid email address, such as name@company.com.";
    else if (name !== "email" && /[<>]/.test(value)) errors[name] = "Remove the < and > characters.";
  }
  return errors;
}

export function ContactForm() {
  const id = useId();
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [intent, setIntent] = useState<Intent>("demo");
  const submitting = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const interestSelect = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (state.status === "success") successHeading.current?.focus();
  }, [state.status]);

  // Links such as /demo?intent=deployment (or the older ?goal=launch-pilot) preselect the request.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("intent");
    const legacy = legacyGoals[params.get("goal") ?? ""];
    const next = requested === "demo" || requested === "deployment" ? requested : legacy?.intent;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (next) setIntent(next);
    const interest = params.get("interest") ?? legacy?.interest;
    if (interest && interestSelect.current && (interests as readonly string[]).includes(interest)) interestSelect.current.value = interest;
  }, []);

  function clearError(name: FieldName) {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setState({ status: "error", message: "Check the highlighted fields to continue." });
      (form.elements.namedItem(firstInvalid) as HTMLElement)?.focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    submitting.current = true;
    setState({ status: "submitting", message: "Sending your request…" });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
      const body = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !body || body.ok === false || typeof body.message !== "string") {
        setState({ status: "error", message: typeof body?.message === "string" ? body.message : "We could not confirm delivery. Please try again or email contact@qcertify.io." });
        return;
      }
      setState({ status: "success", message: body.message });
    } catch {
      setState({ status: "error", message: "We could not confirm delivery. Check your connection and try again, or email contact@qcertify.io." });
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  function fieldProps(name: FieldName) {
    return {
      id: `${id}-${name}`,
      name,
      "aria-invalid": errors[name] ? true as const : undefined,
      "aria-describedby": errors[name] ? `${id}-${name}-error` : name === "message" ? `${id}-context-note` : undefined,
      onChange: () => clearError(name),
    };
  }

  function fieldError(name: FieldName) {
    return errors[name] ? <span className={styles.fieldError} id={`${id}-${name}-error`}>{errors[name]}</span> : null;
  }

  if (state.status === "success") {
    return <div className={styles.success}>
      <span className={styles.successIcon}><Check size={28} aria-hidden="true" /></span>
      <h2 ref={successHeading} tabIndex={-1}>Thank you. Your request is with us.</h2>
      <p role="status">{state.message}</p>
      <p className={styles.successNote}>We will reply from contact@qcertify.io to arrange a time. No technical access or network details are needed at this stage.</p>
      <a className="text-link" href="mailto:contact@qcertify.io">contact@qcertify.io <ArrowRight size={16} aria-hidden="true" /></a>
    </div>;
  }

  return <form className={styles.form} onSubmit={submit} noValidate aria-label="Contact QCertify about QuantumHalon" aria-busy={state.status === "submitting"}>
    <div className={styles.formHeading}>
      <h2>How can we help?</h2>
      <p>Tell us a little about your organisation. We reply by email.</p>
    </div>
    <fieldset disabled={state.status === "submitting"} className={styles.fields}>
      <legend className={styles.srOnly}>Your request and contact details</legend>
      <fieldset className={styles.intents}>
        <legend className={styles.intentLegend}>I would like</legend>
        {(Object.keys(intentLabels) as Intent[]).map((value) => <label key={value} className={styles.intent} data-checked={intent === value || undefined}>
          <input type="radio" name="intent" value={value} checked={intent === value} onChange={() => setIntent(value)} />
          <span className={styles.intentText}><strong>{value === "demo" ? "A technical demo" : "To discuss a pilot or deployment"}</strong><span>{intentDetails[value]}</span></span>
        </label>)}
      </fieldset>
      <p className={styles.requiredNote}>All fields are required unless marked optional.</p>
      <div className={styles.fieldPair}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Name</label>
          <input {...fieldProps("name")} type="text" required maxLength={80} autoComplete="name" />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>Work email</label>
          <input {...fieldProps("email")} type="email" required maxLength={254} autoComplete="email" inputMode="email" placeholder="name@company.com" />
          {fieldError("email")}
        </div>
      </div>
      <div className={styles.fieldPair}>
        <div className={styles.field}>
          <label htmlFor={`${id}-company`}>Organisation</label>
          <input {...fieldProps("company")} type="text" required maxLength={120} autoComplete="organization" />
          {fieldError("company")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-interest`}>Area of interest <span>Optional</span></label>
          <select id={`${id}-interest`} name="interest" ref={interestSelect} defaultValue="not-sure">
            {interests.map((value) => <option key={value} value={value}>{interestLabels[value]}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-message`}>What would you like to cover? <span>Optional</span></label>
        <textarea {...fieldProps("message")} rows={3} maxLength={1200} />
        <p id={`${id}-context-note`} className={styles.contextNote}>Keep it high level. Please do not include credentials, keys or confidential network details.</p>
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className={`button ${styles.submit}`} type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending request…" : intent === "demo" ? "Request a technical demo" : "Request a deployment conversation"}
        {state.status === "submitting" ? <LoaderCircle className={styles.spinner} size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
      </button>
    </fieldset>
    <div className={styles.status} data-status={state.status} role={state.status === "error" ? "alert" : "status"} aria-live={state.status === "error" ? "assertive" : "polite"}>{state.message}</div>
    <p className={styles.contactAlternative}>Prefer email? <a href="mailto:contact@qcertify.io">contact@qcertify.io</a></p>
    <noscript><p>JavaScript is needed to send this form. Please email <a href="mailto:contact@qcertify.io">contact@qcertify.io</a>.</p></noscript>
  </form>;
}
