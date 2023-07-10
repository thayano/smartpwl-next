import React, { useState } from "react";
import clsx from "clsx";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const Input = ({
  label,
  id,
  register,
  errors,
  type = "text",
  disabled,
  validator
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const inputClassNames = clsx(
    "px-4 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6",
    errors[id] && "focus:ring-rose-500 bg-rose-50",
    disabled && "opacity-50 cursor-default"
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          type={isPasswordType && showPassword ? "text" : type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, validator)}
          className={inputClassNames}
        />
        {isPasswordType && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        )}
      </div>
      {errors[id] && (
        <span className="text-red-500 text-xs">* {errors[id]?.message}</span>
      )}
    </div>
  );
};
