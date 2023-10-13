import React from "react";

const Spinner = () => (
  <div className="w-full flex opacity-60">
    <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-[#f8fafc] border-4 h-5 w-5 text-center"></div>
    <div className="text-white font-semibold pl-2">Processing</div>
  </div>
);

export default Spinner;
