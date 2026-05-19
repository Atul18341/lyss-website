"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { content } from '../translations';

const RefundPolicy = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const t = content[language];

  return (
    <div className={`bg-white min-h-screen ${language === 'hi' ? 'font-hindi' : ''}`}>
      <Navbar t={t.nav} language={language} setLanguage={setLanguage} />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-12 border-b border-slate-100 pb-10 text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Cancellation & Refund Policy</h1>
            <p className="text-slate-500 text-sm">
              Last Updated & Effective: <span className="font-medium text-slate-700">May 19, 2026</span>
            </p>
          </div>

          {/* Policy Body - Justified Alignment for a Premium Corporate Look */}
          <div className="space-y-10 text-slate-700 leading-relaxed text-justify">
            
            <section>
              <p>
                This Cancellation and Refund Policy ("Policy") establishes the terms, conditions, and structure under which <strong>LYSS TECHNOLOGY PRIVATE LIMITED</strong> ("Company", "we", "us", "our") processes order cancellations and transaction refunds for products, licenses, software allocations, or educational streams purchased through our portal <a href="https://lyss.in" className="text-purple-700 font-medium hover:underline">https://lyss.in</a> (collectively referred to as the "Platform"). 
              </p>
            </section>

            {/* Section 1: SaaS Solutions */}
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">1. Software-as-a-Service (SaaS) & Cloud Deployments</h2>
              <p className="mb-3">
                Our flagship software applications, including but not limited to <strong>Project Stockman</strong> (Inventory and Sale Management Ecosystem) and <strong>KaryaPal / Lyss Flow</strong>, operate on a subscription-based model.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Monthly/Annual Subscriptions:</strong> Subscriptions are billed in advance. You may cancel your subscription lock at any time; however, no refunds will be issued for remaining or unused fractions of an active billing cycle.</li>
                <li><strong>Trial Periods:</strong> Where applicable, free trial tiers are provided to evaluate the software architecture before making monetary commitments. Conversion following a trial period is definitive and non-refundable.</li>
                <li><strong>Data Retention Post-Cancellation:</strong> Upon account closure request, your business metrics and ledger logs will remain accessible in read-only form for 30 days, after which they are permanently pruned from our cloud servers.</li>
              </ul>
            </section>

            {/* Section 2: ATPLC Training Modules */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">2. ATPLC Training and Workshop Formats</h2>
              <p>
                For engineering programs, robotics tracks, industrial automation, and professional student internships managed under the **ATPLC** training umbrella, the allocation of seats and specific hardware kits requires stringent logistical preparation:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                <li><strong>Cancellation Requests:</strong> Students or academic institutional representatives can request program withdrawal up to <strong>7 calendar days before</strong> the designated course initialization date to receive a full refund.</li>
                <li><strong>Late Withdrawal:</strong> Cancellations made within less than 7 days of the session initialization are subject to a processing charge equivalent to 20% of the aggregate training component fee.</li>
                <li><strong>Post-Commencement:</strong> No refunds, partial or total, will be approved once the training syllabus has commenced or physical component kits have been unboxed and assigned to the participant.</li>
              </ul>
            </section>

            {/* Section 3: Custom Technical Solutions */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">3. Enterprise IT & Custom Software Engineering Contracts</h2>
              <p>
                B2B custom engineering projects, tailored API pipelines, and specialized local setups follow milestones detailed within their specific project-level Service Level Agreements (SLAs). Advance mobilization retainers paid to map software architectures are non-refundable once engineering sprints have commenced. Subsequent milestone completions are cleared through client sign-off records and are non-refundable.
              </p>
            </section>

            {/* Section 4: Event Stalls */}
            {/*<section>
              <h2 className="text-xl font-bold text-slate-900 mb-3 text-left">4. Event Infrastructure and Stall Allocations</h2>
              <p>
                Stall spaces assigned for public exhibitions or regional culture platforms (such as the <strong>Mithila Sanwaad Karyakram</strong> at the Watson High School Field) are heavily subsidized for local micro-vendors and traditional artisans (e.g., our customized ₹215 rate tiers). Due to layout limits and upfront field setup overhead, stall allocations are **strictly non-refundable and non-transferable** once processed.
              </p>
            </section>*/}

            {/* Section 5: Processing Mechanics */}
            <section className="bg-purple-50/40 p-6 rounded-xl border border-purple-100">
              <h2 className="text-xl font-bold text-purple-950 mb-3 text-left">5. Remittance Timelines & Processing Mechanics</h2>
              <p className="text-sm text-purple-950">
                Approved cancellation refunds are routed securely back to the client's original online funding channel (UPI Virtual Address, Netbanking Account, or credit/debit transaction origin matrix). In strict alignment with domestic payment ecosystem mandates, please allow **7 to 10 working days** for the credit to appear in your banking statement after formal confirmation from our finance ledger.
              </p>
            </section>

            {/* Compliance Matrix Card */}
            <section className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-left shadow-sm">
              <h2 className="text-lg font-bold text-purple-900 mb-6 uppercase tracking-wider">Dispute Resolution & Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Corporate Registration File</p>
                  <p className="text-slate-900 font-semibold text-base mb-4">LYSS Technology Private Limited</p>
                  
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Reviewing Director</p>
                  <p className="text-slate-900 mb-4 font-medium">Mr. Atul Kumar</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-[10px] font-bold mb-1">Contact for Grievances</p>
                  <p className="text-slate-900 font-semibold text-base">admin@lyss.in</p>
                  <p className="text-xs text-slate-500 mt-1">Please insert your unique Order Reference ID (e.g., LYSS_ORDER_XXXX) within the subject line of your message.</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 italic">
                Registered Office: 3/365, Aryan Bhawan, Lakho Binda Campus, Santunagar, Madhubani (Bihar) - 847211.
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
};

export default RefundPolicy;