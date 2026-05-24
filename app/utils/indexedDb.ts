// 📁 src/app/utils/indexedDb.ts

const DB_NAME = 'LyssCheckoutDB';
const STORE_NAME = 'pending_registrations';
const DB_VERSION = 1;

export interface RegistrationSnapshot {
  orderId: string;
  timestamp: number;
  formData: any;
}

/**
 * PHASE 1: Saves the initial user registration details into the browser's 
 * offline transactional storage database before firing payment parameters.
 */
export function saveToIndexedDB(orderId: string, formData: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(); // Safeguard for Next.js SSR

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'orderId' });
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const snapshot: RegistrationSnapshot = {
        orderId,
        timestamp: Date.now(),
        formData
      };

      const putRequest = store.put(snapshot);

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
}

/**
 * PHASE 2 (MERGED STEP): Retrieves the cached uncommitted form data directly from 
 * the browser's storage instance during the callback status processing redirect loop.
 */
export function getFromIndexedDB(orderId: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(null); // Safeguard for Next.js SSR

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Ensure the upgradeneeded block handles cases where 'get' hits an uninitialized DB
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'orderId' });
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      const getRequest = store.get(orderId);

      getRequest.onsuccess = () => {
        // If an entry matches, pull the original customer data form block out of the snapshot container
        resolve(getRequest.result ? getRequest.result.formData : null);
      };
      
      getRequest.onerror = () => reject(getRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
}