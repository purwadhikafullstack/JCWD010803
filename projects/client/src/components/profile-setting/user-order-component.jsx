import React, { useState } from "react";
import Accordion from "./accordion-component";

const accordionData = [
  {
    title : "section 1",
    content : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vel, optio corporis dolorum nihil repellat odit accusamus a explicabo doloribus?"
  },
  {
    title : "section 2",
    content : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vel, optio corporis dolorum nihil repellat odit accusamus a explicabo doloribus?"
  },
  {
    title : "section 3",
    content : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vel, optio corporis dolorum nihil repellat odit accusamus a explicabo doloribus?"
  }
]



const UserOrderList = () => {

  return (
    <div className="w-full p-1 flex flex-col space-y-2">
      <form className="md:flex flex-wrap xs:p-2 md:p-2 border">
        <div className="flex flex-wrap -mx-3 mb-2 w-full">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Invoice
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-invoice"
              type="text"
              placeholder="INV- XXXXX"
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-status"
              >
                <option>Waiting Payment</option>
                <option>Waiting Confirmation</option>
                <option>Confirmed</option>
                <option>Rejected</option>
                <option>Canceled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="date"
              placeholder="90210"
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 flex flex-wrap">
            <div className="md:pt-6 xs:w-1/4 md:w-3/4 ">
              <div>
                <button className="p-2.5 text-center w-full bg-bgPrimary text-white hover:font-semibold">Search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="max-h-96 overflow-y-auto flex flex-col space-y-1 border">
      <Accordion sections={accordionData}/>
      </div>
      <div className="flex justify-center space-x-1">
        <div>Prev</div>
        <div>1</div>
        <div>2</div>
        <div>Next</div>
      </div>
    </div>
    
  );
};

export default UserOrderList;
