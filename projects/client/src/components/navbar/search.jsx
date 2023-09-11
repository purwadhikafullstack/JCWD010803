import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';

import { useLocationLabel, useDurationLabel, useGuestLabel } from '../helpers/label-search-helpers';
import useSearchModal from '../../hooks/useSearchModal'; 
import useCountries from '../../hooks/useCountries';
import Modal from '../modals/modal';

const Search = () => {
  const searchModal = useSearchModal();
  const [params] = useSearchParams();
  const { getByValue } = useCountries();
  console.log(searchModal);
  
  const locationValue = params.get('locationValue');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const guestCount = params.get('guestCount');
  
  const locationLabel = useLocationLabel(locationValue, getByValue);
  const durationLabel = useDurationLabel(startDate, endDate);
  const guestLabel = useGuestLabel(guestCount);


  return (
    <div
    onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">
            {guestLabel}
          </div>
          <div 
            className="
              p-2 
            
              rounded-full 
              text-teal-500
            "
          >
            <BiSearch size={25} />
            <Modal onOpen={searchModal.isOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
