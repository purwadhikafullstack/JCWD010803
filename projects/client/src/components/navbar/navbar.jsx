import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { SearchModal } from "../modal/search-modal";
import { useSelector } from "react-redux";

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  return (
    <div className="fixed w-full bg-white z-30 shadow-sm">
      <SearchModal setOpen={setOpen} open={open} />
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
          flex 
          flex-row 
          items-center 
          justify-between 
          gap-3 
          md:gap-0
          "
          >
            <Logo />
            <Search setOpen={setOpen} />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
      {token === null ? null : data.isVerified  == false ?  (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md ${hidden}"
          role="alert"
        >
          <div className="flex">
            <div className="m-auto py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex flex-wrap w-full ">
              <div className="m-auto md:w-1/2">
                <p className="font-bold">
                  Please verify your account first, to make any transaction
                </p>
              </div>
              <div className="m-auto md:w-1/2 text-right xs:mt-3 md:mt-0">
                <button
                  className="bg-btnVerify hover:bg-btnHverify text-gray-800 font-bold p-2 rounded "
                  onClick={() => {
                    navigate("/verify");
                  }}
                >
                  Verify Account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default Navbar;
