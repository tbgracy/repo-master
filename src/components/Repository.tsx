import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useGithubApi } from "../hooks/useGithubApi";

type RepositoryProps = {
  repo: Repository;
};

export const Repository = (props: RepositoryProps) => {
  const { repo } = props;

  const { toggleVisibility } = useGithubApi();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: toggleVisibility,
    onSuccess: (repo: Repository) => {
      queryClient.setQueryData(
        ["fetchRepositories"],
        (oldData: Repository[]) => {
          return oldData.map((r) => (r.id === repo.id ? repo : r));
        }
      );
    },
  });

  if (mutation.error) {
  }

  return (
    <article
      className={`w-full relative space-y-2 bg-white shadow-sm rounded-lg px-6 py-4 md:h-[10rem] overflow-y-scroll ${
        mutation.isPending && "cursor-wait"
      }`}
    >
      {mutation.error && (
        <p className="text-sm text-red-500">{mutation.error.message}</p>
      )}
      <h1 className="font-bold text-teal-600 w-[80%] text-ellipsis">
        {repo.name}
      </h1>
      <ul className="flex gap-2 w-full flex-wrap">
        {repo.topics.map((t, k) => (
          <li
            key={k}
            className="bg-teal-100 text-teal-800 w-fit px-2 py-1 rounded-full text-sm"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="text-sm">{repo.description}</p>
      <button
        className={`absolute bg-teal-600 text-white p-2 rounded right-2 top-0 w-8 h-8 ${
          mutation.isPending && "bg-gray-400"
        }`}
        title={repo.private ? "Make public" : "Make private"}
        onClick={() => mutation.mutate(repo)}
      >
        {mutation.isPending ? "..." : repo.private ? <FaEyeSlash /> : <FaEye />}
      </button>
    </article>
  );
};

export const RepositorySkeleton = () => {
  return (
    <article className="w-full relative space-y-2 bg-white shadow-sm rounded-lg px-6 py-4 cursor-wait">
      <div className="w-[40%] h-[1rem] bg-gray-300 rounded animate-pulse" />
      <ul className="flex gap-2">
        <li className="w-[5rem] h-[1rem] bg-gray-300 rounded animate-pulse"></li>
        <li className="w-[8rem] h-[1rem] bg-gray-300 rounded animate-pulse"></li>
        <li className="w-[3rem] h-[1rem] bg-gray-300 rounded animate-pulse"></li>
      </ul>
      <div className="w-full h-[2rem] bg-gray-300 rounded animate-pulse" />
    </article>
  );
};
