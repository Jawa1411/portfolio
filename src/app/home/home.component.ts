import {
  Component, OnDestroy, ElementRef, ViewChild,
  afterNextRender, PLATFORM_ID, Inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ResumeDataService } from '../core/services/resume-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  @ViewChild('ringOuter')   ringOuter!:    ElementRef<HTMLElement>;
  @ViewChild('ringInner')   ringInner!:    ElementRef<HTMLElement>;
  @ViewChild('ringCenter')  ringCenter!:   ElementRef<HTMLElement>;
  @ViewChild('flash')       flash!:        ElementRef<HTMLElement>;
  @ViewChild('dialWrap')    dialWrap!:     ElementRef<HTMLElement>;
  @ViewChild('heroContent') heroContent!:  ElementRef<HTMLElement>;
  @ViewChild('typewriter')  typewriterEl!: ElementRef<HTMLElement>;
  @ViewChild('heroBg')      heroBg!:       ElementRef<HTMLElement>;

  hero = this.data.hero;

  private typewriterTimer: ReturnType<typeof setTimeout> | null = null;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

  constructor(
    private data: ResumeDataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    afterNextRender(() => this.runIntro());
  }

  ngOnDestroy(): void {
    if (this.typewriterTimer) clearTimeout(this.typewriterTimer);
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  private async runIntro(): Promise<void> {
    const { gsap } = await import('gsap');

    const outer   = this.ringOuter.nativeElement;
    const inner   = this.ringInner.nativeElement;
    const center  = this.ringCenter.nativeElement;
    const flash   = this.flash.nativeElement;
    const dial    = this.dialWrap.nativeElement;
    const content = this.heroContent.nativeElement;

    gsap.set(content, { opacity: 0, y: 24 });
    gsap.set(flash,   { opacity: 0 });

    const tl = gsap.timeline();

    tl.from(dial, { opacity: 0, scale: 0.6, duration: 0.45, ease: 'back.out(1.7)' })
      .to(outer, { rotation: 360,  duration: 1.2, ease: 'power2.inOut' }, '+=0.1')
      .to(inner, { rotation: -270, duration: 1.0, ease: 'power2.inOut' }, '<')
      .to(center, { scale: 1.25, duration: 0.12, ease: 'power2.in' })
      .to(center, { scale: 1,    duration: 0.10 })
      .to(flash,  { opacity: 1,  duration: 0.08 })
      .to(flash,  { opacity: 0,  duration: 0.45, ease: 'power2.out' })
      .to(dial,   { opacity: 0, scale: 1.4, duration: 0.3, ease: 'power2.in' }, '-=0.3')
      .to(content, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        onComplete: () => this.startTypewriter()
      });

    this.mouseMoveHandler = (e: MouseEvent) => {
      if (!this.heroBg?.nativeElement) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(this.heroBg.nativeElement, { x, y, duration: 1.8, ease: 'power1.out' });
    };
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  private startTypewriter(): void {
    const el = this.typewriterEl?.nativeElement;
    if (!el) return;
    const text = this.hero.title;
    let index = 0;
    const type = () => {
      if (index <= text.length) {
        el.textContent = text.slice(0, index++);
        this.typewriterTimer = setTimeout(type, 65);
      }
    };
    type();
  }
}
