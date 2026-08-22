import { Component, afterNextRender, ElementRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skillGroups = this.data.skillGroups;

  constructor(private data: ResumeDataService, private el: ElementRef) {
    afterNextRender(() => this.initChipReveal());
  }

  private initChipReveal(): void {
    const root   = this.el.nativeElement as HTMLElement;
    const groups = root.querySelectorAll<HTMLElement>('.skill-group');

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chips = entry.target.querySelectorAll<HTMLElement>('.skill-chip');
          chips.forEach((chip, i) => {
            setTimeout(() => chip.classList.add('revealed'), i * 80);
          });
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.15 }
    );

    groups.forEach(g => observer.observe(g));

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
