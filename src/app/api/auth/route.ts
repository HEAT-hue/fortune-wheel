// // app/api/auth/login.js
// import ldap from 'ldapjs';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest, res: NextResponse): Promise<any> {
//     const { username, password } = await req.json();

//     const client = ldap.createClient({
//         url: process.env.LDAP_URI!,
//     });

//     const bindDN = `uid=${username},ou=users,dc=example,dc=com`;

//     return new Promise((resolve) => {
//         client.bind(bindDN, password, (err) => {
//             if (err) {
//                 console.error('LDAP bind error:', err);
//                 NextResponse.json({ err: 'Invalid username or password' }, { status: 401 });
//                 resolve({});
//             } else {
//                 client.unbind();

//                 // Generate a token (this can be a JWT or a simple string)
//                 const token = `${username}-token`; // Replace with real token generation logic

//                 const response = NextResponse.json({ message: 'Authentication successful' });
//                 response.cookies.set('token', token, {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV === 'production',
//                     maxAge: 60 * 60 * 24 * 7, // 1 week
//                     path: '/',
//                 });

//                 return response;
//             }
//         });
//     });
// }
