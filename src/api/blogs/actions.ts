"use server";

import { Prisma } from "@prisma/client";
import { db } from "@src/db";
import { toPlainObject, withAuth } from "@src/helpers";
import {
  BlogWithUser,
  EditDescInput,
  EditStatusInput,
  EditTitleInput,
} from "./dto";

export const getAllPublishedBlogsAction = async (): Promise<BlogWithUser[]> => {
  const list = await db.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  });
  return toPlainObject(list);
};

export const addBlogAction = async (
  data: Omit<Prisma.BlogUncheckedCreateInput, "userId">
) =>
  withAuth<Omit<Prisma.BlogUncheckedCreateInput, "userId">, Awaited<ReturnType<typeof db.blog.create>>>(
    data,
    async (args, user) => {
      const created = await db.blog.create({
        data: { ...args, userId: user.id! },
      });
      return toPlainObject(created);
    }
  );

export const getAllUsersBlogsAction = async () =>
  withAuth<undefined, Awaited<ReturnType<typeof db.blog.findMany>>>(undefined, async (_, user) => {
    const list = await db.blog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return toPlainObject(list);
  });

export const deleteBlogAction = async (id: number) =>
  withAuth<number, Awaited<ReturnType<typeof db.blog.delete>>>(id, async (blogId) => {
    const deleted = await db.blog.delete({
      where: { id: blogId },
    });
    return toPlainObject(deleted);
  });

export const editBlogTitleAction = async (data: EditTitleInput) =>
  withAuth<EditTitleInput, Awaited<ReturnType<typeof db.blog.update>>>(data, async (args) => {
    const updated = await db.blog.update({
      where: { id: args.id },
      data: { title: args.title },
    });
    return toPlainObject(updated);
  });

export const editBlogDescAction = async (data: EditDescInput) =>
  withAuth<EditDescInput, Awaited<ReturnType<typeof db.blog.update>>>(data, async (args) => {
    const updated = await db.blog.update({
      where: { id: args.id },
      data: { description: args.description },
    });
    return toPlainObject(updated);
  });

export const editBlogStatusAction = async (data: EditStatusInput) =>
  withAuth<EditStatusInput, Awaited<ReturnType<typeof db.blog.update>>>(data, async (args) => {
    const updated = await db.blog.update({
      where: { id: args.id },
      data: { status: args.status },
    });
    return toPlainObject(updated);
  });
