import { useSelector } from "react-redux";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { FormChangePassword } from "../../components/profile-setting/form-change-password";
import { ProfileSettingSelect } from "../../components/profile-setting/profile-setting-select";
import { ProfileSettingSelectBottom } from "../../components/profile-setting/profile-setting-select-bottom";

export const ProfileSetting = () => {
	const [click, setClick] = useState("changePassword")

	const handleClick = (value) => {
		setClick(value)
	}

	return (
		<div>
			<div className=" h-20 w-full fixed border-4">Navbar</div>
			<div className="block sm:flex sm:px-0 w-full h-screen pt-28 sm:pb-10 gap-5 justify-center">
				<div>
					<ProfileSettingSelect choose={handleClick} />
				</div>
				<div className=" w-full sm:w-1/2 h-fit rounded border-gray-300 border flex ">
					{click === "changePassword" ? (<FormChangePassword />) : (null)}
				</div>
				<div className="w-full mt-5 bg-red-200 items-end flex sm:hidden ">
					<div className="w-full">
						<ProfileSettingSelectBottom />
					</div>
				</div>
			</div>
		</div>
	)
}