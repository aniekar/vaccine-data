import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DataContainer from './DataContainer';

test('DataContainer renders the provided data', () => {
  const data = {
    allOrderCount: 61,
    allVaccineCount: 300,
    allVaccinesExpired: 8354,
    allVaccinesExpiringWithinTenDays: 1939,
    allVaccinesLeft: 6602,
    allVaccinesUsed: 75,
    antiquaExpired: 2250,
    antiquaExpiringWithinTenDays: 507,
    antiquaOrderCount: 23,
    antiquaVaccineCount: 92,
    antiquaVaccinesLeft: 1678,
    antiquaVaccinesUsed: 23,
    sbExpired: 3380,
    sbExpiringWithinTenDays: 755,
    sbOrderCount: 18,
    sbVaccineCount: 108,
    sbVaccinesLeft: 2563,
    sbVaccinesUsed: 29,
    zerpfyExpired: 2724,
    zerpfyExpiringWithinTenDays: 677,
    zerpfyOrderCount: 20,
    zerpfyVaccineCount: 100,
    zerpfyVaccinesLeft: 2361,
    zerpfyVaccinesUsed: 23,
  };

  const component = render(<DataContainer data={data} />);

  const element = component.getByText('61');
  expect(element).toBeDefined();
});