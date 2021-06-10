import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Task Tracker header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Task Tracker/i);
  expect(linkElement).toBeInTheDocument();
});

test('Add button opens form', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Add'))
  
  const newButton = screen.getByText('Close');
  expect(newButton).toBeInTheDocument();

  const addTask = screen.getByPlaceholderText('Add Task');
  expect(addTask).toBeInTheDocument();
});