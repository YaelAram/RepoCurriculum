import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IssueSelectorComponent } from '../../components/issue-selector/issue-selector.component';
import { LabelSelectorComponent } from '../../components/label-selector/label-selector.component';
import { State } from '../../interfaces/issue';
import { IssuesService } from '../../services/issues.service';

const states = {
  all: State.All,
  open: State.Open,
  closed: State.Closed,
};

@Component({
  selector: 'issues-page',
  standalone: true,
  imports: [LabelSelectorComponent, IssueSelectorComponent],
  templateUrl: './issues-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesPageComponent {
  #issuesService = inject(IssuesService);
  labelsQuery = this.#issuesService.labelsQuery;
  issuesQuery = this.#issuesService.issuesQuery;

  state = this.#issuesService.state;

  setState(state: 'all' | 'open' | 'closed') {
    this.#issuesService.setState(states[state]);
  }
}
