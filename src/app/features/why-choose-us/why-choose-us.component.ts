import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.scss']
})
export class WhyChooseUsComponent {
  readonly advantages: AdvantageItem[] = [
    {
      id: 'ca-leadership',
      icon: 'bi-patch-check-fill',
      title: 'Qualified CA Leadership',
      subtitle: 'Audit & Accounting Rigor',
      description:
        'Direct engagement with experienced Chartered Accountants bringing rigorous institutional scrutiny, ethical governance, and deep technical standards.',
      badge: 'Chartered Rigor'
    },
    {
      id: 'virtual-cfo',
      icon: 'bi-graph-up-arrow',
      title: 'Virtual CFO Intelligence',
      subtitle: 'Data-Backed Foresight',
      description:
        'Moving beyond retrospective bookkeeping into executive financial forecasting, cashflow control, MIS intelligence, and capital allocation models.',
      badge: 'Strategic Vision'
    },
    {
      id: 'compliance-shield',
      icon: 'bi-shield-check',
      title: 'Total Compliance & Risk Shield',
      subtitle: 'Proactive GST & Audit Defense',
      description:
        'Comprehensive statutory compliance, reconciliation protocols, and representation that safeguard enterprise assets and eliminate costly penalties.',
      badge: 'Risk Mitigation'
    },
    {
      id: 'tn-enterprise',
      icon: 'bi-buildings',
      title: 'Tamil Nadu Enterprise Fluency',
      subtitle: 'Ground-Level Industrial Exposure',
      description:
        'Tailored advisory aligned with the operational realities of Ambattur, Chennai, and Tamil Nadu manufacturing, retail, and trade hubs.',
      badge: 'Local Insight'
    }
  ];
}
