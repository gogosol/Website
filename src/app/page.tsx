import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import PlatformCapabilities from '@/components/PlatformCapabilities';
import SecuritySection from '@/components/SecuritySection';
import OutcomesSection from '@/components/OutcomesSection';
import FAQSection from '@/components/FAQSection';
import { Shield, Clock, Layers, Activity, FileCheck, CheckCircle, Briefcase, Globe, Settings, Lock } from 'lucide-react';

function WhyNowSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="why-now">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white top-0 left-[-200px] opacity-[0.03]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Why preparation cannot wait
            </h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed flex-1">
              The trust gap is widening. Readiness compounds over time. Organizations need structured preparation before outside pressure forces rushed action.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-1">
              Cryptographic and trust transitions require governance maturity before crisis moments. Early preparation creates an operational advantage, not just protection.
            </p>
            <div className="flex items-center gap-4 text-white">
              <Clock className="w-6 h-6 opacity-80" />
              <span className="font-semibold tracking-wide uppercase text-sm text-glow opacity-90">Strategic Maturity Takes Time</span>
            </div>
          </div>
          <div className="md:w-1/2 w-full grid gap-4">
             <div className="p-6 glass-panel glass-interactive rounded-xl block transition-transform group">
                <div className="text-white text-xl font-medium mb-2 opacity-90 group-hover:text-[#0ea5e9] transition-colors">Cost of Late Assurance</div>
                <div className="text-slate-400">Rushed discovery leads to incomplete migrations and failed partner audits.</div>
             </div>
             <div className="p-6 glass-panel glass-interactive rounded-xl block border-l-[3px] border-l-[#0ea5e9]/50 ml-0 md:ml-8 transition-transform group hover:border-[#0ea5e9]">
                <div className="text-white text-xl font-medium mb-2 opacity-90 group-hover:text-[#0ea5e9] transition-colors">Rising Procurement Standards</div>
                <div className="text-slate-400">Enterprise buyers increasingly demand certifiable proof of post-quantum readiness.</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const features = [
    { name: "Readiness Assessments", desc: "Structured surveys defining current posture.", icon: Activity },
    { name: "Control Mapping", desc: "Align implementations with compliance requirements.", icon: Layers },
    { name: "Evidence Management", desc: "Centralized system of record for technical proof.", icon: FileCheck },
    { name: "Assurance Workflows", desc: "Automated routing for reviews and approvals.", icon: CheckCircle }
  ];

  return (
    <section className="py-24 bg-transparent relative border-t border-white/5" id="platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            From scattered artifacts to structured proof
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            QCertify gives teams a system of record for readiness, evidence, and assurance. Replace fragmented preparation with a defensible operating model that aligns seamlessly with modern requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((F, i) => (
            <div key={i} className="p-6 rounded-2xl glass-panel glass-interactive group">
              <F.icon className="w-8 h-8 text-white/70 mb-4 group-hover:scale-110 group-hover:text-[#0ea5e9] transition-all duration-300" />
              <h3 className="text-lg font-medium text-white mb-2">{F.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{F.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { n: "01", title: "Assess current state" },
    { n: "02", title: "Map controls & requirements" },
    { n: "03", title: "Collect evidence & coordinate workflows" },
    { n: "04", title: "Produce defensible trust outputs" }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">A repeatable path to defensible trust.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < 3 && <div className="hidden md:block absolute top-6 flex-1 w-full left-1/2 border-t border-white/20 border-dashed z-0"></div>}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white font-mono font-bold mb-6">
                {s.n}
              </div>
              <h3 className="text-white font-medium text-lg">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  return (
    <section className="py-20 border-y border-white/5 bg-transparent text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-10">Built for organizations where trust must be operationalized</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-mono text-xl font-bold tracking-tight text-white flex items-center gap-2"><Globe/> Global Bank Placeholder</div>
          <div className="font-mono text-xl font-bold tracking-tight text-white flex items-center gap-2"><Briefcase/>  Fortune 100 Enterprise</div>
          <div className="font-mono text-xl font-bold tracking-tight text-white flex items-center gap-2"><Shield/>  Public Sector Research Lab</div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="py-24 bg-transparent" id="solutions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Designed for high-stakes environments
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          Whether preparing for cryptographic transitions or demonstrating control maturity to external regulators, QCertify is built to handle the rigor required for:
        </p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {['Financial Services', 'Government & Public Sector', 'Critical Infrastructure', 'Advanced Manufacturing', 'Defense-adjacent Organizations', 'Research Institutions'].map(item => (
            <li key={item} className="flex items-center text-slate-300 p-4 glass-panel glass-interactive rounded-xl group">
              <CheckCircle className="w-5 h-5 text-[#0ea5e9] mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="py-24 bg-transparent border-y border-white/5 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteTestimonial />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">
          Turn assurance into an operating capability.
        </h2>
        <p className="text-xl text-slate-400 mb-10">For teams building long-horizon trust in high-stakes environments.</p>
        <button className="glass-panel glass-interactive text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center mx-auto gap-2">
          Request a Trust Briefing
        </button>
      </div>
    </section>
  );
}

function QuoteTestimonial() {
  return (
    <div className="flex flex-col items-center">
      <Settings className="w-10 h-10 text-white/30 mb-8" />
      <blockquote className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed mb-8">
        "QCertify helped us frame readiness as an operational program instead of a collection of disconnected documents. The platform created visibility across technical, compliance, and leadership stakeholders."
      </blockquote>
      <cite className="text-sm uppercase tracking-widest text-slate-500 font-semibold not-italic flex items-center gap-3">
        <span className="w-6 h-[1px] bg-slate-500 inline-block"/> Security Leader, Global Enterprise [Placeholder] <span className="w-6 h-[1px] bg-slate-500 inline-block"/>
      </cite>
    </div>
  );
}

function Footer() {
  return (
    <footer className="glass-panel border-t border-white/5 py-12 relative z-10 rounded-t-3xl mt-12 mx-4 sm:mx-6 lg:mx-8 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <Image src="/SF_White_Logo_Web.png" alt="QCertify Logo" width={140} height={32} className="opacity-80 object-contain h-8 w-auto" />
        </div>
        <div className="text-slate-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} QCertify. All Rights Reserved.
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Trust</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-white/30">
      <Header />
      <HeroSection />
      <ProblemSection />
      <WhyNowSection />
      <SolutionSection />
      <PlatformCapabilities />
      <HowItWorksSection />
      <TrustedBySection />
      <UseCasesSection />
      <SecuritySection />
      <OutcomesSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
