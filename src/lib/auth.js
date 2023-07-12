

import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
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

        if (!credentials?.email || !credentials.password) {
          return null;
        }
        console.log(credentialDetails)


        const user = await fetch("https://smartowl.com.br/api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        })
        console.log(user)

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (!user || !(await compare(credentials.password, user.password))) {
        //   return null;
        // }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user ;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};