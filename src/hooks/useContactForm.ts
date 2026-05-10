import { useState } from 'react';
import type { ContactFormData } from '../models/contact';
import { submitContactForm } from '../services/contactService';

const EMPTY: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
  schoolName: '',
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData(EMPTY);
    } catch {
      setError('שגיאה בשליחת הטופס. אנא נסו שוב.');
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, submitting, submitted, error };
}
