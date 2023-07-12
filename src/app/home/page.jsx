import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { parseCookies } from "nookies";
import CryptoJS from "crypto-js";
import axios from "axios";

export default function Home() {
  // const { user } = useContext(AuthContext);

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
export const getServerSideProps = async (ctx) => {
  const { ["smartowl_token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    console.log("oi")
    // const bytes = CryptoJS.AES.decrypt(token, process.env.NEXT_CRYPTO);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);


    // const { data } = await axios.get("https://www.smartowl.com.br/api/users/by_token/",
    //   { Headers: { Authorization: `token ${decrypted }` } }
    // );
    // console.log(data )

    // const data  = await axios.get('/pages/api/login')
    // console.log(data)


    // if (data.token == user.token) {
    //   return {
    //     props: {},
    //   };
    // }
  }
    return {
        props: {},
      };
  
  // await apiClient.get('/users')?
};
