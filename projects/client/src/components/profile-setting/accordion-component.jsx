import React, { useState } from "react";
import UploadPay from "../modal/upload-payment";
import ReviewModal from "../modal/review-modal";
import axios from "axios";
import Swal from "sweetalert2";

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
    o.getDate().toString().padStart(2, "0");
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
  console.log(section);

  const [openModal, setOpenModal] = useState(false);

  const cancelOrder = async () => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You Want to Cancel This Order?",
      confirmButtonText: "Yes",
      showCancelButton: true,
      confirmButtonColor: "#2CA4A5",
      cancelButtonColor: "#e3e3e3",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.patch(
          "http://localhost:8000/api/order/cancel",
          { transactionId: section.id, roomId: section.roomId }
        );
        setReload(!reload);
      }
    });
  };

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
            <span className="text-[#f59e0b]">
              {section.status.status}{" "}
              {section.statusId == 7 && section.isReview == false
                ? " - Give A Review"
                : null}{" "}
            </span>
          </div>
        )}
      </div>

      {isActiveSection && (
        <div>
          {/* <div>Ini adalah konten</div> */}
          <div className="text-right w-full justify-end gap-5 flex">
            {section.statusId === 1 || section.statusId === 2 ? (
              <button
                onClick={cancelOrder}
                className="p-2 bg-red-700 text-white rounded-sm hover:bg-red-600 transition-all"
              >
                Cancelled Order
              </button>
            ) : null}
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
                {openModal && (
                  <UploadPay
                    setReload={setReload}
                    reload={reload}
                    closeModal={setOpenModal}
                    data={section}
                  />
                )}
              </>
            ) : null}
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
