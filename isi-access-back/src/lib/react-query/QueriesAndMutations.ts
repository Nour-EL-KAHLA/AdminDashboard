import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  deleteNews,
  getUserNews,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useGetUserNews = (userId?: string) => {
  return useQuery({
    queryKey: ["getUserPosts", userId],
    queryFn: () => getUserNews(userId),
    enabled: !!userId,
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deleteNews(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"],
      });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: any) => createPost(post),
  });
};
