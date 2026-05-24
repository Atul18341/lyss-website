// 📁 src/app/api/paytm/initiate/route.ts
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';

export async function POST(request: Request) {
  try {
    // 1. Consolidate the client body JSON stream data exactly once
    const data = await request.json();
    
    const { 
      orderId, itemId, amount, name, email, mobile, 
      whatsapp, university, college, course, department, universityRegNo, password 
    } = data;

    const activeMid = process.env.PAYTM_MID!.trim();
    const merchantKey = process.env.PAYTM_MERCHANT_KEY!.trim();
    const customerId = `CUST_${mobile || 'GUEST'}`;

    // ==========================================
    // STEP A: CONFLICT-SAFE DATABASE REGISTRATION HANDSHAKE
    // ==========================================
    const djangoEndpoint = `${process.env.PYTHONANYWHERE_BACKEND_URL}/register/`;
    
    const djangoResponse = await fetch(djangoEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DJANGO_SHARED_SECRET_KEY}`
      },
      body: JSON.stringify({
        orderId, itemId, amount, name, email, mobile,
        whatsapp, university, college, course, department, universityRegNo, password
      })
    });

    const djangoData = await djangoResponse.json();

    // 🚨 GATEKEEPER CRASH CONTROL: If Django rejects registration, halt processing immediately
    if (!djangoResponse.ok) {
      return NextResponse.json(
        { error: djangoData.error || "Registration validation error at core database layer." }, 
        { status: djangoResponse.status }
      );
    }

    // ==========================================
    // STEP B: GENERATE SECURE CHECKSUM & PING PAYTM
    // ==========================================
    const paytmParams: any = {
      body: {
        requestType: "Payment",
        mid: activeMid,
        websiteName: "DEFAULT", // 💡 Fixed: Changed from WEBSTAGING to DEFAULT for production endpoints
        orderId: orderId.trim(),
        callbackUrl: "https://lyss.in/api/paytm/callback",
        txnAmount: {
          value: Number(amount).toFixed(2),
          currency: "INR"
        },
        userInfo: {
          custId: customerId.trim(),
          mobile: mobile ? mobile.trim() : "",
          email: email ? email.trim() : ""
        }
      }
    };

    // Calculate secure signature over the parameter payload layout body context
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    paytmParams.head = {
      signature: checksum
    };

    const paytmUrl = `https://secure.paytmpayments.com/theia/api/v1/initiateTransaction?mid=${activeMid}&orderId=${orderId.trim()}`;

    const paytmFetchResponse = await fetch(paytmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paytmParams)
    });

    const result = await paytmFetchResponse.json();

    // Verify Paytm didn't reject the checksum authorization key signature
    if (!result.body || !result.body.txnToken) {
      console.error("Paytm Gateway Rejection Error Payload:", result);
      return NextResponse.json(
        { error: result.body?.resultInfo?.resultMsg || "Payment token generation failed." },
        { status: 400 }
      );
    }

    // Return properties safely to activate window overlay execution controls
    return NextResponse.json({
      success: true,
      txnToken: result.body.txnToken,
      orderId: orderId,
      mid: activeMid
    });

  } catch (error: any) {
    console.error("Initiation Handler Crash Exception:", error);
    return NextResponse.json(
      { error: "Internal payment processing engine crash." }, 
      { status: 500 }
    );
  }
}