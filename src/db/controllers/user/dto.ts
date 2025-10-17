import { z } from "zod";

export type GetUserByEmailInput = {
  email: string;
};

export const SignInSchema = z.object({
  email: z
    .string({ message: "Invalid Email!" })
    .email({ error: "Invalid Email!" })
    .nonempty({ error: "Email is required!" }),
  password: z
    .string({ error: "Invalid Password!" })
    .nonempty({ error: "Password is required!" }),
});

export const SignUpSchema = z.object({
  name: z
    .string({ error: "Invalid Username!" })
    .nonempty({ error: "Username is required!" }),
  email: z
    .string({ message: "Email is required!" })
    .email({ error: "Invalid email!" })
    .nonempty(),
  password: z
    .string({ error: "Password is required!" })
    .nonempty({ error: "Password is required!" }),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export type SignUpInput = z.infer<typeof SignUpSchema>;
