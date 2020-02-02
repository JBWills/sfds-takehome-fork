import React from 'react';
import { render } from '@testing-library/react';

import AppHeader from '../AppHeader';

test('renders the header text', () => {
  const { getByText } = render(<AppHeader />);
  const text = getByText('Mayor’s Office of Housing and Community Development');
  expect(text).toBeInTheDocument();
});
