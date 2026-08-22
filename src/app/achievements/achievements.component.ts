import { Component, afterNextRender, ElementRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  achievements = this.data.achievements;

  readonly icons: Record<string, string | undefined> = {
    'Dashing Debut Award': 'rocket_launch',
    'Rising Star Award':   'star',
    'ACE Award':           'military_tech',
  };

  constructor(private data: ResumeDataService, private el: ElementRef) {
    afterNextRender(() => this.initReveal());
  }

  private initReveal(): void {
    const root  = this.el.nativeElement as HTMLElement;
    const cards = root.querySelectorAll<HTMLElement>('.award-card');

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    cards.forEach(c => observer.observe(c));

    const header = root.querySelector('.section-header');
    if (header) {
      const ho = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in-view'); ho.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      ho.observe(header);
    }
  }
}
