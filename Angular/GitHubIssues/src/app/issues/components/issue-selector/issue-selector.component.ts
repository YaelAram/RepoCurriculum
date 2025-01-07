import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces/issue';
import { IssueChipComponent } from '../issue-chip/issue-chip.component';

@Component({
  selector: 'issue-issue-selector',
  standalone: true,
  imports: [IssueChipComponent],
  templateUrl: './issue-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueSelectorComponent {
  issues = input.required<GitHubIssue[]>();
}
