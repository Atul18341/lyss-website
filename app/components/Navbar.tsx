"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js optimized Image component
import { usePathname } from 'next/navigation';

interface NavbarProps {
  t: {
    solutions: string;
    projects: string;
    contact: string;
  };
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ t, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isDarkHeroPage = pathname === '/' || pathname === '/mithila-sanwaad';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBackground = isScrolled 
    ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/5 py-4' 
    : 'bg-transparent py-6 border-b border-transparent';

  const textContrastColor = isScrolled || isDarkHeroPage
    ? 'text-white hover:text-purple-400'
    : 'text-slate-800 hover:text-purple-900';

  const brandLogoTextColor = isScrolled || isDarkHeroPage
    ? 'text-white'
    : 'text-slate-900';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${navbarBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Responsive Hybrid Branding Unit */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          
          {/* Logo Image Container - Scaled precisely to standard navbar bounds */}
          <div className="relative w-12 h-12 transition-transform duration-200 transform group-hover:scale-105">
            <Image
              src="/lyss.webp" // Place your logo file in the /public directory
              alt="LYSS Technology Logo"
              width={48}
              height={48}
              priority // Forces high-priority loading to completely eliminate layout flickering
              className="object-contain"
            />
          </div>
          
          {/* Responsive Text Visibility */}
          <span className={`font-bold text-xl tracking-tight transition-colors hidden sm:block ${brandLogoTextColor}`}>
            LYSS <span className="text-purple-600">Technology</span>
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link 
            href="/solutions" 
            className={`transition-colors cursor-pointer ${
              pathname === '/solutions' ? 'text-purple-600' : textContrastColor
            }`}
          >
            {t.solutions}
          </Link>

          <Link href="/#projects" className={`transition-colors ${textContrastColor}`}>
            {t.projects}
          </Link>
           {/*<Link href="https://atplc.in" className={`transition-colors ${textContrastColor}`}>
            {t.projects}
          </Link>*/}
          <Link 
            href="/#feedback" 
            className={`transition-colors ${textContrastColor}`}
          >
            Testimonials
          </Link>

          <Link href="/#contact" className={`transition-colors ${textContrastColor}`}>
            {t.contact}
          </Link>
        </div>

        {/* Language Selection */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className={`text-xs uppercase font-bold tracking-wider px-3 py-1.5 border rounded-lg transition-all ${
            isScrolled || isDarkHeroPage
              ? 'border-white/20 text-white hover:bg-white/10'
              : 'border-slate-200 text-slate-800 hover:bg-slate-100'
          }`}
        >
          {language === 'en' ? 'हिन्दी' : 'English'}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;