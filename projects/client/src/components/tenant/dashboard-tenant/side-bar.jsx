import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaHome, FaChevronDown } from 'react-icons/fa'; // Import ikon yang diperlukan
import { RxAvatar } from 'react-icons/rx'
import React, { useState, useEffect, useRef } from "react";
import LogoImage from "../../../assets/images/dashboardtenants.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate()
  const { pathname } = location;
  console.log(pathname);

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [propertyActive, setPropertyActive] = useState(false)
  const [orderActive, setOrderActive] = useState(false)
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const click = (value) => {
    navigate(`/${value}`)
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  },[pathname]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-400 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : " pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static 
        lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll 
        lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 
        2xl:!w-64 shrink-0 border-r shadow-xl bg-white transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        {/* LogoImage di tengah atas sidebar */}
        <div className="flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex justify-center p-4 items-center mb-10">
          <img src={LogoImage} alt="ComfyCribz" className="w-20 h-20" />
        </div>

        {/* Sidebar header */}

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <div className={`${pathname !== '/dashboard/order-list'  ? "bg-bgPrimary text-lg text-white flex cursor-pointer mb-5 justify-center items-center h-20" : "text-lg text-gray-700 flex cursor-pointer mb-5 justify-center items-center h-20"} `} onClick={() => click("dashboard")}>
              Properties
            </div>
            <div className={`${pathname === '/dashboard/order-list' ? "bg-bgPrimary text-lg text-white flex cursor-pointer mb-5 justify-center items-center h-20" : "text-lg text-gray-700 flex cursor-pointer mb-5 justify-center items-center h-20"} `} onClick={() => click("dashboard/order-list")}>
              Order list
            </div>
            <ul className="mt-3">
              {/* Dashboard */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <FaChevronDown
                size={24}
                className={`w-6 h-6 fill-current sidebar-expanded:rotate-180 ${sidebarExpanded ? 'rotate-180' : ''
                  }`}
              />
            </button>
          </div>
        </div>
        <div className="h-full pb-5 justify-center items-end flex">
          <div>
            <div>
              <div className="flex justify-center w-full mb-2"><RxAvatar size={"40"} /></div>
              <div className=" flex justify-center mb-10 w-fit ">Akmal Hamidi</div>
            </div>
            <div className="w-full flex justify-center">
              <div onClick={() => logout()} className=" bg-bgPrimary flex justify-center w-fit hover:bg-bgPrimaryActive hover:scale-95 text-white transition-all p-2 text-lg rounded-md cursor-pointer ">Log out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
