"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Mail } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const reasons = [
  "See QuantumHalon deployed against a real architecture scenario",
  "Understand how crypto-agile transition works in practice",
  "Discuss your organization's specific traffic protection priorities",
  "Evaluate phased deployment options for your environment",
  "Explore how QuantumHalon aligns with your governance timeline",
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
  "Transition planning",
  "Architecture review",
  "General inquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
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
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[600px] h-[600px] bg-[#0ea5e9] top-[-100px] right-[-200px] opacity-[0.04] hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <SectionLabel label="Get in Touch" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            See how QuantumHalon{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              protects your traffic.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            Book a technical demonstration with the QCertify team. We will walk
            through deployment architecture, crypto-agile transition, and how
            QuantumHalon fits your environment.
          </p>
        </motion.div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Reasons sidebar */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">
              Reasons to get in touch
            </h2>
            <div className="space-y-3">
              {reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 glass-panel rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-white/60" />
                <span className="text-white font-medium text-sm">
                  Prefer email?
                </span>
              </div>
              <a
                href="mailto:contact@qcertify.io"
                className="text-[#0ea5e9] hover:text-white transition-colors text-sm font-mono"
              >
                contact@qcertify.io
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel-heavy rounded-2xl p-12 text-center"
              >
                <CheckCircle className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Thank you.
                </h3>
                <p className="text-slate-400 text-base">
                  A member of our team will respond within one business day.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-panel rounded-2xl p-8 lg:p-10 space-y-6"
              >
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      First name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      Last name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors"
                      placeholder="Carter"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                  >
                    Work email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      Company *
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      Job title *
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors"
                      placeholder="CISO"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors appearance-none"
                    >
                      <option value="">Select industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                    >
                      Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors appearance-none"
                    >
                      <option value="">What are you most interested in?</option>
                      {interests.map((int) => (
                        <option key={int} value={int}>
                          {int}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-white uppercase tracking-widest mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/30 transition-colors resize-none"
                    placeholder="Tell us about your requirements or questions..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white glass-panel glass-interactive transition-all focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Request a Demo"}
                </button>
                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  Your information is handled with care. QCertify does not share
                  contact details with third parties. A member of our team will
                  respond within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
