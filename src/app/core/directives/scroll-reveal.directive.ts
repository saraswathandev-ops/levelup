import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() revealDelay = 0; // delay in milliseconds
  @Input() revealClass = 'is-revealed';

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement;

    // Apply delay if specified
    if (this.revealDelay > 0) {
      this.renderer.setStyle(nativeEl, 'transition-delay', `${this.revealDelay}ms`);
      this.renderer.setStyle(nativeEl, 'animation-delay', `${this.revealDelay}ms`);
    }

    // SSR fallback: always reveal immediately so bots and prerendering have visible content
    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(nativeEl, this.revealClass);
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      this.renderer.addClass(nativeEl, this.revealClass);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (this.revealDelay > 0) {
              this.renderer.setStyle(nativeEl, 'transition-delay', `${this.revealDelay}ms`);
              this.renderer.setStyle(nativeEl, 'animation-delay', `${this.revealDelay}ms`);
            }
            this.renderer.addClass(nativeEl, this.revealClass);
          } else {
            // Reset delay and state when out of view so animation re-triggers every time
            this.renderer.setStyle(nativeEl, 'transition-delay', '0ms');
            this.renderer.setStyle(nativeEl, 'animation-delay', '0ms');
            this.renderer.removeClass(nativeEl, this.revealClass);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
