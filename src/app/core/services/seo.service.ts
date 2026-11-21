import { Injectable, inject, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer = this.rendererFactory.createRenderer(null, {
    id: 'seo-script-renderer',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    data: {}
  });

  initMetaTags(): void {
    const pageTitle = `${environment.siteName} | Internal Audit, GST Advisory & Virtual CFO in Chennai`;
    const description =
      'LEVELUP CONSULTING provides internal audit, management consultancy, GST advisory, Virtual CFO, and fundraising support for businesses in Tamil Nadu.';

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: 'Saraswathan Dev Fullstack' });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'LEVELUP CONSULTING, Internal Audit Chennai, Virtual CFO Tamil Nadu, GST Advisory Ambattur, Fund Raising, Management Consultancy'
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: environment.siteUrl });
    this.meta.updateTag({ property: 'og:site_name', content: environment.siteName });

    this.injectStructuredData();
  }

  private injectStructuredData(): void {
    const scriptId = 'schema-accounting-service';
    let scriptElement = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = this.renderer.createElement('script') as HTMLScriptElement;
      this.renderer.setAttribute(scriptElement, 'id', scriptId);
      this.renderer.setAttribute(scriptElement, 'type', 'application/ld+json');

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: environment.siteName,
        alternateName: 'LEVELUP CONSULTING Chennai',
        description:
          'Qualified CAs providing Internal Audit, GST Advisory, Virtual CFO, Management Consultancy, and Fund Raising services across Tamil Nadu.',
        url: environment.siteUrl,
        telephone: environment.contact.primaryPhone,
        email: environment.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ambattur',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN'
        },
        areaServed: {
          '@type': 'State',
          name: 'Tamil Nadu'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Consulting & Advisory Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Internal Audit',
                description: 'Internal control reviews, risk identification, compliance support, and operational efficiency.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Management Consultancy',
                description: 'Strategic guidance, process improvement, management reporting, and business performance support.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'GST Advisory',
                description: 'GST compliance guidance, registration and return support, audit assistance, and tax planning.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Virtual CFO',
                description: 'Financial planning, budgeting, cash-flow monitoring, management reporting, and decision support.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Fund Raising',
                description: 'Financial projections, funding documentation, pitch decks, business plans, and preparation.'
              }
            }
          ]
        }
      };

      this.renderer.setProperty(scriptElement, 'textContent', JSON.stringify(schema));
      this.renderer.appendChild(this.document.head, scriptElement);
    }
  }
}
