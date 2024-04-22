import { IncomingMessage } from "http";
import { CookieListItem } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req) {
    let verify = req.cookies.get("loggedin");

}