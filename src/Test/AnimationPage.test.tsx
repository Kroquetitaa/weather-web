import { MockedFunction, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { AnimationPage } from '@pages/AnimationPage/AnimationPage';

vi.mock('react-router-dom', () => {
  const actual = require('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn()
  };
});

describe('AnimationPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should navigate to "/login" after 1500 ms', () => {
    const mockNavigate = vi.fn();

    const mockedUseNavigate = useNavigate as MockedFunction<typeof useNavigate>;
    mockedUseNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AnimationPage />
      </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1500);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should display the image with the correct alt text', () => {
    render(
      <MemoryRouter>
        <AnimationPage />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Background animation');
    expect(image).toBeInTheDocument();
  });
});
