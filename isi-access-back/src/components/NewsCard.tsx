import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDeleteNews } from "@/lib/react-query/QueriesAndMutations";
import { Trash } from "lucide-react";

interface NewsCardProps {
  news: Models.Document;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { mutate: deleteNews } = useDeleteNews();
  const handleDeletePost = () => {
    deleteNews(news.$id);
  };
  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={news.creator?.avatar}
            alt="creator"
            className="w-12 lg:h-12 rounded-full"
          />

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:body-bold text-light-1">
              {news.creator.username}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%] ">
                {multiFormatDateString(news.$createdAt)}
              </p>
            </div>
          </div>
        </div>
        <Trash
          onClick={handleDeletePost}
          className="w-5 h-5 text-destructive cursor-pointer"
        />
      </div>
      {news.image && (
        <img
          src={news.image}
          alt="post image"
          className="h-64 my-4 w-full rounded-[24px] object-cover mb-5"
        />
      )}

      <h1 className="mt-4 flex justify-between items-center font-bold">
        <span>{news.Title}</span>{" "}
        <span className="text-sm font-semibold text-secondary-300">
          #{news.category}
        </span>
      </h1>
      <p className="mt-1 text-sm text-gray-300">{news.description}</p>
      <Button className="bg-secondary-200 hover:bg-secondary-200/90 text-black-200 mt-6">
        <Link to={news.attachment} target="_blank">
          Read More
        </Link>
      </Button>
    </div>
  );
};

export default NewsCard;
