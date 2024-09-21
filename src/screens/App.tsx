import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Repository, RepositorySkeleton } from "../components/Repository";
import { ResultCount } from "../components/ResultCount";
import { Searchbar } from "../components/Searchbar";

import { useAuth } from "../AuthProvider";

import { useGithubApi } from "../hooks/useGithubApi";
import { useSearchbar } from "../hooks/useSearchbar";

import noResultImage from "../assets/void.svg";

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
      <ResultCount filter={filter} contentCount={content.length} />
      {content.length >= 1 ? (
        <section
          className={`space-y-4 w-full md:space-y-0 p-4 flex-grow overflow-y-scroll 
      md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:max-w-[1980px] mx-auto`}
        >
          {error && <p>{error.message}</p>}
          {content}
        </section>
      ) : (
        <EmptyResult />
      )}
    </>
  );
};

const EmptyResult = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={noResultImage} className="size-[10rem]" />
      <p>No repository found.</p>
    </div>
  );
};
