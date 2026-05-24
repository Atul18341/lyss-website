// 📁 src/app/api/paytm/sync-postpaid/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const mergedData = await request.json();

    // Secure server-to-server POST push directly to your PythonAnywhere account configuration
    const djangoEndpoint = `${process.env.PYTHONANYWHERE_BACKEND_URL}/register/`;
    
    const djangoResponse = await fetch(djangoEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DJANGO_SHARED_SECRET_KEY!.trim()}`
      },
      body: JSON.stringify(mergedData),
      cache: 'no-store'
    });

    const djangoOutput = await djangoResponse.json();

    if (!djangoResponse.ok) {
      return NextResponse.json(
        { error: djangoOutput.error || "Django rejected late data write operations." },
        { status: djangoResponse.status }
      );
    }

    return NextResponse.json({ success: true, message: "Ledger updated securely." });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Middleware processing error." }, { status: 500 });
  }
}