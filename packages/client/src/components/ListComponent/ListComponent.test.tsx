import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListComponent from './ListComponent';

describe('<ListComponent />', () => {
  test('it should mount', () => {
    render(<ListComponent />);
    
    const listComponent = screen.getByTestId('ListComponent');

    expect(listComponent).toBeInTheDocument();
  });
});