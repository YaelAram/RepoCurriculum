import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
