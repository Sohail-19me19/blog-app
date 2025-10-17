"use server";

import { db } from "@src/db";
import { Prisma } from "@prisma/client";
import { GetUserByEmailInput } from "./dto";

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await db.user.create({ data });
};

export const getUserByEmail = async (data: GetUserByEmailInput) => {
  return await db.user.findUnique({ where: { email: data.email } });
};
