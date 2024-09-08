import { useState } from "react";
import { Octokit } from "@octokit/core";

import { useAuth } from "../AuthProvider";

export const useGithubApi = () => {
    const { session } = useAuth()!;
    const [repositories, setRepositories] = useState<Repository[]>([]);

    const toggleVisibility = async (repo: Repository) => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        await octokit
            .request(`PATCH /repos/{owner}/{repo}`, {
                owner: session?.user.user_metadata.preferred_username,
                repo: repo.name,
                private: !repo.private,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
    };

    const fetchRepositories = async () => {
        const octokit = new Octokit({
            auth: session?.provider_token,
        });

        const res = await octokit
            .request("GET /user/repos?per_page=100", {
                headers: {
                    "X-Github-Api-Version": "2022-11-28",
                },
            })

        if (res.status === 200) {
            setRepositories(res.data as Repository[])
        }
        else {
            console.log(res);
        }

    }

    return { toggleVisibility, fetchRepositories, repositories }
}