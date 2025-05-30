import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../../interfaces/navbar.';

@Component({
  selector: 'shared-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public readonly navItems = computed<NavItem[]>(() => [
    { icon: '/city_icon.svg', title: 'Capital', url: '/by-capital' },
    { icon: '/flag_icon.svg', title: 'Country', url: '/by-country' },
    { icon: '/globe_icon.svg', title: 'Region', url: '/by-region' },
  ]);
}
