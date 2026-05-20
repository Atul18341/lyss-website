import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Minimal native signature validation mechanism to match initiation standards
function verifySignature(paramsString: string, key: string, checksum: string): boolean {
  const calculatedChecksum = crypto.createHmac('sha256', key).update(paramsString).digest('base64');
  return calculatedChecksum === checksum;
}

export async function POST(request: Request) {
  try {
    // 1. Extract the raw body text from the incoming Paytm POST request
    const formData = await request.formData();
    const responsePayload: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      responsePayload[key] = value.toString();
    });

    const receivedChecksum = responsePayload['CHECKSUMHASH'];
    if (!receivedChecksum) {
      return NextResponse.json({ error: "Malicious request: Missing checksum signature matrix" }, { status: 400 });
    }

    // 2. Isolate the core transaction body elements for validation
    const paytmParams: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== 'CHECKSUMHASH') {
        paytmParams[key] = value.toString();
      }
    });

    // Sort parameters alphabetically to construct the exact verification string pattern expected by Paytm
    const sortedKeys = Object.keys(paytmParams).sort();
    let verificationString = "";
    sortedKeys.forEach((key) => {
      verificationString += `${paytmParams[key]}|`;
    });
    // Append the merchant key to the tail end of the verification string matrix
    const merchantKey = process.env.PAYTM_MERCHANT_KEY || "YOUR_LIVE_PRODUCTION_SECRET_KEY_HERE";

    // 3. Verify that the request actually came from Paytm and wasn't tampered with
    const isAuthenticPaytmPayload = verifySignature(verificationString, merchantKey, receivedChecksum);

    if (!isAuthenticPaytmPayload) {
      return NextResponse.json({ error: "Security Alert: Invalid transaction signature handshake match" }, { status: 403 });
    }

    // 4. Extract critical status identifiers cleanly
    const orderId = responsePayload['ORDERID'];
    const transactionStatus = responsePayload['STATUS']; // 'TXN_SUCCESS' or 'TXN_FAILURE'
    const bankTxnId = responsePayload['BANKTXNID'];
    const totalPaid = responsePayload['TXNAMOUNT'];

    // 5. SECURE ROUTING DIRECTION LOGIC
    if (transactionStatus === 'TXN_SUCCESS') {
      
      /* 
         =========================================
         PLACE YOUR DATABASE PROVISIONING LOGIC HERE
         =========================================
         Example:
         await db.orders.update({
           where: { id: orderId },
           data: { status: 'PAID', gatewayRef: bankTxnId }
         });
      */

      // Redirect the client browser smoothly back to your frontend confirmation layout view
      return NextResponse.redirect(
        new URL(`/checkout/success?orderId=${orderId}&amount=${totalPaid}`, request.url),
        303
      );
    } else {
      // Redirect the client back to a clean breakdown page if the user cancels or the card declines
      return NextResponse.redirect(
        new URL(`/checkout/failed?orderId=${orderId}`, request.url),
        303
      );
    }

  } catch (error) {
    console.error("Critical failure during Paytm payment webhook parse phase:", error);
    return NextResponse.json({ error: "Internal processing engine loop dropped" }, { status: 500 });
  }
}