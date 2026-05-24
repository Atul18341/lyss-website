"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Script from 'next/script'; 
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { content } from '../../../translations';

interface CheckoutItem {
  id: string;
  name: string;
  provider: string;
  price: number;
  description: string;
  requiresGst: boolean;
}

export default function Checkout() {
  const params = useParams();
  const [language] = useState<'en' | 'hi'>('en');
  const t = content[language];
  const [loading, setLoading] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1); // Manages step-by-step layout wizard

  // Extended State Schema matching all target parameters
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    mobile: '',
    whatsapp: '',
    university: '',
    college: '',
    course: '',
    department: '',
    universityRegNo: '',
    password: ''
  });

  const [cartItem, setCartItem] = useState<CheckoutItem>({
    id: "atplc-auto-01",
    name: "Industrial Automation & IoT Masterclass",
    provider: "ATPLC_TRAINING",
    price: 4500,
    description: "Secure enterprise activation framework deployment configuration.",
    requiresGst: true,
  });

  useEffect(() => {
    async function fetchCourse() {
      try {
        if (params.provider !== "atplc") return;
        const response = await fetch(`/api/course/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        
        const data = await response.json();
        const course = data.course;

        setCartItem({
          id: String(course.id),
          name: course.Course_Name,
          provider: "ATPLC",
          price: Number(course.Course_Price),
          description: course.Course_Description || "Summer Internship Program",
          requiresGst: true,
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchCourse();
  }, [params.provider, params.id]);

  const totalAmount = cartItem.requiresGst ? cartItem.price * 1.18 : cartItem.price;

  const openPaytmBlinkCheckout = (mid: string, orderId: string, txnToken: string) => {
    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: totalAmount.toFixed(2),
      },
      handler: {
        notifyMerchant: function (eventName: string, data: any) {
          console.log("Paytm Event:", eventName, data);
        },
      },
    };

    if (typeof window !== "undefined" && (window as any).Paytm?.CheckoutJS) {
      (window as any).Paytm.CheckoutJS.init(config)
        .then(() => (window as any).Paytm.CheckoutJS.invoke())
        .catch((error: any) => {
          console.error("Paytm Init Error:", error);
          alert("Unable to initialize payment gateway.");
        })
        .finally(() => setLoading(false));
    } else {
      alert("Payment SDK not loaded.");
      setLoading(false);
    }
  };

  const initiaitePaymentPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(formStep + 1);
      return;
    }
    
    setLoading(true);
    const targetOrderId = `LYSS_ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const targetCustId = `CUST_${customer.mobile || 'GUEST'}`;

    try {
      const res = await fetch('/api/paytm/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: cartItem.id,
          amount: totalAmount,
          orderId: targetOrderId,
          customerId: targetCustId,
          ...customer // Pipes all fresh form entries down to your API backend handler seamlessly
        })
      });

      const paymentData = await res.json();
      if (paymentData.txnToken) {
        openPaytmBlinkCheckout(paymentData.mid, paymentData.orderId, paymentData.txnToken);
      } else {
        throw new Error("Missing response token context");
      }
    } catch (error) {
      console.error("Frontend Fetch Exception:", error);
      alert("Network connection drop. Verify server console terminal logs.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Script
        id="paytm-checkout-js"
        strategy="afterInteractive"
        src="https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/imHHwX41542058372914.js"
      />
      
      <Navbar t={t.nav} language={language} setLanguage={() => {}} />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column Dynamic Multi-Step Form */}
          <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            
            {/* Step Indicators Grid */}
            <div className="grid grid-cols-3 gap-2 mb-8 text-center text-xs font-bold tracking-wider uppercase">
              <div className={`pb-2 border-b-2 ${formStep >= 1 ? 'border-purple-900 text-purple-900' : 'border-slate-200 text-slate-400'}`}>1. Personal</div>
              <div className={`pb-2 border-b-2 ${formStep >= 2 ? 'border-purple-900 text-purple-900' : 'border-slate-200 text-slate-400'}`}>2. Academic</div>
              <div className={`pb-2 border-b-2 ${formStep >= 3 ? 'border-purple-900 text-purple-900' : 'border-slate-200 text-slate-400'}`}>3. Security</div>
            </div>

            <form onSubmit={initiaitePaymentPipeline} className="space-y-6">
              
              {/* STEP 1: PERSONAL DETAILS SECTION */}
              {formStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Personal Details</h3>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Full Name (As per academic records)</label>
                    <input 
                      type="text" required value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Contact No.</label>
                      <input 
                        type="tel" required value={customer.mobile}
                        onChange={(e) => setCustomer({...customer, mobile: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">WhatsApp Contact No.</label>
                      <input 
                        type="tel" required value={customer.whatsapp}
                        onChange={(e) => setCustomer({...customer, whatsapp: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                    <input 
                      type="email" required value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition" 
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: ACADEMIC DETAILS SECTION */}
              {formStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Academic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">University</label>
                      <select 
                        required value={customer.university}
                        onChange={(e) => setCustomer({...customer, university: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition appearance-none"
                      >
                        <option value="">Select University</option>
                        <option value="LNMU">Lalit Narayan Mithila University (LNMU)</option>
                        <option value="AKU">Aryabhatta Knowledge University (AKU)</option>
                        <option value="OTHER">Other Board / University</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">College</label>
                      <select 
                        required value={customer.college}
                        onChange={(e) => setCustomer({...customer, college: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition appearance-none"
                      >
                        <option value="">Select College</option>
                        <option value="WATSON">Watson High School Field Camp</option>
                        <option value="RK_COLLEGE">R.K. College Madhubani</option>
                        <option value="JN_COLLEGE">J.N. College Madhubani</option>
                        <option value="OTHER">Other Linked Institute</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Course</label>
                      <select 
                        required value={customer.course}
                        onChange={(e) => setCustomer({...customer, course: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition appearance-none"
                      >
                        <option value="">Select Course</option>
                        <option value="BTECH">B.Tech (Bachelor of Technology)</option>
                        <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                        <option value="MCA">MCA (Master of Computer Applications)</option>
                        <option value="BSC">B.Sc (Bachelor of Science)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Department</label>
                      <select 
                        required value={customer.department}
                        onChange={(e) => setCustomer({...customer, department: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition appearance-none"
                      >
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="MECH">Mechanical Engineering</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">University Registration No.</label>
                    <input 
                      type="text" required value={customer.universityRegNo}
                      onChange={(e) => setCustomer({...customer, universityRegNo: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition" 
                      placeholder="e.g., 211051100XX"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: ACCOUNT CONFIGURATION PASSWORD SECTION */}
              {formStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Account Security</h3>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Create Portal Password</label>
                    <input 
                      type="password" required value={customer.password}
                      onChange={(e) => setCustomer({...customer, password: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-purple-900 transition"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <p className="text-[11px] text-slate-400 mt-1">This password will secure your login credentials for your internship tracking portal.</p>
                  </div>
                  <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 flex items-center gap-3">
                    <i className="fa-solid fa-wallet text-purple-900 text-lg"></i>
                    <div className="text-xs text-purple-950 leading-tight">
                      Payments routing managed by <strong>Paytm Secured PG engine</strong>. Supports UPI App intents, Cards, and Net Banking infrastructure seamlessly.
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Control Action Triggers */}
              <div className="flex gap-4 pt-4">
                {formStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormStep(formStep - 1)}
                    className="w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-purple-900 hover:bg-purple-800 disabled:bg-purple-900/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-base ${formStep > 1 ? 'w-2/3' : 'w-full'}`}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : formStep < 3 ? (
                    <span>Continue to Next Step</span>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock-open text-xs opacity-70"></i>
                      <span>Proceed to Secure Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column Layout Panel Summary */}
          <div className="w-full lg:w-2/5 bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
            <span className="text-[10px] uppercase font-bold bg-amber-500 text-black px-2 py-0.5 rounded">
              {cartItem.provider.replace('_', ' ')}
            </span>
            <h2 className="text-xl font-bold mt-4 mb-2">{cartItem.name}</h2>
            <p className="text-xs text-slate-400 mb-6">{cartItem.description}</p>
            
            <div className="space-y-3 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between opacity-80">
                <span>Base Cost Fee</span>
                <span>₹{cartItem.price.toLocaleString('en-IN')}.00</span>
              </div>
              {cartItem.requiresGst && (
                <div className="flex justify-between opacity-80 text-xs text-slate-400">
                  <span>Integrated Tax (GST 18%)</span>
                  <span>₹{(cartItem.price * 0.18).toLocaleString('en-IN')}.00</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base text-purple-400 pt-2 border-t border-white/5">
                <span>Payable Amount</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}