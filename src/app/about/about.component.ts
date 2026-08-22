import { Component, afterNextRender, ElementRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  hero  = this.data.hero;
  about = this.data.about;

  readonly stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '2',  label: 'Companies'        },
    { value: '5+', label: 'Projects Owned'   },
    { value: '3',  label: 'Awards Won'       },
  ];

  constructor(private data: ResumeDataService, private el: ElementRef) {
    afterNextRender(() => this.initReveal());
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
      { threshold: 0.12 }
    );
    root.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
