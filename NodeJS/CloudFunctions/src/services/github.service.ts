import type { GitHubIssuePayload } from "../interfaces/issues-event";
import type { GitHubStarPayload } from "../interfaces/start-event";

export const createEventMessage = (githubEvent: string, payload: any): string => {
  if (githubEvent === "star") return onStart(payload);
  if (githubEvent === "issues") return onIssues(payload);

  return `Unhandled GitHub event: ${githubEvent}`;
};

const onStart = ({ sender, repository, action }: GitHubStarPayload): string => {
  const userStart = sender.login;
  const repositoryName = repository.full_name;

  return `${userStart} ${action} a start on ${repositoryName}`;
};

const onIssues = ({ action, issue, repository, sender }: GitHubIssuePayload): string => {
  const userStart = sender.login;
  const repositoryName = repository.full_name;
  const issueTitle = issue.title;

  return `${userStart} ${action} an issue named ${issueTitle} on ${repositoryName}`;
};
