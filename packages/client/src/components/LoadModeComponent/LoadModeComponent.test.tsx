import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadMoreComponent from './LoadMoreComponent';

describe('<LoadMoreComponent />', () => {
  test('it should mount', () => {
    render(<LoadMoreComponent />);

    const loadModeComponent = screen.getByTestId('LoadMoreComponent');

    expect(loadModeComponent).toBeInTheDocument();
  });
});
