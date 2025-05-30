import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
