import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";
import { Session } from "./lib/definitions";

const publicRoutes = ["/login"];
const protectedRoutes = ["/app"];

export default async function middleware(req: NextRequest) {

    // Get the URL
    const url = req.nextUrl.clone();

    // Get path
    const path = url.pathname;

    // Redirect to login if going on absolute path
    if (path == "/") {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Allow Login route
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    // Retrieve cookie
    const cookie = cookies().get("session")?.value!;

    // If no cookie found, redirect to Login
    if (!cookie) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Retrieve session
    let session: Session | null = null;
    try {
        session = await decrypt(cookie);
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect to login if accessing protected route and session not found
    if (protectedRoutes && !session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
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