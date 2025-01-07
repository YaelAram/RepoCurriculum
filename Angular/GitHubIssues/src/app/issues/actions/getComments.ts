import { environment } from '../../../environments/environment.development';
import { GitHubIssue } from '../interfaces/issue';

const baseUrl = environment.baseUrl;
const token = environment.token;

export const getComments = async (issueId: string) => {
  try {
    const resp = await fetch(`${baseUrl}/issues/${issueId}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw `Can't load issue's comments: ${resp.statusText}`;

    const comments = (await resp.json()) as GitHubIssue[];
    return comments;
  } catch (error: any) {
    throw `Can't load issue's comments with id ${issueId}`;
  }
};
