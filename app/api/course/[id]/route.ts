import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } = await context.params;

    const response = await fetch(
      `https://atplc20.pythonanywhere.com/course/${id}/`,
      {
        cache: "no-store",
      }
    );

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