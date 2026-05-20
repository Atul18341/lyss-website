"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script'; // Clean script loader element built into Next.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { content } from '../translations';

interface CheckoutItem {
  id: string;
  name: string;
  provider: 'LYSS_SOFTWARE' | 'LYSS_EVENT' | 'ATPLC_TRAINING';
  price: number;
  description: string;
  requiresGst: boolean;
}

const Checkout = () => {
  const [language] = useState<'en' | 'hi'>('en');
  const t = content[language];
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields State
  const [customer, setCustomer] = useState({ name: '', mobile: '', email: '' });

  // Baseline loader configuration setup state placeholder
  const [cartItem, setCartItem] = useState<CheckoutItem>({
    id: "atplc-auto-01",
    name: "Industrial Automation & IoT Masterclass",
    provider: "ATPLC_TRAINING",
    price: 4500,
    description: "Secure enterprise activation framework deployment configuration.",
    requiresGst: true,
  });

  // Safe Session Storage processing module on layout mount
  useEffect(() => {
    const storedData = sessionStorage.getItem('pendingCheckout');
    
    if (storedData) {
      try {
        const parsedItem = JSON.parse(storedData);
        
        setCartItem({
          id: parsedItem.itemId,
          name: parsedItem.itemName,
          price: Number(parsedItem.itemPrice),
          provider: parsedItem.itemType === 'SaaS' ? 'LYSS_SOFTWARE' : parsedItem.itemType === 'Training' ? 'ATPLC_TRAINING' : 'LYSS_EVENT',
          description: `Secure processing framework configuration setup for ${parsedItem.itemName}.`,
          requiresGst: parsedItem.itemId !== 'subsidized-stall' // Keeps regional micro-artisan rates tax-exempt if necessary
        });
        console.log("Cart-Item:"+cartItem)
        // Optional: clear item context post instantiation to manage history memory cleanups
        // sessionStorage.removeItem('pendingCheckout');
      } catch (error) {
        console.error("Failed to safely decode purchase transaction payload variables:", error);
      }
    }
  }, []);

  const totalAmount = cartItem.requiresGst ? cartItem.price * 1.18 : cartItem.price;

  // Function to mount and pull Paytm Checkout layer
  const openPaytmBlinkCheckout = (mid: string, orderId: string, txnToken: string) => {
  const config = {
    root: "",
    flow: "DEFAULT",
    data: {
      orderId: orderId,
      token: txnToken,
      tokenType: "TXN_TOKEN",
      amount: totalAmount.toFixed(2)
    },
    handler: {
      notifyMerchant: function (eventName: string, data: any) {
        console.log("Paytm Notification Event Received:", eventName, data);
      }
    }
  };

  // CRITICAL FIX: Wrap execution block inside Paytm's official onLoad listener callback
  if ((window as any).Paytm && (window as any).Paytm.CheckoutJS) {
    (window as any).Paytm.CheckoutJS.onLoad(function executeAfterCompleteLoad() {
      (window as any).Paytm.CheckoutJS.init(config)
        .then(() => {
          (window as any).Paytm.CheckoutJS.invoke();
          setLoading(false);
        })
        .catch((err: any) => {
          console.error("Paytm Internal Window Init failed:", err);
          setLoading(false);
        });
    });
  } else {
    alert("Paytm SDK script layer not loaded completely yet. Please wait a second.");
    setLoading(false);
  }
};

  const initiaitePaymentPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const targetOrderId = `LYSS_ORDER_${Date.now()}`;
    const targetCustId = `CUST_${customer.mobile || 'GUEST'}`;

    try {
      // 1. Call your server API route using the internal state reference ID securely
      const res = await fetch('/api/paytm/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: cartItem.id, // Secure verification pointer for backend verification map
          amount: totalAmount,
          orderId: targetOrderId,
          customerId: targetCustId,
          email: customer.email,
          mobile: customer.mobile
        })
      });

      const paymentData = await res.json();

      if (paymentData.txnToken) {
        // 2. Launch token configurations directly inside client UI framework
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
      {/* Load Paytm scripts dynamically securely over standard window layer */}
      <Script 
        type="text/javascript" 
        src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/UgSSdh19535390771074.js" 
        strategy="lazyOnload"
      />
      
      <Navbar t={t.nav} language={language} setLanguage={() => {}} />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column Form */}
          <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <form onSubmit={initiaitePaymentPipeline} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">1. Contact & Invoicing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Full Name</label>
                    <input 
                      type="text" required 
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Mobile Number</label>
                    <input 
                      type="tel" required 
                      value={customer.mobile}
                      onChange={(e) => setCustomer({...customer, mobile: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                    <input 
                      type="email" required 
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 flex items-center gap-3">
                <i className="fa-solid fa-wallet text-purple-900 text-lg"></i>
                <div className="text-xs text-purple-950 leading-tight">
                  Payments routing managed by <strong>Paytm Secured PG engine</strong>. Supports UPI App intents, Cards, and Net Banking infrastructure seamlessly.
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-900 hover:bg-purple-800 disabled:bg-purple-900/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <i className="fa-solid fa-lock-open text-xs opacity-70"></i>
                    <span>Proceed to Secure Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
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
};

export default Checkout;