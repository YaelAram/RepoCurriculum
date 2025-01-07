import { environment } from '../../../environments/environment.development';
import { GitHubIssue, State } from '../interfaces/issue';

const baseUrl = environment.baseUrl;
const token = environment.token;

export const getIssues = async (
  state: State = State.All,
  labels: string[] = [],
) => {
  try {
    const params = new URLSearchParams({ state });
    if (labels.length > 0) params.append('labels', labels.join(','));

    const resp = await fetch(`${baseUrl}/issues?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw `Error: (${resp.status}) ${resp.statusText}`;

    const issues = (await resp.json()) as GitHubIssue[];
    return issues;
  } catch (error: any) {
    throw `Can't load issues: ${error.message}`;
  }
};
