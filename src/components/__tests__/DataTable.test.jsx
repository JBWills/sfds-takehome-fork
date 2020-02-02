import React from 'react';
import { render } from '@testing-library/react';

import mockRows from '../../mocks/mockRows';
import { COLUMN_DATA } from '../../util/Constants';
import DataTable from '../DataTable';
 
const baseProps = {
  columns: [COLUMN_DATA.PROJECT_NAME],
  rows: mockRows,
  onClickColumn: () => {},
};

const getProps = (overrides={}) => {
  return {...baseProps, ...overrides};
};

test('renders the PROJECT_NAME header with default props', () => {
  const { getByText } = render(<DataTable {...getProps()} />);
  const text = getByText('Project Name');
  expect(text).toBeInTheDocument();
});

test('renders both PROJECT_NAME values with default props', () => {
  const { getByText } = render(<DataTable {...getProps()} />);
  expect(getByText('Project name 1')).toBeInTheDocument();
  expect(getByText('Project name 2')).toBeInTheDocument();
});

test('does not render the PROJECT_ADDRESS header with default props', () => {
  const { queryByText } = render(<DataTable {...getProps()} />);
  const text = queryByText('Address');
  expect(text).not.toBeInTheDocument();
});

test('does not render either PROJECT_ADDRESS values with default props', () => {
  const { queryByText } = render(<DataTable {...getProps()} />);
  expect(queryByText('Project address 1')).not.toBeInTheDocument();
  expect(queryByText('Project address 2')).not.toBeInTheDocument();
});

test('renders both PROJECT_ADDRESS values when address column passed in', () => {
  const propsWithAddressColumn = getProps(
    {
      columns: [
        COLUMN_DATA.PROJECT_NAME,
        COLUMN_DATA.PROJECT_ADDRESS
      ]
    });
  const { getByText } = render(<DataTable {...propsWithAddressColumn} />);
  expect(getByText('Project address 1')).toBeInTheDocument();
  expect(getByText('Project address 2')).toBeInTheDocument();
});

test('does not render any sort icons with default props', () => {
  const { queryByAltText } = render(<DataTable {...getProps()} />);
  expect(queryByAltText('Sorted ascending')).not.toBeInTheDocument();
  expect(queryByAltText('Sorted descending')).not.toBeInTheDocument();
});

test('renders an ascending icon when sortedAscending=true and column is set', () => {
  const propsWithSortedColumn = getProps(
    {
      sortedAscending: true,
      sortedColumn: COLUMN_DATA.PROJECT_NAME,
    });
  const { getByAltText } = render(<DataTable {...propsWithSortedColumn} />);
  expect(getByAltText('Sorted ascending')).toBeInTheDocument();
});

test('renders a descending icon when sortedAscending=true and column is set', () => {
  const propsWithSortedColumn = getProps(
    {
      sortedAscending: false,
      sortedColumn: COLUMN_DATA.PROJECT_NAME,
    });
  const { getByAltText } = render(<DataTable {...propsWithSortedColumn} />);
  expect(getByAltText('Sorted descending')).toBeInTheDocument();
});
