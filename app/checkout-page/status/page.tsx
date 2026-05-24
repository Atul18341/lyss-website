'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { getFromIndexedDB } from '@/app/utils/indexedDb'; // 💡 Imported unified IndexedDB manager

function StatusCardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const status = searchParams.get('status');
  const txnId = searchParams.get('txnId');
  const orderId = searchParams.get('orderId'); // 💡 Extracted orderId parameter from URL context

  // Local state machines to track background sync states safely
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [syncErrorMessage, setSyncErrorMessage] = useState('');

  useEffect(() => {
    // We ONLY trigger the database synchronization if the payment was explicitly successful
    if (status !== 'success' || !orderId || !txnId) return;

    const executeBackendDataSync = async () => {
      setSyncStatus('PROCESSING');
      try {
        // 1. EXTRACT RAW OFFLINE UNCOMMITTED PROFILE FROM INDEXEDDB
        const offlineFormData = await getFromIndexedDB(orderId);

        if (!offlineFormData) {
          throw new Error('Registration form snapshot could not be found locally in this browser cache.');
        }

        // 2. CONSOLIDATE PAYLOAD WITH PAYTM BANK TRANSACTION ID METRICS
        const integratedPayload = {
          orderId: orderId,
          transactionId: txnId, // Paytm's bank tracking code mapped natively
          ...offlineFormData    // Spreads personal data, password choices, academic strings, etc.
        };

        // 3. FIRING SECURE PUSH TO BACKEND THROUGH THE NEXT.JS PROXY ROUTE
        const syncResponse = await fetch('/api/paytm/sync-postpaid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(integratedPayload),
        });

        const syncResult = await syncResponse.json();

        if (!syncResponse.ok) {
          throw new Error(syncResult.error || 'Django backend model rejected validation constraints.');
        }

        // Database commit succeeded! Update tracking metrics
        setSyncStatus('SUCCESS');

      } catch (error: any) {
        console.error('Data Sync Mechanism Exception:', error);
        setSyncStatus('FAILED');
        setSyncErrorMessage(error.message || 'System validation pipeline sync breakdown.');
      }
    };

    executeBackendDataSync();
  }, [status, orderId, txnId]);

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
      
      {/* SUCCESS BLOCK: Renders multi-tiered states for live background database synchronization */}
      {status === 'success' && (
        <div>
          {syncStatus === 'PROCESSING' && (
            <div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Syncing Profile...</h1>
              <p className="text-gray-600 mb-6 font-medium text-sm">Securing your training enrollment seat inside the Django ledger ecosystem...</p>
            </div>
          )}

          {syncStatus === 'FAILED' && (
            <div>
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">!</div>
              <h1 className="text-2xl font-bold text-yellow-700 mb-2">Payment Saved, Sync Interrupted</h1>
              <p className="text-gray-600 mb-4 text-sm">Your payment cleared, but your profile details failed to sync to our master records.</p>
              <div className="bg-red-50 text-red-700 rounded-lg p-3 text-xs mb-6 font-mono text-left">
                <strong>Error details:</strong> {syncErrorMessage}
              </div>
            </div>
          )}

          {(syncStatus === 'SUCCESS' || syncStatus === 'IDLE') && (
            <div>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">Thank you. Your transaction completed and profile account access is activated.</p>
            </div>
          )}

          {/* Persistent receipt card layout block data point */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm text-gray-600 space-y-2">
            <div><strong>Order ID:</strong> {orderId || 'N/A'}</div>
            <div><strong>Transaction ID:</strong> {txnId}</div>
            <div><strong>Sync Status:</strong> <span className={`font-bold ${syncStatus === 'SUCCESS' ? 'text-green-600' : syncStatus === 'FAILED' ? 'text-red-500' : 'text-blue-500'}`}>{syncStatus}</span></div>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div>
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Declined</h1>
          <p className="text-gray-600 mb-6">The bank refused to complete the transaction authorization request. Kindly try again or after sometime.</p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">!</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Interrupted</h1>
          <p className="text-gray-600 mb-6">Our team are verifying the deposit ledger manually with the Paytm and update you very soon.</p>
        </div>
      )}

      <Link href="/dashboard" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
        Return to Dashboard
      </Link>
    </div>
  );
}

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

export default function PaymentStatusPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<StatusCardSkeleton />}>
        <StatusCardContent />
      </Suspense>
    </div>
  );
}