import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import React, { useState, useCallback } from "react";
import MenuItem from "./menu-item";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../redux/user-slice";
import { setData } from "../../redux/firebase-slice";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const tokenFireBase = localStorage.getItem("firebase-token")

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [token, tokenFireBase]);

  const toLogin = () => {
    navigate("/login");
  };
  const toLogout = () => {
    if (token || tokenFireBase) {
      localStorage.removeItem("firebase-token")
      localStorage.removeItem("token");
      dispatch(setValue(""));
      dispatch(setData(""));
      navigate('/login')
      Swal.fire({
        icon: "success",
        title: "Log out success",
        timer: 1000
      })
    }
    setIsOpen(false);
  };
  const toRegister = () => {
    navigate("/register");
  };
  const toDashboard = () => {
    navigate("/dashboard");
  };
  const toLoginTenant = () => {
    navigate("/login-tenant")
  }
  const toProfileSetting = () => {
    navigate("/profile-setting");
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {data.roleId === 1 ?
          <div
            className={`
            ${tokenFireBase ? "hidden" : "flex"}
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            `}
            onClick={toDashboard}
          >
            Back To Dashboard
          </div>
          :
          <div
            className={`
            ${tokenFireBase ? "hidden" : "flex"}
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            `}
            onClick={toLoginTenant}
          >
            Cribs That Feel Like Home
          </div>
        }
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        bg-bg-secondary
        right-0
        top-12
        text-sm
        "
        >
          <div className="flex rounded-xl flex-col cursor-pointer bg-white">
            {token ? (
              <div>
                <MenuItem onClick={toProfileSetting} label="Profile" />
                <MenuItem onClick={toLogout} label="Log out" />
              </div>
            ) : (
              <div>
                <MenuItem onClick={toLogin} label="Login" />
                <MenuItem onClick={toRegister} label="Sign up" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
