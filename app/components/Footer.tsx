"use client";
import React from 'react';
import Link from 'next/link';
// Import the Translation interface to use for props typing
import { Translation } from '../translations';
// Define props to expect the full translation object (or specific parts)
interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Bio */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-900 rounded flex items-center justify-center">
                <i className="fa-solid fa-layer-group text-sm"></i>
              </div>
              <span className="font-bold text-xl uppercase tracking-tight">LYSS</span>
            </div>
            <p className="text-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-purple-300 transition-colors">{t.nav.solutions}</a></li>
              <li><a href="#education" className="hover:text-purple-300 transition-colors">{t.nav.training}</a></li>
              <li><a href="#about" className="hover:text-purple-300 transition-colors">{t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-purple-300 transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Training Academy Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.training}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-purple-300 transition-colors">{t.education.school1}</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">{t.education.college1}</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">{t.education.college2}</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">{t.education.college3}</a></li>
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.connect}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <i className="fa-brands fa-whatsapp text-green-500"></i> +91 91224 61780 
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <i className="fa-regular fa-envelope text-purple-500"></i> support@lyss.in
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024-{new Date().getFullYear()} LYSS Technology Pvt Ltd. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="/checkout-page" className="hover:text-white transition-colors">Checkout</Link>
            <Link href="/privacy-page" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-page" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund-page" className="hover:text-white transition-colors text-purple-400 font-medium">Cancellation & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;