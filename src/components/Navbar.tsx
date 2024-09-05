import { Button } from "@chakra-ui/react";
import { useSession } from "../hooks/useSession";
import { supabase } from "../supabase";
import { useErrorMessage } from "../hooks/useErrorMessage";

export const Navbar = () => {
  const session = useSession();
  const setErrorMessage = useErrorMessage();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setErrorMessage(error?.message);
  }

  return (
    <nav className="w-full bg-white shadow-lg p-3 flex items-center justify-between">
      <h1 className="text-teal-600 font-bold text-xl">
        Repo Visibility Toggler
      </h1>
      {session && (
        <div className="flex gap-4">
          <Button onClick={signOut}>Sign out</Button>
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
