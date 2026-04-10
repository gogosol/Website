"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2" aria-label="QCertify Logo">
            <ShieldCheck className="h-6 w-6 text-[#0ea5e9]" aria-hidden="true" />
            <span className="font-bold text-xl tracking-tight text-white">QCertify</span>
          </div>
          <nav className="hidden md:flex space-x-8" aria-label="Main Navigation">
            <Link href="#platform" className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded">Platform</Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded">Solutions</Link>
            <Link href="#trust" className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded">Trust & Security</Link>
            <Link href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded">Company</Link>
          </nav>
          <div className="hidden md:flex items-center">
            <Link href="#contact" className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-all border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]">
              Book a Demo
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#platform" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Platform</Link>
            <Link href="#solutions" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Solutions</Link>
            <Link href="#trust" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Trust</Link>
            <Link href="#contact" className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-[#0ea5e9] text-white">Book a Demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}
