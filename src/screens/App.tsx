import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Repository, RepositorySkeleton } from "../components/Repository";

import { useAuth } from "../AuthProvider";

import noResultImage from "../assets/void.svg";

import { useGithubApi } from "../hooks/useGithubApi";
import { Searchbar } from "../components/Searchbar";
import { useSearchbar } from "../hooks/useSearchbar";

export const App = () => {
  const { session } = useAuth()!;
  if (!session) return <Navigate to="/" />;

  const { fetchRepositories } = useGithubApi();

  const { error, data } = useQuery({
    queryKey: ["fetchRepositories"],
    queryFn: fetchRepositories,
  });

  const { filter, handleTyping, handleSelect } = useSearchbar();

  let content = Array.from({ length: 9 }, (_, i) => (
    <RepositorySkeleton key={i} />
  ));

  if (data) {
    if (!filter.keyword && !filter.type) {
      content = data!.map((r) => <Repository key={r.id} repo={r} />);
    } else {
      let filteredData: Repository[] = [];
      filteredData = data
        .filter((r) =>
          r.name.toLowerCase().includes(filter.keyword.toLowerCase())
        )
        .filter((r) => {
          switch (filter.type) {
            case "archived":
              return r.archived;
            case "private":
              return r.private;
            case "public":
              return !r.private;
            case undefined:
              return true;
          }
        });

      content = filteredData.map((r) => <Repository key={r.id} repo={r} />);
    }
  }

  return (
    <>
      <Searchbar onSelect={handleSelect} onTyping={handleTyping} />
      <section
        className={`space-y-4 w-full md:space-y-0 p-4 flex-grow overflow-y-scroll 
      md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:max-w-[1980px] mx-auto`}
      >
        {error && <p>{error.message}</p>}
        {content.length >= 1 ? content : <EmptyResult />}
      </section>
    </>
  );
};

const EmptyResult = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <img src={noResultImage} className="size-[10rem]" />
      <p>No repository found.</p>
    </div>
  );
};
