import {
  Client,
  Account,
  Databases,
  Storage,
  Avatars,
  Messaging,
} from "appwrite";

export const appwriteConfig = {
  projectId: "66317412002e821ec18e",
  url: "https://cloud.appwrite.io/v1",
  databaseId: "6631789b002b1eb706ef",
  storageId: "66317c1f0035b93e6bd1",
  userCollectionId: "663178e0002b75371f8c",
  newsCollectionId: "66317919001267be0411",
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const messages = new Messaging(client);
