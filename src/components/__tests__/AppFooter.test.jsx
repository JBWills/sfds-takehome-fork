import React from 'react';
import { render } from '@testing-library/react';

import AppFooter from '../AppFooter';

const defaultProps = {
  siteUpdatedAt: 'September 1',
  dataLastUpdatedAt: 'September 2',
  metaDataLastUpdatedAt: 'September 3',
};

const getProps = (overrides = {}) => {
  return { ...defaultProps, ...overrides };
};

test('renders the author citation', () => {
  const { getByText } = render(<AppFooter {...getProps()} />);
  const author = getByText('Site by James Wills');
  expect(author).toBeInTheDocument();
});

test('renders when the site was last updated', () => {
  const { getByText } = render(<AppFooter {...getProps()} />);
  const text = getByText('Site last updated: September 1');
  expect(text).toBeInTheDocument();
});

test('renders when the data was last updated', () => {
  const { getByText } = render(<AppFooter {...getProps()} />);
  const text = getByText('Data last updated: September 2');
  expect(text).toBeInTheDocument();
});

test('renders when the metadata was last updated', () => {
  const { getByText } = render(<AppFooter {...getProps()} />);
  const text = getByText('Metadata last updated: September 3');
  expect(text).toBeInTheDocument();
});
