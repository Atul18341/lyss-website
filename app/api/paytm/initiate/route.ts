// 📁 src/app/api/paytm/initiate/route.ts
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { amount, orderId, mobile } = data;

    const activeMid = process.env.PAYTM_MID!.trim();
    const merchantKey = process.env.PAYTM_MERCHANT_KEY!.trim();
    const customerId = `CUST_${mobile || 'GUEST'}`;

    const paytmParams: any = {
      body: {
        requestType: "Payment",
        mid: activeMid,
        websiteName: "WEBSTAGING",
        orderId: orderId.trim(),
        callbackUrl: "https://lyss.in/api/paytm/callback", // 👈 Paytm redirects back to this server handler
        txnAmount: { value: Number(amount).toFixed(2), currency: "INR" },
        userInfo: { custId: customerId.trim() }
      }
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey);
    paytmParams.head = { signature: checksum };

    const paytmUrl = `https://securestage.paytmpayments.com/theia/api/v1/initiateTransaction?mid=${activeMid}&orderId=${orderId.trim()}`;
    const response = await fetch(paytmUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paytmParams)
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      txnToken: result.body.txnToken,
      orderId: orderId,
      mid: activeMid
    });

  } catch (error) {
    return NextResponse.json({ error: "Gateway token generation aborted." }, { status: 500 });
  }
}