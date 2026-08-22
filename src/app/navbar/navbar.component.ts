import {
  Component, Input, Output, EventEmitter, OnDestroy,
  PLATFORM_ID, Inject, afterNextRender, ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  @Input() isDark = true;
  @Output() themeToggle = new EventEmitter<void>();

  scrolled  = false;
  menuOpen  = false;
  activeSection = 'home';
  scrollPct = 0;

  readonly navItems = [
    { label: 'Home',         id: 'home'         },
    { label: 'About',        id: 'about'        },
    { label: 'Skills',       id: 'skills'       },
    { label: 'Experience',   id: 'experience'   },
    { label: 'Education',    id: 'education'    },
    { label: 'Achievements', id: 'achievements' },
  ];

  private scrollHandler: (() => void) | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => this.initScroll());
  }

  private initScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.scrollHandler = () => {
      const scrollY = window.scrollY;
      this.scrolled = scrollY > 60;

      const total = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollPct = total > 0 ? (scrollY / total) * 100 : 0;

      this.updateActiveSection();
      this.cdr.detectChanges();
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private updateActiveSection(): void {
    const offset = window.innerHeight * 0.35;
    const sections = this.navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].getBoundingClientRect().top <= offset) {
        this.activeSection = sections[i].id;
        return;
      }
    }
    this.activeSection = 'home';
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.menuOpen = false;
  }
}
