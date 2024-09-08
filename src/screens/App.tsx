import { useEffect, useState } from "react";

import { useAuth } from "../AuthProvider";
import { Repository, RepositorySkeleton } from "../components/Repository";

import { useGithubApi } from "../hooks/useGithubApi";

export const App = () => {
  const { session } = useAuth()!;

  const [isLoading, setIsLoading] = useState(true);
  const { repositories, fetchRepositories } = useGithubApi();

  useEffect(() => {
    if (isLoading && session != null) {
      fetchRepositories().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading, session]);

  return (
    <section className="sm:space-y-4 md:space-y-0 p-4 flex-grow overflow-y-scroll md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:max-w-[1980px] mx-auto">
      {isLoading
        ? Array.from({ length: 9 }, (_, i) => <RepositorySkeleton key={i} />)
        : repositories.map((r) => <Repository key={r.id} repo={r} />)}
    </section>
  );
};
