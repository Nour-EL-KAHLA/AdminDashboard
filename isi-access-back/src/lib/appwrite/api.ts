import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  databases,
  messages,
  storage,
} from "./config";

import axios from "axios";

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", user.email)]
    );

    if (currentUser && currentUser.documents[0].type === "student") return null;

    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserNews(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.newsCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNews(postId?: string) {
  if (!postId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.newsCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: any) {
  try {
    const uploadedImage = await uploadFile(post.image);

    if (!uploadedImage) throw Error;

    const imageUrl = getFilePreview(uploadedImage.$id);

    if (!imageUrl) {
      throw Error;
    }

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.newsCollectionId,
      ID.unique(),
      {
        creator: post.creator,
        description: post.description,
        image: imageUrl ? imageUrl : null,
        attachment: post.attachment ? post.attachment : null,
        category: post.category,
        Title: post.Title,
      }
    );

    if (!newPost) {
      throw Error;
    }

    await axios.post("http://localhost:3000/", {
      creator: post.creatorname,
      title: post.Title,
    });

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
