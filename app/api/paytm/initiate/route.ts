import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Minimal native implementation of Paytm Checksum generation to eliminate extra npm weight
function generateSignature(params: string, key: string): string {
  return crypto.createHmac('sha256', key).update(params).digest('base64');
}

export async function POST(request: Request) {
  try {
    const { amount, orderId, customerId, email, mobile } = await request.json();

    const paytmParams: any = {
      body: {
        requestType: "Payment",
        mid: process.env.NEXT_PUBLIC_PAYTM_MID || "UgSSdh19535390771074",
        websiteName: process.env.NEXT_PUBLIC_PAYTM_WEBSITE || "WEBSTAGING",
        orderId: orderId,
        callbackUrl: `https://${request.headers.get('host')}/api/paytm/callback`,
        txnAmount: {
          value: amount.toFixed(2),
          currency: "INR",
        },
        userInfo: {
          custId: customerId,
          email: email,
          mobile: mobile,
        },
      },
    };

    const merchantKey = process.env.PAYTM_MERCHANT_KEY || "kAnqJv&pup21jBo@";
    
    // Generate signature payload
    const paramsString = JSON.stringify(paytmParams.body);
    const signature = generateSignature(paramsString, merchantKey);
    paytmParams.head = { signature: signature };

    // Point to staging environment for development context, change to secure.paytm.in for production
    const paytmUrl = `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${paytmParams.body.mid}&orderId=${orderId}`;

    const response = await fetch(paytmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paytmParams),
    });

    const result = await response.json();
    console.log("PAYTM RAW RESPONSE ARCHIVE:", result);
    
    return NextResponse.json({
      txnToken: result.body?.txnToken,
      orderId: orderId,
      mid: paytmParams.body.mid
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to build transaction parameters" }, { status: 500 });
  }
}