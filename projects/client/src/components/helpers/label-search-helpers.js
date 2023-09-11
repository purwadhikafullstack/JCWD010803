import { useMemo } from 'react';

export const useLocationLabel = (locationValue, getByValue) => {
  return useMemo(() => {
    return locationValue ? getByValue(locationValue)?.label : 'Anywhere';
  }, [locationValue, getByValue]);
};

export const useDurationLabel = (startDate, endDate) => {
  return useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      return `${diff === 0 ? 1 : diff} Days`;
    }
    return 'Any Week';
  }, [startDate, endDate]);
};

export const useGuestLabel = (guestCount) => {
  return useMemo(() => {
    return guestCount ? `${guestCount} Guests` : 'Add Guests';
  }, [guestCount]);
};
