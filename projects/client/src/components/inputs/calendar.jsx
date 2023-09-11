import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({dateValue}) => {
  const [state, setState] = useState([
    {
      key: "selection",
    },
  ]);

  const [startDate, setStartDate] = useState()
  const [endDate, setendDate] = useState()
  dateValue = {
    checkIn : startDate,
    checkOut : endDate
  }

  // Logic tanggal gabisa di-click apabila property-tetant tidak ada kamar dan tanggal,
  //   const disabledDates = [
  //     new Date('2023-09-10'),
  //     new Date('2023-09-11'),
  //     new Date('2023-09-12'),
  //   ];

  return (
    <DateRange
      ranges={state}
      onChange={(item) => {
        // Mendapatkan startDate dan endDate dari item
        setStartDate(item.selection.startDate)
        setendDate(item.selection.endDate)
        
        // Mengupdate state dengan startDate dan endDate
        setState([item.selection]);

        // Sekarang Anda dapat menggunakan startDate dan endDate sesuai kebutuhan
        // console.log('startDate:', startDate);
        // console.log('endDate:', endDate);
      }}
      rangeColors={['#262626']}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
  );
};

export default DatePicker;
