import { useMutation } from "@tanstack/react-query";
import {
  changePasswordAction,
  updatedUserImageAction,
  updateUserInfoAction,
} from "./actions";
import { User } from "next-auth";
import { ChangePasswordInput, ImageInput, InfoInput } from "./dto";

export const useUpdateImage = () =>
  useMutation<User, Error, ImageInput>({
    mutationKey: ["update-image"],
    mutationFn: async (data) => updatedUserImageAction(data),
  });

export const useUpdateInfo = () =>
  useMutation<User, Error, InfoInput>({
    mutationKey: ["update-info"],
    mutationFn: async (data) => updateUserInfoAction(data),
  });

export const useChangePassword = () =>
  useMutation({
    mutationKey: ["change-password"],
    mutationFn: (data: ChangePasswordInput) => changePasswordAction(data),
  });
