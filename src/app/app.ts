import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ServicesComponent } from './features/services/services.component';
import { AboutComponent } from './features/about/about.component';
import { MissionComponent } from './features/mission/mission.component';
import { ContactComponent } from './features/contact/contact.component';
import { SeoService } from './core/services/seo.service';

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
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);

  @ViewChild(ContactComponent) contactComponent?: ContactComponent;

  ngOnInit(): void {
    this.seoService.initMetaTags();
  }

  onServiceSelected(serviceTitle: string): void {
    if (this.contactComponent) {
      this.contactComponent.setService(serviceTitle);
    }
  }
}
