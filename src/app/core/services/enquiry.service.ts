import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { EnquiryRequest, EnquiryResponse } from '../models/enquiry.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  submitEnquiry(enquiry: EnquiryRequest): Observable<EnquiryResponse> {
    const endpoint = `${this.apiUrl}/consultation-enquiry`;
    return this.http.post<EnquiryResponse>(endpoint, enquiry).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log error and propagate safe response message without misleading the user
        const message = error.status === 404 || error.status === 0
          ? 'Online form dispatch is currently being connected to the server. Please call us directly at ' +
            environment.contact.primaryPhoneDisplay +
            ' or email ' +
            environment.contact.email +
            '.'
          : (error.error?.message || 'Unable to submit enquiry at this time. Please contact us directly.');

        return throwError(() => new Error(message));
      })
    );
  }
}
