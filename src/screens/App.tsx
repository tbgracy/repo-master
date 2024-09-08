import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Repository, RepositorySkeleton } from "../components/Repository";

import { useAuth } from "../AuthProvider";

import { useGithubApi } from "../hooks/useGithubApi";

export const App = () => {
  const { session } = useAuth()!;
  if (!session) return <Navigate to="/" />;

  const { fetchRepositories } = useGithubApi();

  const { error, data } = useQuery({
    queryKey: ["fetchRepositories"],
    queryFn: fetchRepositories,
  });

  let content = Array.from({ length: 9 }, (_, i) => (
    <RepositorySkeleton key={i} />
  ));

  if (data) {
    content = data!.map((r) => <Repository key={r.id} repo={r} />);
  }

  return (
    <section
      className={`space-y-4 md:space-y-0 p-4 flex-grow overflow-y-scroll 
                  md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:max-w-[1980px] mx-auto`}
    >
      {error && <p>{error.message}</p>}
      {content}
    </section>
  );
};
