import Head from 'next/head';
// import NavBar from '@component/components/NavBar';
// import { FooterInterno } from '@component/components/FooterInterno';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import secureLocalStorage from "react-secure-storage";
import { parseCookies } from 'nookies';
// import { parseCookies } from 'nookies';
// import HomeContent from '@component/components/HomeContent';
// import { DetailsHomeProvider } from '@component/contexts/DetailsHome';

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>Home - Smart Owl</title>
            </Head>
            <div className="flex flex-col h-screen justify-between bg-[--azul-bg]">
                {/* <NavBar name={user?.name} email={user?.email} /> */}
                <div className="flex m-4 gap-2 h-full">
                    {/* <DetailsHomeProvider>
                        <HomeContent />
                    </DetailsHomeProvider> */}
                </div>
                <footer className="mt-auto">
                    {/* <FooterInterno /> */}
                </footer>
            </div>
        </>
    );
}
export const getServerSideProps = async (ctx) => {

    const { smartowl_token } = parseCookies(ctx);
    
    if (!smartowl_token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    // await apiClient.get('/users')?
    return {
        props: {}
    };
}