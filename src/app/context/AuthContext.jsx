// "use client";

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import CryptoJS from "crypto-js";
// import { useRouter } from "next/navigation";
// import { parseCookies, setCookie, destroyCookie } from "nookies";

// // import { api } from "../services/api"
// // import { urlLogin, urlUsers } from '../routes/Routes'

// export const AuthContext = createContext({});

// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const [user, setUser] = useState();
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const { smartowl_token } = parseCookies();
//     if (smartowl_token) {
//       try {
//         const bytes = CryptoJS.AES.decrypt(
//           smartowl_token,
//           process.env.NEXT_CRYPTO
//         );
//         const decrypted = bytes.toString(CryptoJS.enc.Utf8);

//         axios
//           .get("https://www.smartowl.com.br/api/users/by_token/", {
//             headers: { Authorization: `token ${decrypted}` },
//           })
//           .then((response) => {
//             setUser(response.data);
//           });
//       } catch (error) {
//         console.log(error);
//         destroyCookie(undefined, "smartowl_token");
//         router.push("/");
//       }
//     }
//   }, []);

//   async function singIn({ email, password, recaptcha }) {
//     try {
//       const { data } = await axios.post(
//         "https://www.smartowl.com.br/api/users/login/",
//         {
//           email,
//           password,
//           recaptcha,
//         }
//       );
//       const cipherPwd = CryptoJS.AES.encrypt(
//         String(data.token),
//         process.env.NEXT_CRYPTO
//       ).toString();

//       setCookie(undefined, "smartowl_token", cipherPwd);
//       setUser(data.user);

//       router.push("/home");
//     } catch (error) {
//       return error;
//     }
//   }
//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthContext({
  children
}) {
  return <SessionProvider>{children}</SessionProvider>;
}