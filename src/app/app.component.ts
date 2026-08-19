import { Component, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { MaterialModule } from './material/material.module';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(18px)' })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('350ms 150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isDark = true;
  scrollPct = 0;
  isMobile = false;

  readonly navItems = [
    { label: 'Home',         icon: 'home',         route: '/home' },
    { label: 'About',        icon: 'person',        route: '/about' },
    { label: 'Skills',       icon: 'code',          route: '/skills' },
    { label: 'Experience',   icon: 'work',          route: '/experience' },
    { label: 'Education',    icon: 'school',        route: '/education' },
    { label: 'Achievements', icon: 'emoji_events',  route: '/achievements' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('dark-theme');
      this.breakpointObserver.observe('(max-width: 768px)').subscribe(result => {
        this.isMobile = result.matches;
      });
    }
  }

  onNavClick(): void {
    if (this.isMobile) this.sidenav.close();
  }

  onContentScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const total = el.scrollHeight - el.clientHeight;
    this.scrollPct = total > 0 ? (el.scrollTop / total) * 100 : 0;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', this.isDark);
      document.body.classList.toggle('light-theme', !this.isDark);
    }
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['animation'] ?? '';
  }
}
