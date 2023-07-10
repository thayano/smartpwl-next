import Image from "next/image";
import AuthForm from "./components/AuthForm";
import logo from "../../assets/logo.png";
import background from "../../assets/backgroundLogin.svg";

const Auth = () => {
  return (
    <div>
      <Image
        src={background}
        alt="background"
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: "-1",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="py:24 lg:py-36">
            <header>
              <Image
                className="lg:mx-48 mx-auto sm:mt-10"
                src={logo}
                alt="Picture of the author"
                width={300}
                height={150}
                quality={75}
                priority={true}
                blurDataURL="blur"
              />
            </header>
            <section>
              <AuthForm />
            </section>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Auth;

//  <div
//       className="
//         flex
//         min-h-full
//         flex-col
//         justify-center
//         py-12
//         sm:px-6
//         lg:px-8
//         bg-gray-100
//       "
//     >
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <Image
//           height="48"
//           width="48"
//           className="mx-auto w-auto"
//           src="/images/logo.png"
//           alt="Logo"
//         />
//         <h2
//           className="
//             mt-6
//             text-center
//             text-3xl
//             font-bold
//             tracking-tight
//             text-gray-900
//           "
//           >
//             Sign in to your account
//         </h2>
//       </div>
//       <AuthForm />
//   </div>
