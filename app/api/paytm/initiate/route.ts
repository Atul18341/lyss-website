import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Minimal native implementation of Paytm Checksum generation to eliminate extra npm weight
function generateSignature(params: string, key: string): string {
  return crypto.createHmac('sha256', key).update(params).digest('base64');
}

export async function POST(request: Request) {
  try {
    const { amount, orderId, customerId, email, mobile } = await request.json();
    const paytmParams:any = {
  body: {
    requestType: "Payment",
    mid: process.env.NEXT_PUBLIC_PAYTM_MID || "UgSSdh19535390771074",
    websiteName: process.env.NEXT_PUBLIC_PAYTM_WEBSITE || "WEBSTAGING",
    orderId: orderId.replace(/[^a-zA-Z0-9_-]/g, ''), // Strip special characters/spaces
    callbackUrl: "[https://lyss.in/api/paytm/callback](https://lyss.in/api/paytm/callback)", // Must be a clean public HTTPS domain
    txnAmount: {
      value: Number(amount).toFixed(2), // MUST compile strictly into a string formatted like "215.00"
      currency: "INR",
    },
    userInfo: {
      custId: customerId.replace(/[^a-zA-Z0-9_.-]/g, ''), // Clean alphanumeric customer tracking string
      email: email || undefined, // Drop entirely if empty string
      mobile: mobile || undefined, // Drop entirely if empty string
    },
  },
};

    const merchantKey = "kAnqJv&pup21jBo@";
    
    // Generate signature payload
    const paramsString = JSON.stringify(paytmParams.body);
    const signature = crypto.createHmac('sha256', merchantKey).update(paramsString).digest('base64');
    
    paytmParams.head = { signature: signature };

    // Point to staging environment for development context, change to secure.paytm.in for production
    const paytmUrl = `  https://securestage.paytmpayments.com/theia/api/v1/initiateTransaction?mid={mid}&orderId={orderId}`;

    const response = await fetch(paytmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paytmParams),
    });

    const result = await response.json();
    //Error resolution
    console.log("=== PAYTM RAW RESPONSE BODY ===");
console.log(JSON.stringify(result, null, 2));
console.log("===============================");
    if (!result.body || !result.body.txnToken) {
  return NextResponse.json({ 
    error: `Paytm Rejected: ${result.body?.resultInfo?.resultMsg || "Unknown Rejection"}`,
    rawResult: result 
  }, { status: 400 });
}
  } catch (error) {
    return NextResponse.json({ error: "Failed to build transaction parameters" }, { status: 500 });
  }
}