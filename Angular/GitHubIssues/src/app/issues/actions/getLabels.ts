import { environment } from '../../../environments/environment.development';
import type { GitHubLabelResp } from '../interfaces/label';

const baseUrl = environment.baseUrl;
const token = environment.token;

export const getLabels = async () => {
  try {
    const resp = await fetch(`${baseUrl}/labels`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw `Error: (${resp.status}) ${resp.statusText}`;

    const labels = (await resp.json()) as GitHubLabelResp[];
    return labels.map(({ color, description, id, name }) => ({
      color: `#${color}`,
      description: description || 'No description provided',
      id,
      name,
    }));
  } catch (error: any) {
    throw `Can't load labels: ${error.message}`;
  }
};
