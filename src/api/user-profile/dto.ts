import { z } from "zod";

export const userImageSchema = z.object({
  image: z.string().min(1, "Image is required"), // base64 string
});

export type ImageInput = z.infer<typeof userImageSchema>;

export const UserInfoShema = z.object({
  name: z
    .string({ message: "Invalid Username!" })
    .nonempty({ error: "Username is required!" }),
  email: z
    .string({ message: "Email is required!" })
    .email({ error: "Invalid email!" })
    .nonempty(),
});

export type InfoInput = z.infer<typeof UserInfoShema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
