"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { FadeIn, RevealText } from "@/components/QuantumPage";

const reasons = [
  "Map QuantumHalon to protected traffic paths",
  "Compare policy modes for real routes",
  "Discuss HNDL risk and data-lifetime priorities",
  "Plan trust readiness for governed rollout",
  "Align deployment with governance and procurement timelines",
];

const industries = [
  "Financial Services",
  "Healthcare",
  "Government",
  "Critical Infrastructure",
  "Enterprise",
  "Other",
];

const interests = [
  "Technical demo",
  "Architecture review",
  "PQC readiness planning",
  "Use case discussion",
  "General inquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "The request could not be submitted. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#126dff]/[0.15]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 circuit-mask opacity-45" />
        <div className="editorial-wrap relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel label="Contact" />
            <h1 className="mt-3 max-w-5xl text-5xl font-medium leading-[0.9] text-black sm:text-6xl lg:text-8xl">
              <RevealText text="Map QuantumHalon to protected traffic paths." />
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-black/[0.62] sm:text-lg">
              Request a technical conversation with QCertify focused on
              protected paths, policy modes, trust readiness, and realistic
              post-quantum transition priorities.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <div className="technical-plate">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/generated/contact-workshop-map-plate.webp"
                  alt="Decorative monochrome technical plate showing a protected-path workshop map."
                  fill
                  preload
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-medium leading-none text-black">
              <RevealText text="Useful first-call topics" />
            </h2>
            <div className="mt-8 grid gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason}
                  className="grid grid-cols-[18px_1fr] gap-3 border-t border-black/10 pt-4"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 text-[#126dff]" />
                  <span className="text-sm leading-6 text-black/[0.62]">{reason}</span>
                </motion.div>
              ))}
            </div>

            <FadeIn delay={0.06} className="mt-10 border-y border-black/10">
              <div className="border-b border-black/10 px-4 py-3 text-[9px] font-semibold uppercase leading-4 text-black/[0.45]">
                Response protocol
              </div>
              {[
                ["Received", "The request is logged with its traffic and readiness context."],
                ["Technical triage", "A QCertify engineer maps the inquiry to protected-path topics."],
                ["Reply", "A response follows within one business day."],
              ].map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[40px_1fr] gap-3 border-b border-black/10 px-4 py-4 last:border-b-0">
                  <span className="text-[10px] font-semibold uppercase text-[#126dff]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="text-sm font-semibold text-black">{title}</div>
                    <p className="mt-1 text-xs leading-5 text-black/[0.55]">{text}</p>
                  </div>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.1} className="mt-8 border border-black/10 bg-white/[0.55] p-6">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-black/[0.45]" />
                <span className="text-sm font-medium text-black">Prefer email?</span>
              </div>
              <a href="mailto:contact@qcertify.io" className="border-b border-black pb-1 text-[11px] font-semibold uppercase text-black">
                contact@qcertify.io
              </a>
            </FadeIn>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 0 14% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="border border-black bg-white"
                role="status"
              >
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/10 px-4 py-3 text-[9px] font-semibold uppercase leading-4 text-black/[0.45]">
                  <span>Contact protocol / complete</span>
                  <span className="flex items-center gap-2">
                    <span className="anim-hold-blink h-1.5 w-1.5 bg-[#126dff]" />
                    Logged
                  </span>
                </div>
                <div className="p-12 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#126dff]" />
                  <h3 className="mb-3 text-2xl font-semibold text-black">Request received.</h3>
                  <p className="text-base text-black/[0.58]">A QCertify representative responds within one business day.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-black/10 bg-white/60">
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/10 px-4 py-3 text-[9px] font-semibold uppercase leading-4 text-black/[0.45] sm:px-6">
                  <span>Contact protocol / three steps</span>
                  <span>~2 min</span>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  {error ? (
                    <div role="alert" className="mb-6 border border-[#ff6b5f] bg-[#ff6b5f]/[0.08] p-4 text-sm text-black">
                      {error}
                    </div>
                  ) : null}

                  <FormSection index="01" title="Identity">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="firstName" label="First name" placeholder="Jane" required />
                      <Field id="lastName" label="Last name" placeholder="Carter" required />
                    </div>
                    <div className="mt-5">
                      <Field id="email" label="Work email" type="email" placeholder="jane@company.com" required />
                    </div>
                  </FormSection>

                  <FormSection index="02" title="Organization">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="company" label="Company" placeholder="Company" required />
                      <Field id="jobTitle" label="Job title" placeholder="CISO" required />
                    </div>
                    <div className="mt-5">
                      <SelectField id="industry" label="Industry" options={industries} placeholder="Select industry" />
                    </div>
                  </FormSection>

                  <FormSection index="03" title="Focus">
                    <SelectField id="interest" label="Interest" options={interests} placeholder="Select primary interest" />
                    <div className="mt-5 group">
                      <label htmlFor="message" className="mb-2 block text-[10px] font-semibold uppercase text-black transition-colors group-focus-within:text-[#126dff]">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full resize-none border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder-black/[0.35] transition-colors focus:border-black focus:outline-none"
                          placeholder="Describe the network, traffic paths, or PQC readiness goals..."
                        />
                        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[3px] h-[2px] origin-left scale-x-0 bg-[#126dff] transition-transform duration-300 group-focus-within:scale-x-100" />
                      </div>
                    </div>
                  </FormSection>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-8 flex w-full items-center justify-center gap-2 border border-black bg-black px-8 py-4 text-[11px] font-semibold uppercase text-[#fff] transition-colors hover:bg-transparent hover:text-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Transmitting..." : "Request a Technical Demo"}
                  </button>
                  <p className="mt-4 text-center text-xs leading-6 text-black/[0.45]">
                    Submitted information is used only to respond to the request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FormSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-8 border-t border-black/10 pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden="true" className="mb-5 flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase text-[#126dff]">{index}</span>
        <span className="text-[10px] font-semibold uppercase text-black/[0.55]">{title}</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold uppercase text-black transition-colors group-focus-within:text-[#126dff]"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder-black/[0.35] transition-colors focus:border-black focus:outline-none"
          placeholder={placeholder}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#126dff] transition-transform duration-300 group-focus-within:scale-x-100"
        />
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  options,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold uppercase text-black transition-colors group-focus-within:text-[#126dff]"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="w-full appearance-none border border-black/15 bg-white px-4 py-3 text-sm text-black transition-colors focus:border-black focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 border-b border-r border-black/50 rotate-45"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#126dff] transition-transform duration-300 group-focus-within:scale-x-100"
        />
      </div>
    </div>
  );
}
