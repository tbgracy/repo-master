import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export const Navbar = () => {
  const auth = useAuth();
  const session = auth!.session;
  const signOut = auth!.signOut;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignout = () => {
    setIsLoading(true);
    signOut().then(() => {
      setIsLoading(false);
    });
  };

  return (
    <nav className="w-full bg-white shadow-lg p-3 flex items-center justify-between">
      <h1
        className="text-teal-600 font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Repo Visibility Toggler
      </h1>
      {session && (
        <div className="flex gap-4">
          <Button
            className={`text-teal-600 ${!isLoading && "hover:underline"} ${
              isLoading && "text-gray-500 cursor-not-allowed"
            }`}
            disabled={isLoading}
            onClick={handleSignout}
          >
            Sign out
          </Button>
          <img
            src={session?.user.user_metadata["avatar_url"]}
            alt=""
            className="size-[3rem] rounded-[50%]"
          />
        </div>
      )}
    </nav>
  );
};
