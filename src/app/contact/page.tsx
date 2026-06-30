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

            <FadeIn delay={0.08} className="mt-10 border border-black/10 bg-white/[0.55] p-6">
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
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="border border-black bg-white p-12 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#126dff]" />
                <h3 className="mb-3 text-2xl font-semibold text-black">Request received.</h3>
                <p className="text-base text-black/[0.58]">A QCertify representative responds within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-black/10 bg-white/60 p-6 sm:p-8 lg:p-10">
                {error ? <div className="mb-6 border border-[#ff6b5f] bg-[#ff6b5f]/[0.08] p-4 text-sm text-black">{error}</div> : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="firstName" label="First name" placeholder="Jane" required />
                  <Field id="lastName" label="Last name" placeholder="Carter" required />
                </div>
                <div className="mt-5">
                  <Field id="email" label="Work email" type="email" placeholder="jane@company.com" required />
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field id="company" label="Company" placeholder="Company" required />
                  <Field id="jobTitle" label="Job title" placeholder="CISO" required />
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <SelectField id="industry" label="Industry" options={industries} placeholder="Select industry" />
                  <SelectField id="interest" label="Interest" options={interests} placeholder="Select primary interest" />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-[10px] font-semibold uppercase text-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder-black/[0.35] transition-colors focus:border-black focus:outline-none"
                    placeholder="Describe the network, traffic paths, or PQC readiness goals..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 border border-black bg-black px-8 py-4 text-[11px] font-semibold uppercase text-[#fff] transition-colors hover:bg-transparent hover:text-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Request a Technical Demo"}
                </button>
                <p className="mt-4 text-center text-xs leading-6 text-black/[0.45]">
                  Submitted information is used only to respond to the request.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
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
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] font-semibold uppercase text-black">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder-black/[0.35] transition-colors focus:border-black focus:outline-none"
        placeholder={placeholder}
      />
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
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] font-semibold uppercase text-black">
        {label}
      </label>
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
    </div>
  );
}
