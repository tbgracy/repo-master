import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbArchive, TbArchiveOff } from "react-icons/tb";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGithubApi } from "../hooks/useGithubApi";

type RepositoryProps = {
  repo: Repository;
};

export const Repository = (props: RepositoryProps) => {
  const { repo } = props;

  const { toggleVisibility, toggleArchive } = useGithubApi();

  const queryClient = useQueryClient();

  const {
    error: visibilityError,
    isPending: isVisibilityPending,
    mutate: mutateVisibility,
  } = useMutation({
    mutationFn: toggleVisibility,
    onSuccess: (updatedRepo: Repository) => {
      queryClient.setQueryData(
        ["fetchRepositories"],
        (oldData: Repository[]) => {
          return oldData.map((oldDataRepo) =>
            oldDataRepo.id === updatedRepo.id ? updatedRepo : oldDataRepo
          );
        }
      );
    },
  });

  const {
    error: archiveError,
    isPending: isArchivingPending,
    mutate: mutateArchive,
  } = useMutation({
    mutationFn: toggleArchive,
    onSuccess: (updatedRepo: Repository) => {
      queryClient.setQueryData(
        ["fetchRepositories"],
        (oldData: Repository[]) => {
          return oldData.map((oldDataRepo) =>
            oldDataRepo.id === updatedRepo.id ? updatedRepo : oldDataRepo
          );
        }
      );
    },
  });

  return (
    <article
      className={`w-full relative space-y-2 bg-white shadow-sm rounded-lg px-6 py-4 md:h-[10rem] overflow-y-scroll ${
        isVisibilityPending && "cursor-wait"
      }`}
    >
      {(visibilityError || archiveError) && (
        <>
          <p className="text-sm text-red-500">{visibilityError?.message}</p>
          <p className="text-sm text-red-500">{archiveError?.message}</p>
        </>
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
      <div className="absolute right-2 top-0 space-x-2">
        <button
          className={`bg-teal-600 text-white p-2 rounded w-8 h-8 ${
            isVisibilityPending && "bg-gray-400 cursor-waiting"
          }`}
          title={repo.archived ? "Unvarchive" : "Archive"}
          onClick={() => mutateArchive(repo)}
        >
          {isArchivingPending ? (
            "..."
          ) : repo.archived ? (
            <TbArchive />
          ) : (
            <TbArchiveOff />
          )}
        </button>
        <button
          className={`bg-teal-600 text-white p-2 rounded w-8 h-8 ${
            isVisibilityPending && "bg-gray-400 cursor-waiting"
          }`}
          title={repo.private ? "Make public" : "Make private"}
          onClick={() => mutateVisibility(repo)}
        >
          {isVisibilityPending ? (
            "..."
          ) : repo.private ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>
      </div>
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
