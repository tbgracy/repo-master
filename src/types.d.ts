declare global {
    export type Repository = {
        id: number,
        name: string,
        description: string,
        private: boolean,
        html_url: string,
        forks_count: number,
        stargazers_count: number,
        topics: string[],
        archived: boolean,
    }
}

export { }