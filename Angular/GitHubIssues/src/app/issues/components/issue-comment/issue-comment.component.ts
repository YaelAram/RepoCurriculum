import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { GitHubIssue } from '../../interfaces/issue';

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCommentComponent {
  issue = input.required<GitHubIssue>();
}
