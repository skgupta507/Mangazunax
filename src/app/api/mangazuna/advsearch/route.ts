import { NextRequest, NextResponse } from "next/server";
import {
  NEXT_MANGAZUNA_APIURL,
  NEXT_MANGAZUNA_APIKEY,
} from "../../../../lib/mangazuna";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (!NEXT_MANGAZUNA_APIURL && !NEXT_MANGAZUNA_APIKEY) {
      throw new Error("Missing API Key Or API URL");
    }
    const page = req.nextUrl.searchParams.get("page") || 1;
    const type = req.nextUrl.searchParams.get("type") || "Manga";
    const fetchData = await fetch(
      `${process.env.NEXT_MANGAZUNA_APIURL}/api/v1/manga/advsearch?type=${type}&page=${page}`
    );
    const data = await fetchData.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(err, {
      status: 500,
    });
  }
}
