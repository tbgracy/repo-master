import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export const LandingPage = () => {
  const { signIn, session } = useAuth()!;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 h-full">
      <h1 className="font-bold text-4xl">
        Spend less time toggling <br /> your repository's visibility
      </h1>
      <p>RVT help you do just that.</p>
      {!session ? (
        <button
          className="bg-teal-600 rounded-lg py-3 px-6 text-white"
          onClick={() => signIn()}
        >
          Login with your Github account to try it.
        </button>
      ) : (
        <button
          className="bg-teal-600 rounded-lg py-3 px-6 text-white"
          onClick={() => navigate("/app")}
        >
          Try it
        </button>
      )}
    </div>
  );
};
