import { Component, afterNextRender, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeComponent }         from '../home/home.component';
import { AboutComponent }        from '../about/about.component';
import { SkillsComponent }       from '../skills/skills.component';
import { ExperienceComponent }   from '../experience/experience.component';
import { EducationComponent }    from '../education/education.component';
import { AchievementsComponent } from '../achievements/achievements.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    HomeComponent, AboutComponent, SkillsComponent,
    ExperienceComponent, EducationComponent, AchievementsComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl:    './portfolio.component.scss'
})
export class PortfolioComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    afterNextRender(() => this.initParallax());
  }

  private async initParallax(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('.parallax-band').forEach(band => {
      const orbs = band.querySelectorAll<HTMLElement>('.band-orb');
      orbs.forEach((orb, i) => {
        gsap.fromTo(orb,
          { y: i % 2 === 0 ? 40 : -40 },
          {
            y: i % 2 === 0 ? -40 : 40,
            ease: 'none',
            scrollTrigger: {
              trigger: band,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            }
          }
        );
      });
    });
  }
}
