import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal.directive';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div appScrollReveal [revealDelay]="150" class="test-element">Target</div>
  `
})
class TestHostComponent {}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ScrollRevealDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('.test-element');
  });

  it('should instantiate and configure transition and animation delay', () => {
    expect(element).toBeTruthy();
    expect(element.style.transitionDelay).toBe('150ms');
    expect(element.style.animationDelay).toBe('150ms');
  });
});
