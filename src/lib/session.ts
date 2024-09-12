import { AuthResponse, Session } from "./definitions";
import { SignJWT, jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";
import { FetchError } from "./FetchError";

const exp = 300 * 10000000000;

// Custom error for expired or invalid session
class SessionExpiredError extends Error {
    constructor(message: string = 'Session has expired') {
        super(message);
        this.name = 'SessionExpiredError';
    }
}

// Get Secret Key
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is not defined');
}
const key = new TextEncoder().encode(secretKey);

// Encrypt session
export async function encrypt(payload: Session) {
    const expirationTime = new Date(Date.now() + exp); // 1 hour from now in seconds

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expirationTime) // Set expiration time as a timestamp
        .sign(key);
}

// Decrypt session
export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        if (error instanceof JWTExpired) {
            throw new SessionExpiredError();
        }
        throw error; // Re-throw other errors
    }
}


// Create session for Authenticated User
export async function createSession(payload: AuthResponse) {
    try {
        // // Set expiration time to 1 hour from now
        const expires = new Date(Date.now() + Math.floor(exp / 1000));
        const session = await encrypt({ ...payload, SESSION_EXPIRY: Math.floor(expires.getTime() / 1000) });

        // Save the session in a cookie
        cookies().set("session", session, { expires, httpOnly: true });

    } catch (error) {
        if (error instanceof FetchError) {
            // Custom error handling logic
            return Promise.reject({
                status: error.status,
                message: error.message,
            });
        }
        return Promise.reject({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}