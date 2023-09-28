import React, { useState } from "react";
import UploadPay from "../modal/upload-payment";


function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function stayLong(checkInDate, checkOutDate) {

  const i = new Date(checkInDate);
  const o = new Date(checkOutDate);
  const long =
    i.getDate().toString().padStart(2, "0") -
    i.getDate().toString().padStart(2, "0");
  return `${long}`;
}

const AccordionSection = ({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) => {

  const [openModal, setOpenModal] = useState(false);
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  return (
    <div className="p-2 border ">
      <div className="cursor-pointer" onClick={toggleSection}>
        <div className="flex flex-wrap justify-between mb-2 w-full">
          <h3>{section.room.property.propertyName}</h3>
          <p className="text-slate-600">{formatDate(section.createdAt)}</p>
        </div>
        <div>
          <p className="text-slate-600">
            {formatDate(section.onBooking.checkIn)} -{" "}
            {stayLong(section.onBooking.checkIn, section.onBooking.checkOut)}{" "}
            Night - {section.room.property.category.category}
          </p>
        </div>
        {section.statusId == 1 ? (
          <div className="py-1 flex flex-wrap justify-between ">
            <span className="border bg-[#1da1f2] px-2 rounded-md text-slate-800">
              Need Upload Payment Receipt
            </span>
            <span className="text-[#f59e0b]">{section.status.status}</span>
          </div>
        ) : (
          <div className="py-1 flex flex-wrap justify-end ">
            <span className="text-[#f59e0b]">{section.status.status}</span>
          </div>
        )}
      </div>

      {/* ini nih yang bikin sembunyi */}
      {isActiveSection && (
        <div>
          <div>Ini adalah konten</div>
          <div className="text-right">
            {section.statusId == 1 ? (
              <>
                <button
                  className="bg-bgPrimary p-1 text-white font-semibold rounded-sm"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Upload Payment
                </button>
                {openModal && <UploadPay closeModal={setOpenModal} data={section} />}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ sections }) => {
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
        />
      ))}
    </>
  );
};

export default Accordion;
