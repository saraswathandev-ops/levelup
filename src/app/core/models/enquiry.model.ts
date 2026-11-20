export interface EnquiryRequest {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}
