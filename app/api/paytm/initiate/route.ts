import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';

export async function POST(request: Request) {
  try {
    const { amount, orderId, customerId } = await request.json();

    const activeMid = process.env.PAYTM_MID!.trim();
    const merchantKey = process.env.PAYTM_MERCHANT_KEY!.trim();

    const paytmParams:any = {
      body: {
        requestType: "Payment",
        mid: activeMid,
        websiteName: "WEBSTAGING",
        orderId: orderId.trim(),
        callbackUrl: "https://lyss.in/api/paytm/callback",
        txnAmount: {
          value: Number(amount).toFixed(2),
          currency: "INR"
        },
        userInfo: {
          custId: customerId.trim()
        }
      }
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    paytmParams.head = {
      signature: checksum
    };

    const paytmUrl =
      `https://securestage.paytmpayments.com/theia/api/v1/initiateTransaction?mid=${activeMid}&orderId=${orderId}`;

    const response = await fetch(paytmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paytmParams)
    });

    const result = await response.json();

    console.log(result);

    return NextResponse.json({
  txnToken: result.body.txnToken,
  orderId: orderId,
  mid: activeMid
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}