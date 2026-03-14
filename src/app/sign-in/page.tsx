"use client";
import React, { useState } from "react";
import { SignInInput, SignInSchema } from "@src/db/controllers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { googleSignInAction, signInAction } from "@src/libs";

const SignInPage = () => {
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signInAction(data);
      if (!result.ok && result.error) {
        const msg = result.error.includes("CredentialsSignin")
          ? "Invalid Email and Password!"
          : result.error;
        setError("email", { message: msg });
        setError("password", { message: msg });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError("email", { message });
      setError("password", { message });
    }
  });

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    googleSignInAction();
  };

  return (
    <div className="flex flex-col lg:flex-row h-full items-center justify-between p-5 lg:p-10 md:bg-[linear-gradient(157.5deg,#151515_35%,#f5f5f5_35%)] lg:bg-[linear-gradient(141.5deg,#151515_35%,#f5f5f5_35%)] bg-[linear-gradient(180deg,#151515_25%,#f5f5f5_25%)]">
      <div className="w-full lg:w-1/2 md:h-full h-1/4  sm:h-1/4 mb-8 lg:mb-0 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start">
          <Image
            className="bg-white"
            src="/images/icon.png"
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-white ml-2">
            Welcome back
          </h1>
        </div>
        <h2 className="text-base lg:text-lg mt-5 font-semibold text-gray-300">
          Create your account for free!
        </h2>
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/sign-up"
            className="[border:1px_solid_#fff] mt-5 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-white hover:text-[#4B5563] hover:[border:1px_solid_#4B5563]"
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="w-full sm:h-3/4 h-3/4 lg:w-1/2 space-y-4 px-5 lg:px-10 py-5  rounded-xl">
        <h1 className="text-xl lg:text-2xl font-bold text-center lg:text-left text-gray-950">
          Sign In
        </h1>
        <form onSubmit={onSubmit} className="mt-5">
          <label
            htmlFor="email"
            className="block mb-1 text-gray-600 text-sm lg:text-lg font-semibold"
          >
            Email
          </label>
          <input
            className={`w-full rounded-full text-[#151515] border px-3 py-2 outline-none focus:ring-0 ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-neutral-300 focus:border-gray-900"
            }`}
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          <p className="h-6 text-sm text-red-500">{errors.email?.message}</p>

          <label
            htmlFor="password"
            className="block mb-1 text-gray-600 text-sm lg:text-lg font-semibold"
          >
            Password
          </label>
          <input
            className={`w-full rounded-full text-[#151515] border px-3 py-2 outline-none focus:ring-0 ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : "border-neutral-300 focus:border-gray-900"
            }`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="h-6 text-sm text-red-500">{errors.password?.message}</p>

          <button
            className="w-full cursor-pointer rounded-full py-2 font-semibold text-white bg-[#151515]"
            type="submit"
          >
            {isSubmitting ? (
              <div className="m-auto h-6 w-6 animate-spin rounded-full border-2 border-neutral-400 border-r-neutral-100" />
            ) : (
              "Sign In"
            )}
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            disabled={googleLoading}
            type="button"
            className="flex text-[#151515] w-full cursor-pointer items-center justify-center rounded-full border border-neutral-300 py-1.5"
            onClick={handleGoogleLogin}
          >
            {googleLoading ? (
              <div className="h-[30px] w-[30px] animate-spin rounded-full border-2 border-neutral-400 border-r-neutral-100" />
            ) : (
              <>
                <Image
                  src="/images/google.png"
                  alt="Google Logo"
                  width={30}
                  height={30}
                />
                <span className="ml-2">Sign in with Google</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
