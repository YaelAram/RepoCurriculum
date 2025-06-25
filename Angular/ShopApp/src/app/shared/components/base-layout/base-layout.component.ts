import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

import { AuthService } from '@auth/services/auth.service';
import { NavItem } from '@shared/interfaces/navitem';

@Component({
  selector: 'shared-base-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    MatSidenavModule,
    MatNavList,
    MatButtonModule,
  ],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css',
})
export class BaseLayoutComponent {
  private readonly authService = inject(AuthService);

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly breakpointChange = toSignal(this.breakpointObserver.observe(['(max-width: 800px)']));

  readonly isMobile = linkedSignal<boolean>(() => this.breakpointChange()?.matches ?? false);
  readonly isCollapsed = signal<boolean>(true);

  readonly title = input.required<string>();
  readonly navItems = input.required<NavItem[]>();

  readonly isAutheticated = computed(() => this.authService.authStatus() === 'authenticated');
  readonly isAdmin = computed(() => this.authService.user()?.roles.includes('admin'));
  readonly userName = computed(() => this.authService.user()?.fullName ?? '');
  readonly buttonAction = computed(() => (this.isAutheticated() ? 'Log Out' : 'Log In'));

  logOut(): void {
    this.authService.logOut();
  }

  toggle(sidenav: MatSidenav): void {
    if (this.isMobile()) {
      sidenav.toggle();
      this.isCollapsed.set(false);
    } else {
      sidenav.open();
      this.isCollapsed.update((prev) => !prev);
    }
  }
}
