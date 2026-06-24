"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Send } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const reasons = [
  "Map QuantumHalon to your protected traffic paths",
  "Compare policy modes for real traffic paths",
  "Discuss HNDL risk and data-lifetime priorities",
  "Plan trust readiness for mediated protection",
  "Align technical deployment with governance and procurement timelines",
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
      setError(err instanceof Error ? err.message : "An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <section className="relative overflow-hidden border-b border-white/5 pt-28 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel label="Contact" />
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              See how QuantumHalon fits your traffic paths.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Request a technical conversation with QCertify. We will focus on protected paths, policy modes, trust readiness, and realistic post-quantum transition priorities.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/protected-path-workshop.png"
                  alt="Minimal isometric protected-path workshop illustration with QuantumHalon placed inline."
                  fill
                  preload
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.82)_100%)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white">Useful topics for the first call</h2>
            <div className="mt-6 space-y-3">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0ea5e9]" />
                  <span className="text-sm leading-6 text-slate-300">{reason}</span>
                </div>
              ))}
            </div>

            <div className="glass-panel mt-10 rounded-lg p-6">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60" />
                <span className="text-sm font-medium text-white">Prefer email?</span>
              </div>
              <a href="mailto:contact@qcertify.io" className="font-mono text-sm text-[#0ea5e9] transition-colors hover:text-white">
                contact@qcertify.io
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel-heavy rounded-lg p-12 text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-[#0ea5e9]" />
                <h3 className="mb-3 text-2xl font-semibold text-white">Thank you.</h3>
                <p className="text-base text-slate-400">A member of our team will respond within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-6 sm:p-8 lg:p-10">
                {error ? <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{error}</div> : null}
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
                  <SelectField id="interest" label="Interest" options={interests} placeholder="What are you most interested in?" />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#0ea5e9]/50 focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]/30"
                    placeholder="Tell us about your network, traffic paths, or PQC readiness goals..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-panel glass-interactive mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 font-bold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Request a Technical Demo"}
                </button>
                <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                  QCertify uses your information only to respond to your request and does not share contact details with third parties.
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
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#0ea5e9]/50 focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]/30"
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
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="w-full appearance-none rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-sm text-white transition-colors focus:border-[#0ea5e9]/50 focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]/30"
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
