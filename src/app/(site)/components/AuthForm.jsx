"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Input from "@/app/components/inputs/Inputs";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/app/context/AuthContext";
import Alert from "@/app/context/AlertContext";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  loading: () => "",
});

const objAlert = {
  message: "",
  status: "",
  type: "",
};
const AuthForm = () => {
  const [msgError, setMsgError] = useState(objAlert);

  const [isLoading, setIsLoading] = useState(false);
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
  });

  const onSubmit = async (data) => {
    const { response } = await singIn(data);

    if (response.status != 200) {
      objAlert.message =
        response.data.message ||
        "Ocorreu um erro, entre em contato com o Suporte!";
      objAlert.status = true;
      objAlert.type = "error";
    }
  };
  //   if (res.url) router.push(res.url);
  //   setSubmitting(false);
  // };

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      setMsgError("Faça a validação no reCAPTCHA");
      return;
    }
    setValue("recaptcha", captchaCode);
  };

  return (
    <div className="lg:mx-0 mx-auto sm:w-full sm:max-w-md py-8">
      <div
        className="
          mx-8
          py-8
          sm:rounded-[15px]
          sm:px-0
          sm:mx-1
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Alert
            status={objAlert.status}
            message={objAlert.message}
            type={objAlert.type}
          />
          <Input
            disabled={isLoading}
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
            disabled={isLoading}
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
          <div className="text-sm mt-4">
            <a
              href="#"
              className="font-semibold text-[#005f8e] hover:text-sky-700"
            >
              Esqueceu a senha?
            </a>
          </div>
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
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
          <div className="underline cursor-pointer">oi</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
