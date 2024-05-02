import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/QueriesAndMutations";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between items-center px-12 mt-8">
        <span className="text-pink font-semibold ">{user.username}</span>
        <Button
          variant="ghost"
          className="shad-button_ghost "
          onClick={() => {
            signOut();
          }}
        >
          LogOut
        </Button>
      </div>
      <section className="bg-primary px-5 lg:px-12 pt-12">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
