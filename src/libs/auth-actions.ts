"use server";
import { SignInInput, SignUpInput } from "@src/db/controllers";
import { signIn, signOut } from "./auth";

export const signInAction = async (props: SignInInput) => {
  return signIn("sign-in", { ...props, redirectTo: "/dashboard" });
};

export const googleSignInAction = async () => {
  return signIn("google", { redirectTo: "/dashboard" });
};

export const signUpAction = async (props: SignUpInput) => {
  return signIn("sign-up", { ...props, redirectTo: "/dashboard" });
};
export const signOutAction = async () => {
  return signOut({ redirectTo: "/sign-in" });
};
