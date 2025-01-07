import { computed, Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { getIssues } from '../actions/getIssues';
import { getLabels } from '../actions/getLabels';
import { State } from '../interfaces/issue';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  #currentState = signal<State>(State.All);
  state = computed(() => this.#currentState());

  #currentLabels = signal<Set<string>>(new Set());
  labels = computed(() => this.#currentLabels());

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.#currentState(),
        labels: [...this.#currentLabels()],
      },
    ],
    queryFn: () => getIssues(this.#currentState(), [...this.#currentLabels()]),
  }));

  setState(state: State) {
    this.#currentState.set(state);
  }

  toggleLabel(label: string) {
    const newLabels = new Set(this.#currentLabels());

    if (newLabels.has(label)) newLabels.delete(label);
    else newLabels.add(label);

    this.#currentLabels.set(newLabels);
  }
}
