import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-developer-showcase',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './developer-showcase.component.html',
  styleUrls: ['./developer-showcase.component.scss']
})
export class DeveloperShowcaseComponent {
  readonly techStack: string[] = [
    'Angular 21 Standalone',
    'TypeScript 5.9',
    'Server-Side Rendering (SSR)',
    'Modern Sass (SCSS) Modules',
    'Bootstrap 5.3 Grid',
    'IntersectionObserver Animations',
    'Accessibility & WCAG AA',
    'SEO & JSON-LD Structured Data'
  ];
}
