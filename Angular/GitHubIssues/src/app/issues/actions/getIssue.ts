import { environment } from '../../../environments/environment.development';
import { GitHubIssue } from '../interfaces/issue';

const baseUrl = environment.baseUrl;
const token = environment.token;

export const getIssue = async (issueId: string) => {
  try {
    const resp = await fetch(`${baseUrl}/issues/${issueId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw `Can't load issues info: ${resp.statusText}`;

    const issue = (await resp.json()) as GitHubIssue;
    return issue;
  } catch (error: any) {
    throw `Can't load issue info with id ${issueId}`;
  }
};
