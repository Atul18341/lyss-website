'use react';
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('order');
  const amount = searchParams.get('amt');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">System Processing Loop Interrupted</h1>
            <p className="text-gray-600 mb-6">We are currently verifying the deposit ledger manually with the node server network.</p>
          </div>
        )}

        <Link href="/" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}