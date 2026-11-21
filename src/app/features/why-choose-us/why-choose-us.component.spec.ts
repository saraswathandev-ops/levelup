import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyChooseUsComponent } from './why-choose-us.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WhyChooseUsComponent', () => {
  let component: WhyChooseUsComponent;
  let fixture: ComponentFixture<WhyChooseUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseUsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render 4 advantage pillars', () => {
    expect(component).toBeTruthy();
    expect(component.advantages.length).toBe(4);
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.advantage-card');
    expect(cards.length).toBe(4);
  });
});
