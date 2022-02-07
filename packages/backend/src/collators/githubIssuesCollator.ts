import { IndexableDocument, DocumentCollator } from '@backstage/search-common';
import fetch from 'cross-fetch';

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
        const baseUrl = 'https://api.github.com/repos/backstage/backstage';
        const results = await fetch(`${baseUrl}/issues`);
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