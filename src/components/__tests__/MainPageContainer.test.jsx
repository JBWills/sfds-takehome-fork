import React from 'react';
import { render } from '@testing-library/react';

import MainPageContainer from '../MainPageContainer';

const defaultProps = {
  filters: {},
  housingRows: [],
  sortedAscending: true,
  sortedColumn: null,
  onClickColumn: () => {},
  onFilterChanged: () => {},
  siteUpdatedAt: 'September 1',
  dataLastUpdatedAt: 'September 2',
  metaDataLastUpdatedAt: 'September 3',
};

const getProps = (overrides = {}) => {
  return { ...defaultProps, ...overrides };
};

test('renders the title', () => {
  const { getByText } = render(<MainPageContainer {...getProps()} />);
  const title = getByText('Affordable Rental Portfolio');
  expect(title).toBeInTheDocument();
});

test('renders the description', () => {
  const { getByText } = render(<MainPageContainer {...getProps()} />);
  const description = getByText(
    'Affordable rental housing developed in partnership with non-profit and private developers and financed by the Mayor’s Office of Housing and Community Development (MOHCD) and the Office of Community Investment and Infrastructure (OCII) through City Funding Agreements, Ground Leases, Disposition & Participation Agreements and Conduit Mortgage Revenue Bond Financing, as of December 31, 2018.'
  );
  expect(description).toBeInTheDocument();
});
