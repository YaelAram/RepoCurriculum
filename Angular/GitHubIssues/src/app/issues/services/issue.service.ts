import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { getComments } from '../actions/getComments';
import { getIssue } from '../actions/getIssue';
import { GitHubIssue } from '../interfaces/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  #issueId = signal<string | null>(null);
  #queryClient = injectQueryClient();

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueId()],
    queryFn: () => getIssue(this.#issueId()!),
    enabled: !!this.#issueId(),
  }));

  commentsQuery = injectQuery(() => ({
    queryKey: ['comments', this.#issueId()],
    queryFn: () => getComments(this.#issueId()!),
    enabled: !!this.#issueId(),
  }));

  setIssueId(id: string) {
    this.#issueId.set(id);
  }

  prefetchIssueComments(issueId: string) {
    this.#queryClient.prefetchQuery({
      queryKey: ['comments', issueId],
      queryFn: () => getComments(issueId),
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.#queryClient.setQueryData(['issue', `${issue.number}`], issue, {
      updatedAt: Date.now() + 60 * 1000 * 5,
    });
  }
}
