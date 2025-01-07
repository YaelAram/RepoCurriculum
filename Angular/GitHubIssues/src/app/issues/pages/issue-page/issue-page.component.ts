import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-page',
  standalone: true,
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {
  id = input.required<string>();
  #issueService = inject(IssueService);
  issue = this.#issueService.issueQuery;
  comments = this.#issueService.commentsQuery;

  setIssueId = effect(() => this.#issueService.setIssueId(this.id()), {
    allowSignalWrites: true,
  });
}
