"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { content } from '../translations';

const PrivacyPolicy = () => {
  const [language, setLanguage] = React.useState<'en' | 'hi'>('en');
  const t = content[language];

  return (
    <div className={` min-h-screen ${language === 'hi' ? 'font-hindi' : ''}`}>
      <Navbar t={t.nav} language={language} setLanguage={setLanguage} />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-12 border-b border-slate-100 pb-10 text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 text-sm">
              Effective Date: <span className="font-medium text-slate-700">August 20, 2026</span>
            </p>
          </div>

          {/* Policy Body - Using text-justify for professional look */}
          <div className="space-y-10 text-slate-700 leading-relaxed text-justify">
            
            <section>
              <p>
                This Privacy Policy describes how <strong>LYSS TECHNOLOGY PRIVATE LIMITED</strong> and its affiliates (collectively "LYSS TECHNOLOGY PRIVATE LIMITED, we, our, us") collect, use, share, protect or otherwise process your information/personal data through our website <a href="https://lyss.in" className="text-purple-700 font-medium hover:underline">https://lyss.in</a> (hereinafter referred to as "Platform"). By visiting this Platform, providing your information, or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">1. Collection of Information</h2>
              <p>
                We collect your personal data when you use our Platform, services, or otherwise interact with us during the course of our relationship. This includes personal information provided during sign-up such as name, date of birth, address, telephone/mobile number, email ID, and proof of identity. Sensitive personal data, such as bank account details or biometric information, may be collected with your consent to enable specific features on the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">2. Usage of Personal Data</h2>
              <p>
                We use personal data to provide the services you request, assist business partners in fulfilling orders, and enhance customer experience. We also use this data to troubleshoot problems, protect against fraud, and conduct marketing research. You have the option to opt-out of marketing communications at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">3. Sharing and Disclosure</h2>
              <p>
                We may share information internally within our group entities and affiliates. We may also disclose data to third-party service providers, logistics partners, and government agencies when required by law or to protect the rights and safety of our users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">4. Security Precautions</h2>
              <p>
                We adopt reasonable security practices and procedures to protect your data from unauthorized access. While we strive to protect your information through secure servers, the transmission of data over the internet involves inherent risks, and users are responsible for protecting their login credentials.
              </p>
            </section>

            {/* Grievance Officer Box - Styled as a Professional Card */}
            <section className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-left shadow-sm">
              <h2 className="text-lg font-bold text-purple-900 mb-6 uppercase tracking-wider">Grievance Redressal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Grievance Officer</p>
                  <p className="text-slate-900 font-semibold text-base mb-4">Mr. Atul Kumar</p>
                  
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Designation</p>
                  <p className="text-slate-900 mb-4 font-medium">CEO</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Contact Details</p>
                  <p className="text-slate-900 font-medium">+91-6205695667</p>
                  <p className="text-purple-700 font-medium mt-2">support@lyss.in</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Registered Address</p>
                <p className="text-slate-700 italic">
                  3/365, Aryan Bhawan, Lakho Binda Campus, Santunagar, Madhubani (Bihar)-847211
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
};

export default PrivacyPolicy;