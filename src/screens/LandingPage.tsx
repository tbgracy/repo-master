import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import { supabase } from "../supabase";
import { useSession } from "../hooks/useSession";
import { useErrorMessage } from "../hooks/useErrorMessage";

export const LandingPage = () => {
  const session = useSession();
  const setErrorMessage = useErrorMessage();
  const [loading, setIsLoading] = useState(false);

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    setErrorMessage(error?.message);
  };

  const handleClick = () => {
    setIsLoading(true);
    signInWithGithub().then(() => {
      setIsLoading(false);
    });
  };

  if (session) return <Navigate to="/app" />;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-4 ${
        loading && "cursor-wait"
      }`}
    >
      <h1 className="font-bold text-4xl">
        Spend less time toggling <br /> your repository's visibility
      </h1>
      <p>RVT help you do just that.</p>
      <Button
        className={`bg-teal-600 rounded-lg py-3 px-6 text-white ${
          loading && "bg-gray-400"
        }`}
        disabled={loading}
        onClick={handleClick}
      >
        Login with your Github account to try it.
      </Button>
    </div>
  );
};
