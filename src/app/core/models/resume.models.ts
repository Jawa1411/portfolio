export interface ISkillGroup {
  category: string;
  skills: string[];
}

export interface IProject {
  title: string;
  role: string;
  bullets: string[];
}

export interface IExperience {
  company: string;
  role: string;
  period: string;
  projects: IProject[];
}

export interface IEducation {
  degree: string;
  institution: string;
  year: string;
  score: string;
  scoreType: 'percentage' | 'cgpa';
}

export interface IAchievement {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface IHero {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
}
