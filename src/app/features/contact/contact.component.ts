import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryService } from '../../core/services/enquiry.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly enquiryService = inject(EnquiryService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly contact = environment.contact;

  // Protected anti-scraping email components
  private readonly emailUser = 'admin.levelupconsulting';
  private readonly emailDomain = 'gmail.com';
  readonly emailCopied = signal(false);

  get displayEmail(): string {
    return `${this.emailUser}@${this.emailDomain}`;
  }

  openEmail(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `mailto:${this.emailUser}@${this.emailDomain}`;
    }
  }

  copyEmail(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(`${this.emailUser}@${this.emailDomain}`).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2200);
      });
    }
  }

  readonly enquiryForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?:\+91|91)?[6-9]\d{9}$/)
      ]
    ],
    service: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1500)]]
  });

  readonly isSubmitting = signal(false);
  readonly submissionSuccess = signal<string | null>(null);
  readonly submissionError = signal<string | null>(null);

  isFieldInvalid(fieldName: string): boolean {
    const field = this.enquiryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submissionSuccess.set(null);
    this.submissionError.set(null);

    this.enquiryService.submitEnquiry(this.enquiryForm.value).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submissionSuccess.set(
          response.message || 'Thank you! Your enquiry has been received. Our advisory team will reach out promptly.'
        );
        this.enquiryForm.reset();
      },
      error: (err: Error) => {
        this.isSubmitting.set(false);
        this.submissionError.set(err.message);
      }
    });
  }

  setService(serviceTitle: string): void {
    this.enquiryForm.patchValue({ service: serviceTitle });
  }
}
