import React, { useState } from "react";

const AccordionSection = ({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex
}) => {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  return (
    <div className="p-2 border cursor-pointer" onClick={toggleSection}>
      <div>
        <div className="flex flex-wrap justify-between mb-2 w-full">
          <h3>Accordion Title</h3>
          <p className="text-slate-600">24-September-2023</p>
        </div>
        <div>
          <p className="text-slate-600">
            Sun 24 Sept 2023 - 1 Night - Central Jakarta
          </p>
        </div>
        <div className="py-1 flex flex-wrap justify-between">
          <span className="border bg-[#1da1f2] px-2 rounded-md text-slate-800">
            Need Upload Payment Confirmation
          </span>
          <span className="text-[#f59e0b]">Need Confirmation</span>
        </div>
      </div>
      {/* ini nih yang bikin sembunyi */}
      {isActiveSection && 
        <div>
          <div>{section.content}</div>
          <div className="text-right"><button className="bg-bgPrimary p-1 text-white font-semibold rounded-sm">Upload Payment</button></div>
        </div>}
    </div>
  );
};

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
