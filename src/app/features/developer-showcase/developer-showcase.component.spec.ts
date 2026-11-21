import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeveloperShowcaseComponent } from './developer-showcase.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DeveloperShowcaseComponent', () => {
  let component: DeveloperShowcaseComponent;
  let fixture: ComponentFixture<DeveloperShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperShowcaseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DeveloperShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render developer name and tech stack', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Saraswathan Dev Fullstack');
    expect(component.techStack.length).toBeGreaterThan(0);
    const linkedInLink = compiled.querySelector('a[href*="linkedin.com"]') as HTMLAnchorElement;
    expect(linkedInLink).toBeTruthy();
    expect(linkedInLink.href).toContain('saraswathan-i-56a389229');
  });
});
