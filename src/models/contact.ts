export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  schoolName?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}
