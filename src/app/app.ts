import { Component, OnInit, inject, ViewChild, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ServicesComponent } from './features/services/services.component';
import { AboutComponent } from './features/about/about.component';
import { MissionComponent } from './features/mission/mission.component';
import { WhyChooseUsComponent } from './features/why-choose-us/why-choose-us.component';
import { ContactComponent } from './features/contact/contact.component';
import { DeveloperShowcaseComponent } from './features/developer-showcase/developer-showcase.component';
import { SeoService } from './core/services/seo.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    MissionComponent,
    WhyChooseUsComponent,
    ContactComponent,
    DeveloperShowcaseComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly contact = environment.contact;

  @ViewChild(ContactComponent) contactComponent?: ContactComponent;

  ngOnInit(): void {
    this.seoService.initMetaTags();
  }

  onServiceSelected(serviceTitle: string): void {
    if (this.contactComponent) {
      this.contactComponent.setService(serviceTitle);
    }
  }

  scrollToContact(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('contact');
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
