import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "./app/_lib/session";
// import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();

    // Get path
    const path = url.pathname;

    if (path == "/") {
        return NextResponse.redirect(new URL('/app', req.nextUrl));
    }

    // Successful authentication, continue on path
    return NextResponse.next();
}

// Allow images and SVGs
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.svg$|.*\\.gif$).*)",
    ],
};