import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export const LandingPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    auth?.signIn();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 h-full">
      <h1 className="font-bold text-4xl">
        Spend less time toggling <br /> your repository's visibility
      </h1>
      <p>RVT help you do just that.</p>
      {!auth?.session ? (
        <button
          className="bg-teal-600 rounded-lg py-3 px-6 text-white"
          onClick={handleClick}
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
