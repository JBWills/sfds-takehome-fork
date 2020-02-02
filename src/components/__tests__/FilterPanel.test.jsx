import React from 'react';
import { render } from '@testing-library/react';

import mockFilters from '../../mocks/mockFilters';
import { COLUMN_DATA } from '../../util/Constants';
import FilterPanel from '../FilterPanel';
import { createNumericFilter } from '../../util/Filters';
 
const baseProps = {
  filters: mockFilters,
  onFilterChanged: () => {},
};

const getProps = (overrides={}) => {
  return {...baseProps, ...overrides};
};

test('renders the PROJECT_NAME filter label with default props', () => {
  const { getByText } = render(<FilterPanel {...getProps()} />);
  const text = getByText('Filter by Project Name');
  expect(text).toBeInTheDocument();
});

test('renders the AFFORDABLE_BEDS numeric filter label with default props', () => {
  const { getByText } = render(<FilterPanel {...getProps()} />);
  const text = getByText('Filter by minimum Affordable Beds');
  expect(text).toBeInTheDocument();
});

test('renders no labels when filters prop is empty', () => {
  const { queryByText } = render(<FilterPanel {...getProps({ filters: {} })} />);
  expect(queryByText('Filter by Project Name')).not.toBeInTheDocument();
  expect(queryByText('Filter by minimum Affordable Beds')).not.toBeInTheDocument();
});

test('renders the minimum numeric value when numeric filter is enabled', () => {
  const enabledFilters = {
    ...mockFilters,
    [COLUMN_DATA.AFFORDABLE_BEDS.key]:
      createNumericFilter(COLUMN_DATA.AFFORDABLE_BEDS, true, 123, 500),
  };
  const { getByText } = render(<FilterPanel {...getProps({ filters: enabledFilters })} />);

  expect(getByText('123')).toBeInTheDocument();
});
