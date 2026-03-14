"use server";
import { CLOUDINARY_CLOUD_NAME, UPLOAD_PRESET } from "@src/config";
import { db } from "@src/db";
import { withAuth } from "@src/helpers";
import { User } from "next-auth";
import { ChangePasswordInput, ImageInput, InfoInput } from "./dto";
import bcrypt from "bcryptjs";

export const updatedUserImageAction = async (data: ImageInput) =>
  withAuth<ImageInput, Promise<User>>(data, async (args, user) => {
    if (!args.image) throw new Error("no file provided");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: args.image,
          upload_preset: UPLOAD_PRESET,
        }),
      },
    );

    const res = await uploadRes.json();
    if (!res.secure_url) throw new Error("Cloudinary upload failed");

    return await db.user.update({
      where: { id: user.id },
      data: { image: res.secure_url },
    });
  });

export const updateUserInfoAction = async (data: InfoInput) =>
  withAuth<InfoInput, Promise<User>>(data, async (args, user) => {
    return await db.user.update({
      where: { id: user.id },
      data: { name: data.name, email: data.email },
    });
  });

export const changePasswordAction = async (data: ChangePasswordInput) =>
  withAuth<ChangePasswordInput, Promise<{ success: boolean; message: string }>>(
    data,
    async (args, user) => {
      const existingUser = await db.user.findUnique({ where: { id: user.id } });
      if (!existingUser) throw new Error("User not found");

      const isOldPasswordValid = await bcrypt.compare(
        args.oldPassword,
        existingUser.password!,
      );
      if (!isOldPasswordValid) throw new Error("Old password is incorrect");

      const hashedPassword = await bcrypt.hash(args.newPassword, 10);

      await db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return { success: true, message: "Password updated successfully" };
    },
  );
