import React from 'react';
import { render, screen } from 'utils/testUtils/rtl';
import CookiePolicy from '../CookiePolicy';

jest.mock('utils/cl-intl');

jest.mock('utils/eventEmitter');
jest.mock('hooks/useAppConfiguration', () => () => ({
  attributes: { name: 'orgName' },
}));

jest.mock('components/Fragment', () => ({ children }) => {
  return <div>{children}</div>;
});

describe('CookiePolicy', () => {
  it('renders correctly', () => {
    render(<CookiePolicy />);
    expect(screen.getByTestId('cookiePolicy')).toBeInTheDocument();
  });
});
