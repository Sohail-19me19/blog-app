"use server";
import { CLOUDINARY_CLOUD_NAME, UPLOAD_PRESET } from "@src/config";
import { db } from "@src/db";
import { toPlainObject, withAuth } from "@src/helpers";
import { ChangePasswordInput, ImageInput, InfoInput } from "./dto";
import bcrypt from "bcryptjs";

export const updatedUserImageAction = async (data: ImageInput) =>
  withAuth<ImageInput, Awaited<ReturnType<typeof db.user.update>>>(data, async (args, user) => {
    if (!args.image) throw new Error("no file provided");

    const formData = new FormData();
    formData.append("file", args.image);
    formData.append("upload_preset", UPLOAD_PRESET as string);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const res = await uploadRes.json();

    const updated = await db.user.update({
      where: { id: user.id },
      data: { image: res.secure_url },
    });
    return toPlainObject(updated);
  });

export const updateUserInfoAction = async (data: InfoInput) =>
  withAuth<InfoInput, Awaited<ReturnType<typeof db.user.update>>>(data, async (args, user) => {
    const updated = await db.user.update({
      where: { id: user.id },
      data: { name: data.name, email: data.email },
    });
    return toPlainObject(updated);
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
