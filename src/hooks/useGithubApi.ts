import { Octokit } from "octokit"

import { useAuth } from "../AuthProvider";

export const useGithubApi = () => {
    const { session } = useAuth()!;

    const toggleArchive = async (repo: Repository) => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const result = await octokit.rest.repos.update({
            owner: session?.user.user_metadata.preferred_username,
            repo: repo.name,
            archived: !repo.archived,
        })

        return result.data as Repository
    }

    const toggleVisibility = async (repo: Repository) => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const result = await octokit.rest.repos.update({
            owner: 'tbgracy',
            repo: repo.name,
            visibility: repo.private ? 'public' : "private"
        })

        return result.data as Repository
    };

    const fetchRepositories = async () => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const result = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser)

        return result as Repository[]
    }

    return { toggleVisibility, toggleArchive, fetchRepositories }
}