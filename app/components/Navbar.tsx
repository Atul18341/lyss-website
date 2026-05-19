"use client";
import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
const menuItems = [
  { name: "Home", href: "/" },
  { name: "Our Vision", href: "/about" },
  
  { name: "Core Team", href: "/core-team" },
  { name: "Contact", href: "/contact" },
];
// Define the shape of props for type safety
interface NavbarProps {
  t: any; // Translation object for 'nav'
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const Navbar: React.FC<NavbarProps> = ({ t, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState<boolean>(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-slate-800/50 ${isScrolled ? 'shadow-lg glass-nav' : 'glass-nav'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={(e) => scrollToSection(e, 'top')}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform rotate-3">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tight leading-none">LYSS</span>
              <span className="text-[10px] font-medium text-purple-800 tracking-widest uppercase leading-none">Technology</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
            href="/solutions" 
            className="hover:text-purple-700 transition-colors cursor-pointer"
          >
            {t.solutions} {/* Renders "Business Solutions" or "व्यावसायिक समाधान" */}
          </Link>

            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-slate-300 hover:text-white font-medium transition-colors">{t.projects}</a>
            <a href="#education" onClick={(e) => scrollToSection(e, 'education')} className="text-slate-300 hover:text-white font-medium transition-colors">{t.training}</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-slate-300 hover:text-white font-medium transition-colors">{t.about}</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="px-5 py-2.5 rounded-full bg-purple-900 text-white font-semibold hover:bg-purple-800 transition-all shadow-lg hover:shadow-purple-900/50 transform hover:-translate-y-0.5">
              {t.contact}
            </a>

            {/* Premium Language Switcher */}
            <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('hi')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${language === 'hi' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white p-2">
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <button onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)} className="w-full flex justify-between items-center px-3 py-3 text-slate-300 font-medium">
            {t.solutions}
            <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isMobileSolutionsOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {/* ... Mobile sub-links and language toggle logic */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;