"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center" aria-label="QCertify Logo">
            <Image src="/SF_White_Logo_Web.png" alt="QCertify Logo" width={160} height={40} className="object-contain h-10 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8" aria-label="Main Navigation">
             <Link href="#platform" className="text-sm font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">Platform</Link>
             <Link href="#solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">Solutions</Link>
             <Link href="#trust" className="text-sm font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">Trust & Security</Link>
             <Link href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">Company</Link>
          </nav>
          <div className="hidden md:flex items-center">
            <Link href="#contact" className="relative group text-sm font-bold text-white glass-panel glass-interactive px-6 py-2.5 rounded-full overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]">
              <span className="relative z-10 tracking-wide">Book a Demo</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
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
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#platform" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Platform</Link>
            <Link href="#solutions" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Solutions</Link>
            <Link href="#trust" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-[#0ea5e9]/10">Trust</Link>
            <Link href="#contact" className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium glass-panel glass-interactive text-white">Book a Demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}
