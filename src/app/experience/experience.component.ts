import { Component, afterNextRender, ElementRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences = this.data.experiences;
  expandedProjects: Set<string> = new Set();

  constructor(private data: ResumeDataService, private el: ElementRef) {
    afterNextRender(() => this.initReveal());
  }

  toggleProject(key: string): void {
    if (this.expandedProjects.has(key)) {
      this.expandedProjects.delete(key);
    } else {
      this.expandedProjects.add(key);
    }
  }

  isExpanded(key: string): boolean {
    return this.expandedProjects.has(key);
  }

  private initReveal(): void {
    const root = this.el.nativeElement as HTMLElement;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    root.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const line = root.querySelector<HTMLElement>('.timeline-line');
    if (line) {
      const lo = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { line.classList.add('draw'); lo.unobserve(e.target); }
        });
      }, { threshold: 0.05 });
      lo.observe(line);
    }
  }
}
