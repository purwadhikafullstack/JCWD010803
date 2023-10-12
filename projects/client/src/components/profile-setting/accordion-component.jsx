import React, { useState } from "react";
import UploadPay from "../modal/upload-payment";
import ReviewModal from "../modal/review-modal";

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function currency(money) {
  let newFormat = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${newFormat},-`;
}

function stayLong(checkInDate, checkOutDate) {
  const i = new Date(checkInDate);
  const o = new Date(checkOutDate);
  const long =
    o.getDate().toString().padStart(2, "0") -
    i.getDate().toString().padStart(2, "0");
  return `${long}`;
}

const AccordionSection = ({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  setReload,
  reload,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  let customStyle = "";
  let customText = "";
  if (section.statusId == 1) {
    customStyle = "rounded-md text-white bg-[#ea580c] px-2"
    customText = "text-[#ea580c] font-semibold"
  }
  if (section.statusId == 2) {
    customStyle = "rounded-md text-white bg-[#facc15] px-2"
    customText = "text-[#facc15] font-semibold"
  }
  if (section.statusId == 3) {
    customStyle = "rounded-md text-white bg-[#84cc16] px-2"
    customText = "text-[#84cc16] font-semibold"
  }
  if (section.statusId == 4 || section.statusId == 5 || section.statusId == 6) {
    customStyle = "rounded-md text-white bg-[#dc2626] px-2"
    customText = "text-[#dc2626] font-semibold"
  }
  if (section.statusId == 7) {
    customStyle = "rounded-md text-white bg-[#2563eb] px-2"
    customText = "text-[#2563eb] font-semibold"
  }
  return (
    <div className="xs:p-2 md:p-3 border rounded-md ">
      <div className="cursor-pointer" onClick={toggleSection}>
        <div className="flex flex-wrap justify-between mb-2 w-full">
          <h3>{section.room.property.propertyName}</h3>
          <p className="text-slate-600 text-sm">Transaction date : {formatDate(section.createdAt)}</p>
        </div>
        {isActiveSection == false ? (
          <>
          {section.statusId == 1 ? (
          <div className="py-1 flex flex-wrap justify-between">
          <span className="text-sm text-slate-500">Click to see details order</span>
            <span className={customStyle}>Need Upload Payment Receipt</span>
          </div>
        ) : (
          <div className="py-1 flex flex-wrap justify-between">
            <span className="text-sm text-slate-500">Click to see details order</span>
            <span className={customStyle}>
              {section.status.status}{" "}
              {section.statusId == 7 && section.isReview == false
                ? " - Give A Review"
                : null}{" "}
            </span>
          </div>
        )}
          </>
        ) : (null)}
        
      </div>

      {isActiveSection && (
        <div>
          <div className="">
            <div className="px-2">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Transaction code :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  # {section.id}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Guest :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {section.user.firstName} {section.user.lastName}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Room :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {section.room.roomName}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Stay :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {stayLong(
                    section.onBooking.checkIn,
                    section.onBooking.checkOut
                  )}{" "}
                  Night
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  CheckIn :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formatDate(section.onBooking.checkIn)} - 02 : 00 PM
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  CheckOut :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formatDate(section.onBooking.checkOut)} - 10 : 00 AM
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Total Payment :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {currency(section.totalPayment)}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Transaction status :
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className={customText}>{section.status.status}</span>
                </dd>
              </div>
              {section.statusId == 1 ? (
                <div className="xs:mt-2">
                  <button
                    className="text-blue-600 font-semibold rounded-sm"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <p>Upload Payment {'>>>'} </p>
                  </button>
                  {openModal && (
                    <UploadPay
                      setReload={setReload}
                      reload={reload}
                      closeModal={setOpenModal}
                      data={section}
                    />
                  )}
                </div>
              ) : null}
              <div className="flex justify-end xs:mt-1">
                <span className="bg-red-600 px-2 py-1 rounded-md cursor-pointer text-white" onClick={toggleSection}>Close</span>
              </div>
            </div>
          </div>
          {section.statusId == 7 && section.isReview == false ? (
            <ReviewModal
              toggleSection={toggleSection}
              setReload={setReload}
              reload={reload}
              data={section}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ sections, setReload, reload }) => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <>
      {sections.map((section, index) => (
        <AccordionSection
          section={section}
          key={index}
          isActiveSection={index === activeIndex}
          setActiveIndex={setActiveIndex}
          sectionIndex={index}
          setReload={setReload}
          reload={reload}
        />
      ))}
    </>
  );
};

export default Accordion;
