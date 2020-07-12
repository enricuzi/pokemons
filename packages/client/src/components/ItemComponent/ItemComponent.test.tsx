import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ItemComponent from './ItemComponent';

describe('<ItemComponent />', () => {
  test('it should mount', () => {
    render(<ItemComponent />);
    
    const itemComponent = screen.getByTestId('ItemComponent');

    expect(itemComponent).toBeInTheDocument();
  });
});