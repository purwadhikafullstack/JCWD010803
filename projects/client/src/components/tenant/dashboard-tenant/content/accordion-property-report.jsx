import React, { useState } from "react";

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

const AccordionSection = ({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) => {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  // const fullname = `${section.user.firstName} ${section.user.lastName}`;
  console.log(section.item.rooms);
  return (
    <div
      className={`p-4 border rounded-md  ${
        isActiveSection === true ? "hover:bg-white" : "hover:bg-[#f1f5f9]"
      }`}
    >
      <div className="cursor-pointer " onClick={toggleSection}>
        <div
          className=" mb-0 sm:justify-between sm:flex text-md font-semibold leading-7 text-gray-700"
          id="header-content-sales-report"
        >
          <p className="md:text-3xl">{section.item.propertyName}</p>
        </div>
        {isActiveSection == false && (
          <sub className="font-thin text-slate-600 ">
            Click to see sales details
          </sub>
        )}
      </div>
      {isActiveSection && (
        <div className="mt-1 sm:px-1">
          <hr />
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="mt-4 text-base font-semibold leading-7 text-gray-700">
                Property Details
              </h3>
              {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Transaction details.
              </p> */}
            </div>
            <div className="border-gray-100">
              <div className="mt-3 border-t border-gray-200">
                <dl className="md:mt-3 divide-y divide-gray-100">
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Hotel Name :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {section.item.propertyName}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Location :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {section.item.detailLocation}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Register Since :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {formatDate(section.item.createdAt)}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Revenue :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {section.totalRevenue
                        ? currency(section.totalRevenue)
                        : "0"}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Visitor :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {section.totalVisitor}
                    </dd>
                  </div>
                  {section.item.rooms.length > 0 ? (
                    <>
                      {section.item.rooms.map((value, index) => (
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Rooms {index + 1}:
                          </dt>
                          <dd className="mt-1 gap-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <p>Name : {value.roomName}</p> 
                            <p>Price : {currency(value.price)} {" /night"}</p> 
                            <p>Total : {value.QTY} {" rooms"}</p> 
                          </dd>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Rooms :
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      No Room Registered
                    </dd>
                  </div>
                  )}

                  <div className=" px-4 py-2 sm:px-0 flex justify-end">
                    <div
                      className="bg-red-600 py-1 px-3 xs:mt-2 cursor-pointer rounded-md text-white "
                      onClick={toggleSection}
                    >
                      Close
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccordionProperty = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <div className="space-y-1">
      {sections.map((section, index) => (
        <AccordionSection
          section={section}
          key={index}
          isActiveSection={index === activeIndex}
          setActiveIndex={setActiveIndex}
          sectionIndex={index}
        />
      ))}
    </div>
  );
};

export default AccordionProperty;
