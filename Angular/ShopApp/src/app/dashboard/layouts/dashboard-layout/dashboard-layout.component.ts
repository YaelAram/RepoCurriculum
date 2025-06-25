import { Component, computed } from '@angular/core';

import { BaseLayoutComponent } from '@shared/components/base-layout/base-layout.component';
import { NavItem } from '@shared/interfaces/navitem';

@Component({
  selector: 'dashboard-layout',
  imports: [BaseLayoutComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  readonly navItems = computed<NavItem[]>(() => [
    { title: 'Products', url: '/management/products', icon: 'list' },
    { title: 'Create Product', url: '/management/create-product', icon: 'assignment_add' },
  ]);
}
