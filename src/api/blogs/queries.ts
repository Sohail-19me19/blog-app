import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBlogAction,
  deleteBlogAction,
  editBlogDescAction,
  editBlogStatusAction,
  editBlogTitleAction,
  getAllPublishedBlogsAction,
  getAllUsersBlogsAction,
} from "./actions";
import { Blog, Prisma } from "@prisma/client";
import { queryClient } from "@src/components";
import { EditDescInput, EditStatusInput, EditTitleInput } from "./dto";

export const useGetAllPublishedBlogs = () =>
  useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => await getAllPublishedBlogsAction(),
  });

export const useAddBlog = () =>
  useMutation<Blog, Error, Omit<Prisma.BlogUncheckedCreateInput, "userId">>({
    mutationKey: ["add-blog"],
    mutationFn: async (data) => await addBlogAction(data),
  });

export const useGetUserBlogs = () =>
  useQuery({
    queryKey: ["user-blogs"],
    queryFn: async () => await getAllUsersBlogsAction(),
  });

export const useDeleteBlog = () =>
  useMutation<Blog, Error, number>({
    mutationKey: ["delete-blog"],
    mutationFn: async (id) => await deleteBlogAction(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user-blogs"] }),
  });

export const useEditTitleBlog = () =>
  useMutation<Blog, Error, EditTitleInput>({
    mutationKey: ["edit-title"],
    mutationFn: async (data) => editBlogTitleAction(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user-blogs"] }),
  });

export const useEditDescBlog = () =>
  useMutation<Blog, Error, EditDescInput>({
    mutationKey: ["edit-desc"],
    mutationFn: async (data) => editBlogDescAction(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user-blogs"] }),
  });

export const useEditStatusBlog = () =>
  useMutation<Blog, Error, EditStatusInput>({
    mutationKey: ["edit-status"],
    mutationFn: async (data) => editBlogStatusAction(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user-blogs"] }),
  });
