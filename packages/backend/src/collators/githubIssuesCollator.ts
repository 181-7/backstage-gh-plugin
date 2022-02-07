import { IndexableDocument, DocumentCollator } from '@backstage/search-common';
import fetch from 'cross-fetch';

const BASE_URL = 'https://api.github.com/repos/backstage/backstage';
export interface GithubIssueDocument extends IndexableDocument {
    author: string;
    avatar: string;
}

type GithubIssue = {
    title: string
    html_url: string,
    body: string,
    user: {
        login: string,
        avatar_url: string
    }
};

export class GithubIssuesCollator implements DocumentCollator {
    public readonly type: string = 'github-issue';

    async execute() {
        const results = await fetch(`${BASE_URL}/issues`);
        const data = await results.json();

        return data.map(
            (issue: GithubIssue): GithubIssueDocument => {
                return {
                    title: issue.title,
                    location: issue.html_url,
                    text: issue.body,
                    author: issue.user.login,
                    avatar: issue.user.avatar_url
                };
            }
        );
    }
}