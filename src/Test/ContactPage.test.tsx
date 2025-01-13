import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ContactPage } from '@pages/ContactPage/ContactPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        contactFormTitle: 'Contact Us',
        name: 'Name',
        nameRequired: 'Name is required',
        dob: 'Date of Birth',
        dobRequired: 'DOB is required',
        city: 'City',
        cityRequired: 'City is required',
        email: 'Email',
        emailRequired: 'Email is required',
        emailInvalid: 'Email is invalid',
        phone: 'Phone',
        phoneRequired: 'Phone is required',
        phoneInvalid: 'Phone is invalid',
        formSent: 'Form sent successfully',
        submit: 'Submit'
      };
      return translations[key] || key;
    },
    i18n: { language: 'en' }
  })
}));

describe('ContactPage', () => {
  it('renders the contact form with the submit button initially disabled', () => {
    render(<ContactPage />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('shows validation messages when submitting an empty form', async () => {
    render(<ContactPage />);

    const form = document.querySelector('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('DOB is required')).toBeInTheDocument();
      expect(screen.getByText('City is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone is required')).toBeInTheDocument();
    });
  });

  it('enables the submit button when the form is valid and shows success message upon submission', async () => {
    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Madrid' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '612345678' } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Form sent successfully')).toBeInTheDocument();
    });
  });
});
