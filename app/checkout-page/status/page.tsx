'use client'; // Required since search params are read in the browser

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

// 1. Isolate the component that reads URL query strings
function StatusCardContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('order');
  const amount = searchParams.get('amt');

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
      {status === 'success' && (
        <div>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you. Your transaction completed securely.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm text-gray-600 space-y-2">
            <div><strong>Order Reference ID:</strong> {orderId}</div>
            <div><strong>Settled Amount:</strong> ₹{amount}</div>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div>
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Declined</h1>
          <p className="text-gray-600 mb-6">The bank refused to complete the transaction authorization request.</p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">!</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Interrupted</h1>
          <p className="text-gray-600 mb-6">We are verifying the deposit ledger manually with the node server network.</p>
        </div>
      )}

      <Link href="/" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
        Return to Dashboard
      </Link>
    </div>
  );
}

// 2. Create a basic skeleton UI placeholder to show while loading parameters
function StatusCardSkeleton() {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
      <div className="h-12 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

// 3. Main Page wrapper providing the critical Suspense Boundary context
export default function PaymentStatusPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* 
        The Suspense boundary tells Next.js it can safely compile the outer layout shell 
        statically, while treating the inner parameters card as a dynamic client hook.
      */}
      <Suspense fallback={<StatusCardSkeleton />}>
        <StatusCardContent />
      </Suspense>
    </div>
  );
}