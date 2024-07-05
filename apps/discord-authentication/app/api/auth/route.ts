import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
    const TOKEN_API = process.env.DISCORD_TOKEN_API as string;
    const USER_API = process.env.DISCORD_USER_API as string;
    const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI as string;
    const { code } = await req.json();

    console.log(
      "searchP",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
    );

    const {
      data: { access_token },
    } = await axios.post(
      TOKEN_API,
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const {
      data: { username, global_name, email },
    } = await axios.get(USER_API, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return NextResponse.json(
      {
        username,
        global_name,
        email,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "인증에 실패했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
