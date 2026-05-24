import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const params = await context.params;

    const id = params.id;

    console.log("ID:", id);

    const response = await fetch(
      `https://atplc20.pythonanywhere.com/course/${id}/`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {

      return NextResponse.json(
        {
          error: "Course not found",
        },
        {
          status: response.status,
        }
      );

    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

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