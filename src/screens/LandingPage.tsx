import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/app");
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <h1 className="font-bold text-4xl">
        Spend less time toggling <br /> your repository's visibility
      </h1>
      <p>RVT help you do just that.</p>
      <Button
        className="bg-teal-600 rounded-lg py-3 px-6 text-white"
        onClick={handleClick}
      >
        Login with your Github account to try it.
      </Button>
    </div>
  );
};
