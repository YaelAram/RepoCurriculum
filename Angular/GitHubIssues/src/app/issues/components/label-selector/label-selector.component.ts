import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GitHubLabel } from '../../interfaces/label';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issue-label-selector',
  standalone: true,
  imports: [],
  templateUrl: './label-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelSelectorComponent {
  #issuesService = inject(IssuesService);
  labels = input.required<GitHubLabel[]>();

  isActive(label: string) {
    return this.#issuesService.labels().has(label);
  }

  toggle(label: string) {
    this.#issuesService.toggleLabel(label);
  }
}
