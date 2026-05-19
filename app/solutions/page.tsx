"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { content } from '../translations';

interface ServiceProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: 'SaaS' | 'Enterprise' | 'Training';
  price: number;
  features: string[];
  icon: string;
  badgeColor: string;
}

const SolutionsPage = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const t = content[language];
  const router = useRouter();

  const offerings: ServiceProduct[] = [
    {
      id: "stockman-saas",
      name: "Project Stockman",
      tagline: "SaaS Inventory & Sale Engine",
      description: "A secure, multi-tenant ecosystem built with an offline-first architecture to manage sales, track Udhaar (credits), and generate GST-compliant billing seamlessly—even with unstable regional connectivity.",
      type: "SaaS",
      price: 999, // Monthly subscription model base
      badgeColor: "bg-purple-600 text-white",
      icon: "fa-solid fa-boxes-stacked",
      features: ["Offline-First Sync via IndexedDB", "Udhaar Ledger Tracking", "Automated GST Invoicing", "Multi-Tenant Code Protection"]
    },
    {
      id: "karyapal-flow",
      name: "KaryaPal (Lyss Flow)",
      tagline: "Manufacturing Process Tracker",
      description: "Real-time production pipeline monitoring system engineered for regional manufacturing units. Track raw materials, factory stages, and labor throughput inside an intuitive supervisor dashboard.",
      type: "Enterprise",
      price: 15000, // Enterprise license deployment baseline
      badgeColor: "bg-blue-600 text-white",
      icon: "fa-solid fa-timeline",
      features: ["Real-time Stage Optimization", "Raw Material Log Tracking", "Supervisor Audit Controls", "Secure Multi-User Access Management"]
    },
    {
      id: "atplc-automation",
      name: "ATPLC Robotics & IoT Masterclass",
      tagline: "Industrial Training Streams",
      description: "Advanced certification syllabus focused on embedded architectures, industrial robotics, and IoT sensor deployment. Includes comprehensive hands-on hardware development kits.",
      type: "Training",
      price: 4500, // Program flat fee
      badgeColor: "bg-amber-500 text-black",
      icon: "fa-solid fa-microchip",
      features: ["Hardware Prototyping Kits Included", "Industrial PLC Architecture Training", "Verified Practical Module Assessment", "Direct Internship Certification"]
    }
  ];

  // Route handling logic passing the chosen configuration to the checkout page
  const handlePurchaseNavigation = (item: ServiceProduct) => {
  // Save the complete configuration payload cleanly inside temporary session memory
  const secureCheckoutPayload = {
    itemId: item.id,
    itemName: item.name,
    itemPrice: item.price,
    itemType: item.type
  };
  
  sessionStorage.setItem('pendingCheckout', JSON.stringify(secureCheckoutPayload));

  // Route to the checkout path completely clean, with no trailing strings or hashes
  router.push('/checkout-page');
};

  return (
    <div className={`bg-slate-50 min-h-screen ${language === 'hi' ? 'font-hindi' : ''}`}>
      <Navbar t={t.nav} language={language} setLanguage={setLanguage} />

      {/* Hero Banner Section */}
      <section className="pt-32 pb-16 bg-slate-900 text-white text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Digital Ecosystem
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Scalable, mission-driven software ecosystems and industrial training engines engineered by LYSS Technology to empower regional enterprises.
          </p>
        </div>
      </section>

      {/* Interactive Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {offerings.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-purple-900/30"
            >
              {/* Header Context */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-100 group-hover:bg-purple-50 rounded-xl flex items-center justify-center text-slate-700 group-hover:text-purple-900 transition-colors text-xl">
                    <i className={product.icon}></i>
                  </div>
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded tracking-widest ${product.badgeColor}`}>
                    {product.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-900 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-purple-700 mb-4 tracking-wide uppercase">
                  {product.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 text-justify">
                  {product.description}
                </p>

                {/* Feature Bullet Checklist */}
                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Capabilities</p>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm">
                      <i className="fa-solid fa-circle-check text-emerald-500 text-xs flex-shrink-0"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Billing Container Footer */}
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Base Cost Baseline</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.type === 'SaaS' && <span className="text-xs text-slate-500">/mo</span>}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchaseNavigation(product)}
                  className="bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md group-hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <span>Deploy Now</span>
                  <i className="fa-solid fa-arrow-right text-[10px] opacity-70"></i>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
};

export default SolutionsPage;