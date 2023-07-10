// import bcrypt from "bcrypt"

// import axios from "axios";

// export const authOptions = {
 
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' },
//         recaptcha: { label: 'recaptcha', type: 'text' }
//       },
//       authorize: async (credentials)=> {
//         // if (!credentials?.email || !credentials?.password || !credentials?.recaptcha) {
//         //   throw new Error('Invalid credentials');
//         // }

//         const  { data: user } = await axios.post('https://www.smartowl.com.br/api/users/login/',credentials)
//         console.log(user)

//         if (!user || !user?.hashedPassword) {
//           throw new Error('Invalid credentials');
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error('Invalid credentials');
//         }

//         return user;
//       }
//     })
//   ],
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// }

// const handler = NextAuth(authOptions);

// export { handler as POST };

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  console.log(request);
  try {
    const user = await axios.post('https://www.smartowl.com.br/api/users/login/', request.body);

    return NextResponse.json(user.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}