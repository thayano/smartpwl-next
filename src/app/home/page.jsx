
import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { parseCookies } from "nookies";
import CryptoJS from "crypto-js";
import axios from "axios";

export default async function Home() {
  // const { user } = useContext(AuthContext);
  const { smartowl_token } = parseCookies();
  // console.log(smartowl_token)
  const bytes = CryptoJS.AES.decrypt(
    smartowl_token,
    process.env.NEXT_CRYPTO
  );

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  await fetch('https://www.smartowl.com.br/api/users/by_token/', {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${decrypted}`
    }, 
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro na solicitação');
      }
    })
    .then((data) => {
      console.log(data); // Utiliza os dados da resposta
    })
    .catch((error) => {
      console.error(error); // Trata erros
    });
    
    // fetch('https://www.smartowl.com.br/api/users/by_token/', { cache: 'no-store' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  // return res.json()

  

  return (
    <>
      <Head>
        <title>Home - Smart Owl</title>
      </Head>
      <div className="flex flex-col h-screen justify-between bg-[--azul-bg]">
        <div className="flex m-4 gap-2 h-full">
        </div>
        <footer className="mt-auto">{/* <FooterInterno /> */}</footer>
      </div>
    </>
  );
}
// export const getServerSideProps = async (ctx) => {
//   const { ["smartowl_token"]: token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   } else {
//     console.log("oi")
//     // const bytes = CryptoJS.AES.decrypt(token, process.env.NEXT_CRYPTO);
//     // const decrypted = bytes.toString(CryptoJS.enc.Utf8);


//     // const { data } = await axios.get("https://www.smartowl.com.br/api/users/by_token/",
//     //   { Headers: { Authorization: `token ${decrypted }` } }
//     // );
//     // console.log(data )

//     // const data  = await axios.get('/pages/api/login')
//     // console.log(data)


//     // if (data.token == user.token) {
//     //   return {
//     //     props: {},
//     //   };
//     // }
//   }
//     return {
//         props: {},
//       };
  
//   // await apiClient.get('/users')?
// };
