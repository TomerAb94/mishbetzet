import type { ContactFormData, ContactSubmissionResult } from '../models/contact';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  await delay(200);
  console.log('Contact form submitted:', data);
  return { success: true, message: 'הטופס נשלח בהצלחה! ניצור איתך קשר בקרוב.' };
}
