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

  } catch (error: any) {
  // 💡 This prints the REAL error code directly to your terminal or Vercel dashboard console!
  console.error("=== MIDDLEWARE CRASH INSPECTION LOG ===");
  console.error("Message:", error?.message);
  console.error("Full Stack Trace:", error);
  
  return NextResponse.json(
    { 
      error: "Internal Server Middleware processing error.",
      debugDetails: error?.message || "Unknown error" // 👈 Temporarily pipe it to your screen to see it live
    }, 
    { status: 500 }
  );
}
}