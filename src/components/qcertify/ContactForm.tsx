"use client";

import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import styles from "@/app/home.module.css";

type FormState = { status: "idle" | "submitting" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState({ status: "submitting", message: "Sending request…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Request failed.");
      form.reset();
      setState({ status: "success", message: body.message || "Request received." });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Request failed. Email contact@qcertify.io instead.",
      });
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={submit} noValidate>
      <div className={styles.fieldPair}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Your name" />
        </label>
        <label className={styles.field}>
          <span>Work email</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>
      <div className={styles.fieldPair}>
        <label className={styles.field}>
          <span>Company</span>
          <input name="company" type="text" required maxLength={120} autoComplete="organization" placeholder="Company" />
        </label>
        <label className={styles.field}>
          <span>Priority path</span>
          <select name="priorityPath" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option value="critical-system">Critical system path</option>
            <option value="site-to-site">Site-to-site traffic</option>
            <option value="partner-exchange">Partner exchange</option>
            <option value="hybrid-cloud">Hybrid cloud transit</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
      </div>
      <label className={styles.field}>
        <span>Context <em>Optional</em></span>
        <textarea name="message" rows={3} maxLength={1200} placeholder="What data path cannot wait?" />
      </label>
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className={styles.formFooter}>
        <p aria-live="polite" data-status={state.status}>
          {state.status === "success" && <Check aria-hidden="true" size={14} />}
          {state.message || "No live traffic, keys, or topology are required for the first conversation."}
        </p>
        <button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? (
            <LoaderCircle className={styles.spinner} aria-hidden="true" size={16} />
          ) : (
            <ArrowUpRight aria-hidden="true" size={16} />
          )}
          Request review
        </button>
      </div>
    </form>
  );
}
