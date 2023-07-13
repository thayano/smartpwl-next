import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(request) {
  const { email, password, recaptcha } = request.body;
  console.log(email, password, recaptcha)

  // // Chame a rota do backend externo para autenticação e obtenção do token
  // try {
  //   const response = await axios.post('http://146.190.197.43:7000/users/login/',{ email, password, recaptcha })
  //   if (response?.status == 200) {
  //     const data = response
  //     return new Response(data);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return new Response('Falha na autenticação');
  // }

  // if (response.ok) {
  //   const data = await response.json();

  //   return new Response(data);

  // } else {
  //   return new Response('Falha na autenticação');
  // }
}
