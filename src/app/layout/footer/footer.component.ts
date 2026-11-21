import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentYear = new Date().getFullYear();
  readonly contact = environment.contact;

  // Anti-scraping split email storage
  private readonly emailUser = 'admin.levelupconsulting';
  private readonly emailDomain = 'gmail.com';
  readonly emailCopied = signal(false);

  get displayEmail(): string {
    return `${this.emailUser}@${this.emailDomain}`;
  }

  openEmail(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `mailto:${this.emailUser}@${this.emailDomain}`;
    }
  }

  copyEmail(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(`${this.emailUser}@${this.emailDomain}`).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2200);
      });
    }
  }

  scrollToSection(event: Event, targetId: string): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
