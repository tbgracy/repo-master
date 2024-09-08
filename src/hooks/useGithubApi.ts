import { Octokit } from "@octokit/core";

import { useAuth } from "../AuthProvider";

export const useGithubApi = () => {
    const { session } = useAuth()!;

    const toggleVisibility = async (repo: Repository) => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const result = await octokit
            .request(`PATCH /repos/{owner}/{repo}`, {
                owner: session?.user.user_metadata.preferred_username,
                repo: repo.name,
                visibility: repo.private ? "public" : "private",
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });

        return result.data as Repository
    };

    const fetchRepositories = async () => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const ITEM_PER_PAGE = 100

        const result = await octokit
            .request(`GET /user/repos?per_page=${ITEM_PER_PAGE}`, {
                headers: {
                    "X-Github-Api-Version": "2022-11-28",
                },
            })

        return result.data as Repository[]
    }

    return { toggleVisibility, fetchRepositories }
}