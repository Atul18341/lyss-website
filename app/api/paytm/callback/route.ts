export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

import PaytmChecksum from 'paytmchecksum';

export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const paytmParams: Record<string, string> = {};

    formData.forEach((value, key) => {
      paytmParams[key] = value.toString();
    });

    console.log("Paytm Callback:", paytmParams);

    const checksum = paytmParams.CHECKSUMHASH;

    delete paytmParams.CHECKSUMHASH;

    const isValidChecksum =
      PaytmChecksum.verifySignature(
        paytmParams as any,
        process.env.PAYTM_MERCHANT_KEY!,
        checksum
      );

    if (!isValidChecksum) {

      return NextResponse.json(
        {
          error:
            "Security Alert: Invalid transaction signature handshake match"
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: paytmParams
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Callback verification failed" },
      { status: 500 }
    );
  }
}