import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatISO } from 'date-fns';
import qs from 'query-string';

import useSearchModal from '../../hooks/useSearchModal';

import Modal from './modal';
import Heading from '../heading';
import CountrySelect from '../inputs/country-select';
import Calendar from '../inputs/calendar';
import Counter from '../inputs/counter';
import Map from '../map';
import LogoImage from '../../assets/images/2.png'

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
};

const SearchModal = () => {
  const navigate = useNavigate();
  const searchModal = useSearchModal();
  const [params] = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  console.log(startDate);

  const onBack = useCallback(() => setStep((prev) => prev - 1), []);
  const onNext = useCallback(() => setStep((prev) => prev + 1), []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    // const updatedQuery = {
    //   ...qs.parse(params.toString()),
    //   location: location?.value,
    //   guestCount,
    //   roomCount,
    //   bathroomCount,
    //   startDate: dateRange.startDate ? formatISO(dateRange.startDate) : null,
    //   endDate: dateRange.endDate ? formatISO(dateRange.endDate) : null,
    // };
    // const url = qs.stringify(updatedQuery, { skipNull: true });
    // navigate(`/?${url}`);
    const getStartDate = (value) => {
      setStartDate(value.startDate)
    }
    const getEndDate = (value) => {
      setEndDate(value.endDate)
    }

    setStep(STEPS.LOCATION);
    searchModal.onClose();
  }, [step, location, guestCount, roomCount, bathroomCount, dateRange, onNext, params, navigate, searchModal]);

  const actionLabel = useMemo(() => (step === STEPS.INFO ? 'Search' : 'Next'), [step]);
  const secondaryActionLabel = useMemo(() => (step === STEPS.LOCATION ? undefined : 'Back'), [step]);

  let bodyContent;


if (step === STEPS.LOCATION) {
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
} else if (step === STEPS.DATE) {
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar
        // onChange={(value) => setDateRange(value.selection)}
        // dateValue={getStartDate()}
      />
    </div>
  );
} else if (step === STEPS.INFO) {
  bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="More information"
        subtitle="Find your perfect place!"
      />
      <Counter
        onChange={(value) => setGuestCount(value)}
        value={guestCount}
        title="Guests"
        subtitle="How many guests are coming?"
      />
      <hr />
      <Counter
        onChange={(value) => setRoomCount(value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you need?"
      />
      <hr />
      <Counter
        onChange={(value) => setBathroomCount(value)}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bathrooms do you need?"
      />
    </div>
  );
}

return (
  <Modal
    isOpen={searchModal.isOpen}
    title={<img src={LogoImage} alt="ComfyCribs Logo" style={{ width: '80px', height: '80px' }}  />} 
    actionLabel={actionLabel}
    onSubmit={onSubmit}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    onClose={searchModal.onClose}
    body={bodyContent}
  />
);
};

export default SearchModal;
