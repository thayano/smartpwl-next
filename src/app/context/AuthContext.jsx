"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from 'next/navigation'
// import { api } from "../services/api"
// import { urlLogin, urlUsers } from '../routes/Routes'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      const idUser = secureLocalStorage.getItem('smartowl_user')
      api.get(`https://www.smartowl.com.br/api/users/${idUser}/`).then((response) => {
        setUser(response.data);
      });
    }
  }, []); 

  async function singIn({ email, password, recaptcha }) {
    try {
      const { data } = await axios.post(
        "https://www.smartowl.com.br/api/users/login/",
        {
          email,
          password,
          recaptcha,
        }
      )
      secureLocalStorage.setItem('smartowl_token', data.token);
      secureLocalStorage.setItem('smartowl_user', data.user.id);
      setUser(data.user);
      router.push('/home')

    } catch (error) {

      return error;
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
