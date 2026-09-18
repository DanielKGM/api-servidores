import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { filter } from 'rxjs';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    BreadcrumbModule,
    ButtonModule,
    ConfirmDialog,
    MenuModule,
    ToastModule,
    ToolbarModule,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly navigationItems: MenuItem[] = [
    {
      label: 'Secretarias',
      icon: 'pi pi-sitemap',
      routerLink: '/secretarias',
      title: 'Secretarias',
    },
    {
      label: 'Servidores',
      icon: 'pi pi-users',
      routerLink: '/servidores',
      title: 'Servidores',
    },
  ];

  sidebarCollapsed = false;
  breadcrumbItems: MenuItem[] = [];
  menuItems: MenuItem[] = [];

  readonly breadcrumbHome: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/secretarias',
  };

  constructor() {
    this.updateNavigation(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.updateNavigation(event.urlAfterRedirects));
  }

  private updateNavigation(url: string): void {
    const path = url.split(/[?#]/)[0];
    this.menuItems = this.navigationItems.map((item) => ({
      ...item,
      styleClass: path.startsWith(String(item.routerLink)) ? 'layout-menu-item-active' : undefined,
    }));
    this.updateBreadcrumb(path);
  }

  private updateBreadcrumb(url: string): void {
    const segments = url.split(/[?#]/)[0].split('/').filter(Boolean);
    const entity = segments[0];

    if (entity === 'servidores') {
      this.breadcrumbItems = this.buildBreadcrumb(
        'Servidores',
        'servidor',
        '/servidores',
        segments,
      );
      return;
    }

    this.breadcrumbItems = this.buildBreadcrumb(
      'Secretarias',
      'secretaria',
      '/secretarias',
      segments,
    );
  }

  private buildBreadcrumb(
    label: string,
    singular: string,
    routerLink: string,
    segments: string[],
  ): MenuItem[] {
    const items: MenuItem[] = [{ label, routerLink }];

    if (segments[1] === 'novo') {
      items.push({ label: `Novo ${singular}` });
    } else if (segments[2] === 'editar') {
      items.push({ label: `Editar ${singular}` });
    }

    return items;
  }
}
