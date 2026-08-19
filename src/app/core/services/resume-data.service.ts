import { Injectable } from '@angular/core';
import { IExperience, ISkillGroup, IEducation, IAchievement, IHero } from '../models/resume.models';

@Injectable({ providedIn: 'root' })
export class ResumeDataService {

  readonly hero: IHero = {
    name: 'Jawahar S',
    title: 'Fullstack Web Developer',
    summary: 'Building scalable fullstack solutions — from backend APIs to polished UIs — end to end.',
    email: 'jawaharsenthil1411@gmail.com',
    phone: '+91 86950 77932',
    linkedin: 'https://linkedin.com/in/jawaharsenthilkumar'
  };

  readonly about = {
    paragraphs: [
      `I'm a Fullstack Web Developer with 5+ years of experience taking products from zero to production — owning database design, backend APIs, and frontend delivery across the same project. I don't hand off between layers; I build all of them.`,
      `My backend work lives in C#, .Net Core, and Python (FastAPI / Flask), with SQL Server and MySQL underneath. On the frontend, Angular is my home. I've shipped real-time systems with SignalR, multi-portal SSO via IdentityServer4, IoT sensor pipelines, and complex enterprise workflows — across two companies and five distinct client domains.`,
      `Right now at Accenture, I solely own an end-to-end insurance data integration pipeline and am spearheading automation of manual configuration work using Claude AI — turning hours of repetitive setup into structured prompt-driven flows.`
    ],
    focus: 'Integration automation · AI-assisted development · Scalable system design',
    specialisations: [
      { icon: 'dns',            label: 'Backend APIs',         detail: '.Net Core · FastAPI · REST' },
      { icon: 'web',            label: 'Frontend',             detail: 'Angular · TypeScript' },
      { icon: 'bolt',           label: 'Real-time Systems',    detail: 'SignalR · WebSocket' },
      { icon: 'hub',            label: 'System Integration',   detail: 'Pipelines · Data Mapping' },
      { icon: 'storage',        label: 'Databases',            detail: 'SQL Server · MySQL · EF Core' },
      { icon: 'smart_toy',      label: 'AI Automation',        detail: 'Claude AI · Prompt Engineering' },
    ]
  };

  readonly skillGroups: ISkillGroup[] = [
    { category: 'Languages',          skills: ['C#', 'Python', 'TypeScript'] },
    { category: 'Frameworks',         skills: ['.Net Core', 'EF Core', 'FastAPI', 'Flask', 'Angular'] },
    { category: 'Databases',          skills: ['Microsoft SQL Server', 'MySQL'] },
    { category: 'Tools & Platforms',  skills: ['Docker', 'Azure Services', 'SignalR', 'IdentityServer4', 'Git'] },
    { category: 'Core Competencies',  skills: ['REST API Design', 'System Integration', 'Real-time Communication', 'Database Management'] }
  ];

  readonly experiences: IExperience[] = [
    {
      company: 'Accenture',
      role: 'Custom Software Engineering Senior Analyst',
      period: 'Jan 2025 – Present',
      projects: [
        {
          title: 'Insurance Integration Client',
          role: 'Integration Developer',
          bullets: [
            'Solely owned and delivered end-to-end integration for one system within a multi-system insurance data pipeline',
            'Designed and configured visual workflow flows using a node-based drag-and-drop interface to orchestrate data routing between systems',
            'Built flows to receive incoming payloads from upstream systems and conditionally route them to downstream systems based on branching response logic',
            'Mapped and transformed data fields between systems to ensure compatibility across different integration touchpoints',
            'Validated incoming payloads at flow entry points and tested end-to-end paths to verify correct routing under various input conditions',
            'Coordinated with cross-functional teams to align on upstream payload structures, downstream expectations, and flow documentation',
            'Spearheading automation of manual flow creation using Claude AI with structured .md prompt files, reducing time and effort to configure new integration flows'
          ]
        }
      ]
    },
    {
      company: 'Tymtix Solutions LLP',
      role: 'Software Engineer',
      period: 'Aug 2021 – Dec 2024',
      projects: [
        {
          title: 'Golf Course Management',
          role: 'Fullstack Developer',
          bullets: [
            'Architected and owned the full product lifecycle end-to-end, from database design to UI delivery',
            'Implemented Single Sign-On (SSO) across multiple portals using IdentityServer4 for seamless authentication',
            'Built a real-time live update system using SignalR WebSocket to push instant notifications to connected clients',
            'Developed automated scheduling algorithms to eliminate manual daily configuration tasks',
            'Implemented role-based access control to manage user permissions across multiple admin levels',
            'Optimized SQL queries and EF Core data models to improve API response performance',
            'Ensured cross-browser and mobile responsiveness across all application views'
          ]
        },
        {
          title: 'Enterprise Productivity',
          role: 'Backend Developer',
          bullets: [
            'Designed RESTful API endpoints with dynamic filtering, pagination, and multi-column sorting',
            'Followed clean architecture principles to keep business logic decoupled from data access layers',
            'Wrote reusable service layer components to reduce code duplication across modules',
            'Handled concurrent data operations with proper transaction management and error handling'
          ]
        },
        {
          title: 'TPMS & Fleet Monitoring',
          role: 'Backend Developer',
          bullets: [
            'Built a real-time data ingestion pipeline to process sensor telemetry from IoT hardware devices',
            'Designed trip-tracking logic to calculate vehicle journey start, end, and duration automatically',
            'Developed threshold-based alerting to flag abnormal tyre pressure or temperature readings',
            'Structured the database schema to efficiently store and query time-series sensor data'
          ]
        },
        {
          title: 'TPMS Data Services',
          role: 'Backend Developer',
          bullets: [
            'Developed a middleware API layer to normalize and expose raw device sensor data to consumers',
            'Standardized response formats across endpoints to ensure consistent client integration experience',
            'Implemented authentication and rate-limiting to secure sensor data access for external clients'
          ]
        }
      ]
    }
  ];

  readonly education: IEducation[] = [
    {
      degree: 'B.E (Electronics & Communication Engineering)',
      institution: 'Government College of Engineering, Tirunelveli',
      year: '2021',
      score: '7.68',
      scoreType: 'cgpa'
    },
    {
      degree: 'HSC (Class XII)',
      institution: 'VHN Hr.Sec.School, Madurai',
      year: '2017',
      score: '92.66',
      scoreType: 'percentage'
    },
    {
      degree: 'SSLC (Class X)',
      institution: 'NVS Hr.Sec.School, Madurai',
      year: '2015',
      score: '98.4',
      scoreType: 'percentage'
    }
  ];

  readonly achievements: IAchievement[] = [
    {
      title: 'Dashing Debut Award',
      company: 'Tymtix Solutions LLP',
      period: 'Aug – Dec 2021',
      description: 'Recognised for outstanding performance in the very first year, setting a high standard from day one.'
    },
    {
      title: 'Rising Star Award',
      company: 'Tymtix Solutions LLP',
      period: 'Jan – Dec 2023',
      description: 'Recognised for consistent high performance and significant contributions across multiple client projects.'
    },
    {
      title: 'ACE Award',
      company: 'Accenture',
      period: 'Jan 2025 – Dec 2025',
      description: 'Recognised for excellent performance and sole ownership of a critical insurance integration pipeline.'
    }
  ];
}
