
// import NextAuth, { AuthOptions } from "next-auth"
// import Providers from "next-auth/providers"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"

// import prisma from "@/app/libs/prismadb"

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// import GitHub from "next-auth/providers/github"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const authOptions = {
session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "smartowl/user/login/",
      name: "smartowl",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
        recaptcha: { label: "Recaptcha", type: "text" },
      },

      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
          recaptcha: credentials.recaptcha,
        };

        const resp = await fetch(backendURL + "/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:credentialDetails,
        });
        const user = await resp.json();
        console.log(user)

        if (user.is_success) {
          console.log("nextauth daki user: " + user.is_success);

          return user;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.data.auth.email;
        token.username = user.data.auth.userName;
        token.user_type = user.data.auth.userType;
        token.accessToken = user.data.auth.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.username = token.userName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
// const providers=[
//     Providers.Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' },
//         recaptcha:{  label: 'recaptcha', type: 'text' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials');
//         }

//         const { data } = await axios.post(
//             "https://www.smartowl.com.br/api/users/login/",
//             {
//               email,
//               password,
//               recaptcha,
//             }
//           );

//         return data;
//       }
//     })
//   ]

//   const options = {
//     providers,
//     callbacks
//   }
  
//   export default (req, res) => NextAuth(req, res, options)
  