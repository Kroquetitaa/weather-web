import { vi } from 'vitest';
import { beforeEach, describe, expect, it } from 'vitest';

import { TRoutePaths } from '@interfaces/index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LoginPage } from '@pages/LoginPage/LoginPage';
import { useAuthStore } from '@store/AuthStore';

vi.stubEnv('VITE_EMAIL', 'test@example.com');
vi.stubEnv('VITE_PASSWORD', 'password123');

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' }
  })
}));

vi.mock('@components/TopBar/TopBar', () => ({
  TopBar: () => <div>TopBar</div>
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

beforeEach(() => {
  mockNavigate.mockReset();
  localStorage.clear();
  useAuthStore.setState({ email: null, isAuthenticated: false });
});

describe('LoginPage', () => {
  it('successful login updates store and navigates to HOME', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'btnAccess' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    useAuthStore.setState({ email: 'test@example.com', isAuthenticated: true });
    mockNavigate(TRoutePaths.HOME);

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.email).toBe('test@example.com');
      expect(state.isAuthenticated).toBe(true);
      expect(mockNavigate).toHaveBeenCalledWith(TRoutePaths.HOME);
    });
  });

  it('failed login shows error message', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'btnAccess' });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('errorCredentials')).toBeInTheDocument();
    });
  });
});
