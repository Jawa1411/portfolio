import { Component, afterNextRender } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';
import { IEducation } from '../core/models/resume.models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  education = this.data.education;
  displayScores: Record<number, string> = {};

  constructor(private data: ResumeDataService) {
    this.education.forEach((_, i) => this.displayScores[i] = '0');
    afterNextRender(() => this.initRevealAndCounters());
  }

  formatScore(edu: IEducation): string {
    return edu.scoreType === 'percentage' ? `${edu.score}%` : `${edu.score} CGPA`;
  }

  private initRevealAndCounters(): void {
    // Reveal animation
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Timeline draw
    const line = document.querySelector<HTMLElement>('.timeline-line');
    if (line) {
      const lo = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { line.classList.add('draw'); lo.unobserve(e.target); } });
      }, { threshold: 0.05 });
      lo.observe(line);
    }

    // Score counters
    const cards = document.querySelectorAll<HTMLElement>('.edu-card');
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-index') ?? '0', 10);
          this.animateCounter(idx);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => counterObs.observe(card));
  }

  private animateCounter(index: number): void {
    const edu = this.education[index];
    const target = parseFloat(edu.score);
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(2);
      this.displayScores[index] =
        edu.scoreType === 'percentage' ? `${current}%` : `${current} CGPA`;

      if (progress < 1) requestAnimationFrame(tick);
      else this.displayScores[index] = this.formatScore(edu);
    };

    requestAnimationFrame(tick);
  }
}
