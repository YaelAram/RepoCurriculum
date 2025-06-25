import { Component, computed } from '@angular/core';

import { BaseLayoutComponent } from '@shared/components/base-layout/base-layout.component';
import { NavItem } from '@shared/interfaces/navitem';

@Component({
  selector: 'shop-layout',
  imports: [BaseLayoutComponent],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.css',
})
export default class ShopLayoutComponent {
  readonly navItems = computed<NavItem[]>(() => [
    { title: 'Home', url: '/', icon: 'house' },
    { title: 'Male Section', url: '/gender/men', icon: 'man' },
    { title: 'Female Section', url: '/gender/women', icon: 'woman' },
    { title: 'Kids Section', url: '/gender/kid', icon: 'smart_toy' },
  ]);
}
