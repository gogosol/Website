import React from 'react';
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
    <section className="py-24 bg-[#0A0E17]/50 relative" id="why-now">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Why preparation cannot wait
            </h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              The trust gap is widening. Readiness compounds over time. Organizations need structured preparation before outside pressure forces rushed action.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Cryptographic and trust transitions require governance maturity before crisis moments. Early preparation creates an operational advantage, not just protection.
            </p>
            <div className="flex items-center gap-4 text-[#0ea5e9]">
              <Clock className="w-6 h-6" />
              <span className="font-semibold tracking-wide uppercase text-sm">Strategic Maturity Takes Time</span>
            </div>
          </div>
          <div className="md:w-1/2 w-full grid gap-4">
             <div className="p-6 border border-white/5 bg-white/5 rounded-xl block backdrop-blur-sm">
                <div className="text-white text-xl font-medium mb-2">Cost of Late Assurance</div>
                <div className="text-slate-400">Rushed discovery leads to incomplete migrations and failed partner audits.</div>
             </div>
             <div className="p-6 border border-[#0ea5e9]/30 bg-[#0ea5e9]/5 rounded-xl block backdrop-blur-sm ml-0 md:ml-8">
                <div className="text-white text-xl font-medium mb-2">Rising Procurement Standards</div>
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
    <section className="py-24 bg-[#020617] relative border-t border-white/5" id="platform">
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
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-[#0B0F19] hover:bg-white/5 transition-colors group">
              <F.icon className="w-8 h-8 text-[#8b5cf6] mb-4 group-hover:scale-110 transition-transform" />
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
    <section className="py-24 bg-[#0A0E17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">A repeatable path to defensible trust.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < 3 && <div className="hidden md:block absolute top-6 flex-1 w-full left-1/2 border-t border-slate-700/50 border-dashed z-0"></div>}
              <div className="relative z-10 w-12 h-12 rounded-full bg-[#1E293B] border-2 border-slate-700 flex items-center justify-center text-white font-mono font-bold mb-6">
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
    <section className="py-20 border-y border-white/5 bg-[#020617] text-center">
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
    <section className="py-24 bg-[#0A0E17]" id="solutions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Designed for high-stakes environments
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          Whether preparing for cryptographic transitions or demonstrating control maturity to external regulators, QCertify is built to handle the rigor required for:
        </p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {['Financial Services', 'Government & Public Sector', 'Critical Infrastructure', 'Advanced Manufacturing', 'Defense-adjacent Organizations', 'Research Institutions'].map(item => (
            <li key={item} className="flex items-center text-slate-300 p-4 border border-white/5 bg-[#0B0F19] rounded-xl hover:bg-white/5 transition-colors">
              <CheckCircle className="w-5 h-5 text-[#0ea5e9] mr-3 flex-shrink-0" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="py-24 bg-[#020617] border-y border-white/5 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteTestimonial />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#0A0E17] to-[#020617] border-t border-white/5 relative overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">
          Turn assurance into an operating capability.
        </h2>
        <p className="text-xl text-slate-400 mb-10">For teams building long-horizon trust in high-stakes environments.</p>
        <button className="bg-white text-[#020617] hover:bg-slate-200 transition-colors px-8 py-4 rounded-md font-semibold text-lg flex items-center justify-center mx-auto gap-2">
          Request a Trust Briefing
        </button>
      </div>
    </section>
  );
}

function QuoteTestimonial() {
  return (
    <div className="flex flex-col items-center">
      <Settings className="w-10 h-10 text-slate-700 mb-8" />
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
    <footer className="bg-[#020617] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-600" />
          <span className="text-slate-400 font-semibold tracking-wide">QCERTIFY</span>
        </div>
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} QCertify. All Rights Reserved.
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-slate-400 hover:text-white">Privacy Policy [Placeholder]</a>
          <a href="#" className="text-slate-400 hover:text-white">Terms of Trust [Placeholder]</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-[#0ea5e9]/30">
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
