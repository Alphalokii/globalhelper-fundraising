import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Global Helper app', () => {
  render(<App />);
  const headingElement = screen.getByText(/Make a Difference/i);
  expect(headingElement).toBeInTheDocument();
});
