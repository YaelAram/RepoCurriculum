import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces/issue';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-chip',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './issue-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueChipComponent {
  #issueService = inject(IssueService);
  issue = input.required<GitHubIssue>();
  isOpen = computed(() => this.issue().state === State.Open);

  prefetch() {
    this.#issueService.setIssueData(this.issue());
    this.#issueService.prefetchIssueComments(`${this.issue().number}`);
  }
}
