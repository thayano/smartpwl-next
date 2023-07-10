"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/app/components/inputs/Inputs";
import Button from "@/app/components/Button";
import { AuthContext } from "@/app/context/AuthContext";
import { AlertContext } from "@/app/context/AlertContext";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  loading: () => "",
});

const objAlert = {
  message: "",
  status: false,
  type: "",
};

const AuthForm = () => {
  const [msgError, setMsgError] = useState(objAlert);
  const { singIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      recaptcha: "",
    },
  })

  const onSubmit = async (data) => {
    setMsgError({ status: false });

    if (data.recaptcha == '') {
      erroRecaptcha()
      return null
    }

    const { response } = await singIn(data);

    if (response.status !== 200) {
      erroLogin(response)
      window.grecaptcha.reset();
    }
  }

  const erroLogin = ({ data }) => {
    setMsgError({
      message:
        data.message ||
        "Ocorreu um erro, entre em contato com o Suporte!",
      status: true,
      type: "error",
    })
  }

  const erroRecaptcha = () => {
    setMsgError({
      message: "Faça a validação no reCAPTCHA",
      status: true,
      type: "error"
    })
  }

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      erroRecaptcha()
    }
    setValue("recaptcha", captchaCode);
  };

  return (
    <div className="mx-auto py-8">
      <div
        className="
          mx-auto
          py-8
          sm:rounded-[15px]
          sm:px-0
          lg:mx-48
          w-[19rem]
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertContext
            status={msgError.status}
            message={msgError.message}
            type={msgError.type}
          />
          <Input
            register={register}
            errors={errors}
            required
            id="email"
            label="Email"
            type="email"
            validator={{
              required: "Este campo é obrigatório",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Por favor, insira um endereço de e-mail válido",
              },
            }}
          />
          <Input
            register={register}
            errors={errors}
            required
            id="password"
            label="Senha"
            type="password"
            validator={{
              required: "Este campo é obrigatório",
            }}
          />
          <div className="mt-6">
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
              style={{ with: "100%" }}
            />
          </div>
          <div className="text-sm mt-4 w-full text-center">
            <a
              href="#"
              className="font-semibold text-[#005f8e] hover:text-sky-700"
            >
              Esqueceu a senha?
            </a>
          </div>
          <div>
            <Button fullWidth type="submit">
              Entar
            </Button>
          </div>
        </form>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >

        </div>
      </div>
    </div>
  );
};

export default AuthForm;
