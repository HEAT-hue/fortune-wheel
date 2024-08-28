'use server'
import { APIResponse } from "./definitions";
import { createSession } from "./session";

export type AuthRequest = {
    email: string;
    password: string;
};

const secretUsername = process.env.EMAIL
console.log(secretUsername);
const secretPassword = process.env.PASSWORD
console.log(secretPassword)

export async function LoginUser(payload: AuthRequest): Promise<APIResponse<string>> {
    if (payload.email == null || payload.password == null) {
        return Promise.reject({
            status: 400,
            message: 'Bad credentials',
        });
    }

    console.log(payload);

    console.log(secretUsername, secretPassword);

    if (payload.email != secretUsername || payload.password != secretPassword) {
        return { status: false, data: "Invalid credentials" }
    }

    await createSession({ email: payload.email });

    return { status: true, data: payload.email }
}
