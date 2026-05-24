import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {

    const id = params.id;

    console.log("Course ID:", id);

    const djangoResponse = await fetch(
      `https://atplc20.pythonanywhere.com/course/${id}/`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    console.log("Django Status:", djangoResponse.status);

    // Read raw text first
    const text = await djangoResponse.text();

    console.log("Django Response:", text);

    // Convert safely to JSON
    const data = JSON.parse(text);

    return NextResponse.json(data);

  } catch (error) {

    console.error("Route Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}