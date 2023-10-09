import { useSelector } from "react-redux";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { FormChangePassword } from "../../components/profile-setting/form-change-password";
import { ProfileSettingSelect } from "../../components/profile-setting/profile-setting-select";
import { ProfileSettingSelectTop } from "../../components/profile-setting/profile-setting-select-top";
import FormChangeProfile from "../../components/profile-setting/form-change-profile";
import UserOrderList from "../../components/profile-setting/user-order-component";
import Navbar from "../../components/navbar/navbar";

export const ProfileSetting = () => {
	const [click, setClick] = useState("changePassword")

	const handleClick = (value) => {
		setClick(value)
	}

	return (
		<div>
			<div className="">
				<Navbar />
			</div>
			<div className="w-full pt-40 mt-5 items-end flex sm:hidden ">
				<div className="w-full">
					<ProfileSettingSelectTop choose={handleClick} value={click} />
				</div>
			</div>
			<div className="block sm:flex sm:px-0 w-full h-screen pt-2 sm:pt-44 sm:pb-10 gap-5 justify-center">
				<div className="w-1/5">
					<ProfileSettingSelect choose={handleClick} value={click} />
				</div>
				<div className=" w-full sm:w-3/5 h-fit rounded border-gray-300 border flex ">
					{click === "changePassword" ? (<FormChangePassword />) 
					: click ==="changeProfile" ? (<FormChangeProfile />) 
					: click ==="orderList" ? (<UserOrderList />) : (null) }
				</div>
			</div>
		</div>
	)
}