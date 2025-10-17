import { Prisma } from "@prisma/client";
import z from "zod";

export const Blogschema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Describe your story"),
  status: z.enum(["draft", "published"], {
    error: "status is required!",
  }),
});

export type BlogInput = z.infer<typeof Blogschema>;

export interface BlogResponse extends BlogInput {
  id: number;
  status: "published" | "draft";
  createdAt: Date;
  userId: string;
}

export type BlogWithUser = Prisma.BlogGetPayload<{
  include: {
    user: { select: { name: true; image: true } };
  };
}>;

export type EditTitleInput = {
  id: number;
  title: string;
};

export type EditDescInput = {
  id: number;
  description: string;
};

export type EditStatusInput = {
  id: number;
  status: "draft" | "published";
};
