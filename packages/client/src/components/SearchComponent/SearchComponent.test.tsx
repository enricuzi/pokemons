import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchComponent from './SearchComponent';

describe('<SearchComponent />', () => {
  test('it should mount', () => {
    render(<SearchComponent />);
    
    const searchComponent = screen.getByTestId('SearchComponent');

    expect(searchComponent).toBeInTheDocument();
  });
});