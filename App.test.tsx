import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders error message on invalid JSON', () => {
  render(<App />);
  const textarea = screen.getByPlaceholderText(/enter json schema/i);
  fireEvent.change(textarea, { target: { value: '{"invalid json"' } });
  expect(screen.getByText(/invalid json schema/i)).toBeInTheDocument();
});
