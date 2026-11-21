import { Component, inject, PLATFORM_ID, output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ServiceItem } from '../../core/models/service-item.model';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly serviceSelected = output<string>();

  readonly services: ServiceItem[] = [
    {
      id: 'internal-audit',
      title: 'Internal Audit',
      icon: 'bi-shield-check',
      shortDescription:
        'Comprehensive internal control evaluations and risk identification frameworks that protect organizational assets and enhance operational efficiency.',
      bullets: [
        'Internal control & governance reviews',
        'Operational efficiency & process audit',
        'Regulatory & statutory compliance checks',
        'Risk identification and mitigation roadmaps'
      ]
    },
    {
      id: 'management-consultancy',
      title: 'Management Consultancy',
      icon: 'bi-briefcase',
      shortDescription:
        'Strategic guidance and diagnostic frameworks designed to optimize organizational structures, streamline workflows, and drive sustainable growth.',
      bullets: [
        'Organizational process optimization',
        'Executive Management Information Systems (MIS)',
        'Performance benchmarking & KPIs',
        'Strategic growth & scaling blueprints'
      ]
    },
    {
      id: 'gst-advisory',
      title: 'GST Advisory',
      icon: 'bi-receipt-cutoff',
      shortDescription:
        'End-to-end Goods and Services Tax compliance, audit representation, and proactive tax-planning advisory for seamless regulatory operations.',
      bullets: [
        'GST registration, filings & reconciliation',
        'Statutory GST audit support & department notices',
        'Input Tax Credit (ITC) optimization',
        'Strategic state & interstate indirect tax advisory'
      ]
    },
    {
      id: 'virtual-cfo',
      title: 'Virtual CFO',
      icon: 'bi-graph-up-arrow',
      shortDescription:
        'High-caliber executive financial leadership tailored for growing enterprises needing strategic clarity, working capital control, and budgeting.',
      bullets: [
        'Financial planning & corporate budgeting',
        'Working capital & cash-flow forecasting',
        'Monthly board-level financial reporting',
        'Strategic capital allocation & profitability tracking'
      ]
    },
    {
      id: 'fund-raising',
      title: 'Fund Raising',
      icon: 'bi-cash-coin',
      shortDescription:
        'Institutional preparation for debt and equity financing, robust multi-year financial modeling, and investor-grade documentation.',
      bullets: [
        'Multi-year financial projections & valuation models',
        'Comprehensive Business Plans & Information Memorandums',
        'Debt restructuring & working capital loan syndication',
        'Investor readiness and due diligence documentation'
      ]
    }
  ];

  selectService(event: Event, serviceTitle: string): void {
    event.preventDefault();
    this.serviceSelected.emit(serviceTitle);

    if (isPlatformBrowser(this.platformId)) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Focus select element if present
        const selectEl = document.getElementById('service') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.value = serviceTitle;
          selectEl.dispatchEvent(new Event('change'));
        }
      }
    }
  }
}
