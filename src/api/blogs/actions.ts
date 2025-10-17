"use server";

import { Blog, Prisma } from "@prisma/client";
import { db } from "@src/db";
import { withAuth } from "@src/helpers";
import {
  BlogWithUser,
  EditDescInput,
  EditStatusInput,
  EditTitleInput,
} from "./dto";

export const getAllPublishedBlogsAction = async (): Promise<BlogWithUser[]> => {
  return await db.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  });
};

export const addBlogAction = async (
  data: Omit<Prisma.BlogUncheckedCreateInput, "userId">
) =>
  withAuth<Omit<Prisma.BlogUncheckedCreateInput, "userId">, Blog>(
    data,
    async (args, user) => {
      return await db.blog.create({
        data: { ...args, userId: user.id! },
      });
    }
  );

export const getAllUsersBlogsAction = async () =>
  withAuth<undefined, Blog[]>(undefined, async (_, user) => {
    return await db.blog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  });

export const deleteBlogAction = async (id: number) =>
  withAuth<number, Blog>(id, async (blogId) => {
    return db.blog.delete({
      where: { id: blogId },
    });
  });

export const editBlogTitleAction = async (data: EditTitleInput) =>
  withAuth<EditTitleInput, Blog>(data, async (args) => {
    return await db.blog.update({
      where: { id: args.id },
      data: { title: args.title },
    });
  });

export const editBlogDescAction = async (data: EditDescInput) =>
  withAuth<EditDescInput, Blog>(data, async (args) => {
    return await db.blog.update({
      where: { id: args.id },
      data: { description: args.description },
    });
  });

export const editBlogStatusAction = async (data: EditStatusInput) =>
  withAuth<EditStatusInput, Blog>(data, async (args) => {
    return await db.blog.update({
      where: { id: args.id },
      data: { status: args.status },
    });
  });
