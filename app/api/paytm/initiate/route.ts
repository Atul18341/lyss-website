// 📁 src/app/api/paytm/initiate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. SAFE SINGLE READ: Consume the request payload stream exactly once
    const data = await request.json();
    
    const { 
      orderId, itemId, amount, name, email, mobile, 
      whatsapp, university, college, course, department, universityRegNo, password 
    } = data;

    // 2. LAYER 1 ERROR HANDLING: Validate presence of critical structural data
    if (!orderId || !email || !universityRegNo || !password) {
      return NextResponse.json(
        { error: "Validation Failed: Missing critical registration parameters (Email, Registration No., or Password)." },
        { status: 400 }
      );
    }

    // 3. LAYER 2 ERROR HANDLING: Verify server-side environmental infrastructure keys exist
    const backendUrl = process.env.PYTHONANYWHERE_BACKEND_URL;
    const djangoSecret = process.env.DJANGO_SHARED_SECRET_KEY;

    if (!backendUrl || !djangoSecret) {
      console.error("CRITICAL CONFIG ERROR: Missing system environment variables in .env.local");
      return NextResponse.json(
        { error: "Internal Configuration Error: Backend gateway keys are unassigned." },
        { status: 500 }
      );
    }

    // Clean up backend variables to remove accidental whitespaces or newline slips
    const cleanDjangoEndpoint = `${backendUrl.trim()}/register/`;
    const cleanAuthToken = `Bearer ${djangoSecret.trim()}`;

    console.log(`[Database Handshake Launched] Forwarding Order ID: ${orderId} to Django...`);

    // ==========================================================
    // LAYER 3 ERROR HANDLING: Execution of Secure Database Write Handshake
    // ==========================================================
    let djangoResponse;
    try {
      djangoResponse = await fetch(cleanDjangoEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cleanAuthToken
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          itemId,
          amount,
          name,
          email: email.trim(),
          mobile,
          whatsapp,
          university,
          college,
          course,
          department,
          universityRegNo: universityRegNo.trim(),
          password
        }),
        cache: 'no-store' // Bypasses Next.js default build caching systems
      });
    } catch (networkError: any) {
      // Catches instances where PythonAnywhere is entirely down or DNS fails
      console.error("FATAL: Django Server is completely unreachable:", networkError);
      return NextResponse.json(
        { error: "Database Link Down: Remote internship database server could not be reached." },
        { status: 503 } // 503 Service Unavailable
      );
    }

    // Safely capture Django response payload context
    const djangoData = await djangoResponse.json();

    // 4. LAYER 4 ERROR HANDLING: Handle structural rejections from Django Models
    // (e.g., Handles 400 Bad Request if University Registration Number or Email is already taken)
    if (!djangoResponse.ok) {
      console.warn(`[Registration Rejected by DB] Django Status: ${djangoResponse.status} | Reason:`, djangoData.error);
      return NextResponse.json(
        { error: djangoData.error || "Registration rejected due to database model constraint validations." }, 
        { status: djangoResponse.status }
      );
    }

    // ==========================================================
    // SUCCESS TERMINAL ANCHOR
    // ==========================================================
    console.log(`[Registration Succeeded] Data successfully locked into SQLite for Order: ${orderId}`);
    
    return NextResponse.json({
      success: true,
      message: "Student record securely written to Django database as a pending application structure.",
      orderId: orderId
    }, { status: 201 });

  } catch (globalError: any) {
    // Catch-all safety nets for unexpected code parsing runtime failures
    console.error("UNEXPECTED ROUTE ENGINE CRASH:", globalError);
    return NextResponse.json(
      { error: "Internal processing crash inside the master checkout orchestration middleware." }, 
      { status: 500 }
    );
  }
}