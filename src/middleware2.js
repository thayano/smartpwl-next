// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

// export const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();

//     // Verifique se o token está presente no cookie antes de permitir o acesso ao componente
//     const token = Cookies.get('token');
//     if (!token) {
//       router.push('/');
//       return null;
//     }

//     // Aqui você pode realizar a validação do token no servidor, se necessário

//     return <WrappedComponent {...props} />;
//   };
// };
// import { NextResponse } from 'next/server'

import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request, context) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/'
//   // Executar o código de middleware antes de cada solicitação
//     // Verificar se a requisição está sendo feita para a página inicial
//     if (request.nextUrl.pathname !== '/') {
//         if (!request.cookies.token) {
//             // Redirecionar para a raiz
//             return NextResponse.redirect(url);
//           }
//     }

//     // Verificar se o cookie 'token' não está presente

//   }
// import { NextRequest, NextResponse } from 'next/server'

// // const allowedParams = ['allowed']

// export const config = {
//     matcher: '/',
// }
export function middleware(request) {
    // const url = request.nextUrl
    const url = request.nextUrl.clone()
    url.pathname = '/'
    const { pathname } = request.nextUrl

    
    // console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }

    if (pathname.includes("/home") || pathname.includes("/dashboard")) {
        const cookie = request.cookies
        if(!cookie){
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    // if (request.nextUrl.pathname.startsWith('/home')) {
    //     if (!request.cookies.token) {
    //         return NextResponse.redirect(url)
    //     }
    // }
    // if (cookie == undefined) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

}