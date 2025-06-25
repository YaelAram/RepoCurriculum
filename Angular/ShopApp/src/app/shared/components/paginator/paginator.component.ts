import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'shared-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  readonly count = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly page = input.required<number>();
  readonly pageSizeOptions = input<number[]>();

  readonly pageChange = output<PageEvent>();

  handlePageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
