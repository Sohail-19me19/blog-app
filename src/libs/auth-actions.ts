"use server";
import { SignInInput, SignUpInput } from "@src/db/controllers";
import { signIn, signOut } from "./auth";

/** Server Actions must return only plain objects (no classes). Don't return NextAuth result. */
export const signInAction = async (props: SignInInput) => {
  const result = await signIn("sign-in", { ...props, redirectTo: "/dashboard" });
  if (result && typeof result === "object" && "error" in result)
    return { ok: false as const, error: String((result as { error?: string }).error) };
  return { ok: true as const };
};

export const googleSignInAction = async () => {
  const result = await signIn("google", { redirectTo: "/dashboard" });
  if (result && typeof result === "object" && "error" in result)
    return { ok: false as const, error: String((result as { error?: string }).error) };
  return { ok: true as const };
};

export const signUpAction = async (props: SignUpInput) => {
  const result = await signIn("sign-up", { ...props, redirectTo: "/dashboard" });
  if (result && typeof result === "object" && "error" in result)
    return { ok: false as const, error: String((result as { error?: string }).error) };
  return { ok: true as const };
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/sign-in" });
  return { ok: true as const };
};
