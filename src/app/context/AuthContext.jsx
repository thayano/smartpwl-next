"use client";
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import axios from "axios";
// import { api } from "../services/api"
// import { urlLogin, urlUsers } from '../routes/Routes'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { user } = parseCookies();
    if (user) {
      api.get(`${urlUsers} ${user}/`).then((response) => {
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
      );

      setCookie(undefined, "smartowl_token", data.token);
      // api.defaults.headers['Authorization'] = `token ${data.token}`;
      setCookie(undefined, "user", data.user.id);
      setUser(data.user);

      Router.push("/app/home");
    } catch (error) {
        // console.log(error.response.data)
      return error;
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
