import NewsCard from "@/components/NewsCard";
import { useGetUserNews } from "../../lib/react-query/QueriesAndMutations";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormNews from "@/components/FormNew";

const Home = () => {
  const { user } = useUserContext();
  const {
    data: news,
    isLoading: isNewsLoading,
    isError: isErrorPosts,
  } = useGetUserNews(user.id);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-lg text-left w-full flex items-center gap-x-4 ">
        <span>Home Feed </span>
        <Dialog onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <span
              className="rounded-full bg-pink p-1 cursor-pointer"
              onClick={openModal}
            >
              <Plus className="w-4 h-4" />
            </span>
          </DialogTrigger>
          <DialogContent className="max-h-[90%] overflow-x-auto">
            <DialogHeader>
              <DialogTitle>Create News</DialogTitle>
              <DialogDescription>
                Fill in the form below to create news
              </DialogDescription>
            </DialogHeader>
            <FormNews />
          </DialogContent>
        </Dialog>
      </h2>
      <div className="w-full mt-8">
        {isNewsLoading && !news ? (
          <span>Loading ...</span>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {news?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center w-full">
                <NewsCard news={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
