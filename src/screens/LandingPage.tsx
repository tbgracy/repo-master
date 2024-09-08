import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export const LandingPage = () => {
  const { signIn, session } = useAuth()!;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 h-full">
      <h1 className="font-bold text-4xl">
        Effortlessly manage <br /> your github repositories
      </h1>
      <p>Archive a repository or toggle its visibility in one click 😉.</p>
      {!session ? (
        <button
          className="bg-teal-600 rounded-lg py-3 px-6 text-white"
          onClick={() => signIn()}
        >
          Sign in with your Github account to try it.
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
