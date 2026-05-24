import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {

    const response = await fetch(
      `https://atplc20.pythonanywhere.com/course/${params.id}/`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {

      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}