import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: { animation: 'home' }
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    data: { animation: 'about' }
  },
  {
    path: 'skills',
    loadComponent: () => import('./skills/skills.component').then(m => m.SkillsComponent),
    data: { animation: 'skills' }
  },
  {
    path: 'experience',
    loadComponent: () => import('./experience/experience.component').then(m => m.ExperienceComponent),
    data: { animation: 'experience' }
  },
  {
    path: 'education',
    loadComponent: () => import('./education/education.component').then(m => m.EducationComponent),
    data: { animation: 'education' }
  },
  {
    path: 'achievements',
    loadComponent: () => import('./achievements/achievements.component').then(m => m.AchievementsComponent),
    data: { animation: 'achievements' }
  }
];
