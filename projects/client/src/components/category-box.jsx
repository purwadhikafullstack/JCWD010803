import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'query-string';

const CategoryBox = ({ icon: Icon, label, selected }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(() => {
    const currentQuery = qs.parse(location.search);

    const updatedQuery = {
      ...currentQuery,
      category: label
    };

    if (currentQuery.category === label) {
      delete updatedQuery.category;
    }

    const updatedSearch = qs.stringify(updatedQuery, { skipNull: true });

    navigate({
      pathname: '/',
      search: updatedSearch
    });
  }, [label, navigate, location.search]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
