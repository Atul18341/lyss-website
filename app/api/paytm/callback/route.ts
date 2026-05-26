export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

import PaytmChecksum from 'paytmchecksum';

export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const responseParams: Record<string, string> = {};

    formData.forEach((value, key) => {
      responseParams[key] = value.toString();
    });
    const checksum = responseParams.CHECKSUMHASH;

    delete responseParams.CHECKSUMHASH;

    const isValidChecksum =
      PaytmChecksum.verifySignature(
        responseParams as any,
        process.env.PAYTM_MERCHANT_KEY!,
        checksum
      );
    const status = responseParams.STATUS;
    const orderId = responseParams.ORDERID;
    const txnId = responseParams.TXNID;
    const amount = responseParams['TXNAMOUNT'];
    const responseCode =responseParams.RESPCODE;
    if (isValidChecksum && status === "TXN_SUCCESS" && responseCode === "01") {
      // ✅ SUCCESS LOGIC: Update your database status here!
      // await db.order.update({ where: { id: orderId }, data: { paid: true, transactionId: txnId } });

      return NextResponse.redirect(
        new URL(`/checkout-page/status?status=success&txnId=${txnId}&orderId=${orderId}`, req.url),
        303
      );
    }
    else{
    // ❌ FAILURE LOGIC: Handle declined operations gracefully
      return NextResponse.redirect(
        new URL(`/checkout-page/status?status=failed&order=${orderId}`, req.url),
        303
      );

      }
  } catch (error) {
    console.error(error);
    console.error("Callback crash:", error);
    return NextResponse.redirect(new URL('/checkout-page/status?status=error', req.url), 303);
  }
}