import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { FormChangePassword } from "../../components/profile-setting/form-change-password";
import { ProfileSettingSelect } from "../../components/profile-setting/profile-setting-select";
import { ProfileSettingSelectTop } from "../../components/profile-setting/profile-setting-select-top";
import FormChangeProfile from "../../components/profile-setting/form-change-profile";
import UserOrderList from "../../components/profile-setting/user-order-component";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
export const ProfileSetting = () => {
	const [click, setClick] = useState("changeProfile")
	const [reload, setReload] = useState(false)
	const tokenFireBase = localStorage.getItem('firebase-token')
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const handleClick = (value) => {
		setClick(value)
	}
	useEffect(() => {
		if (tokenFireBase) {
			setClick("orderList")
		}
		if(!token && !tokenFireBase){
			navigate("/");
		}
	},[])

	return (
		<div>
			<div className="w-full fixed border-4">
				<Navbar />
			</div>
			<div className="w-full pt-32 mt-5 items-end flex sm:hidden ">
				<div className="w-full">
					<ProfileSettingSelectTop  choose={handleClick} value={click} />
				</div>
			</div>
			<div className="block min-h-screen sm:flex sm:px-0 w-full gap-2 pt-2 sm:pt-44 sm:pb-10 bg-[#f3f4f6] justify-center">
				
				<div className="w-1/5">
					<ProfileSettingSelect reload={reload} setReload={setReload} choose={handleClick} value={click} />
				</div>
				<div className=" w-full sm:w-3/5 h-fit bg-white rounded-md flex ">
					{
					click === "changePassword" ? (<FormChangePassword />) 
					: click ==="changeProfile" ? (<FormChangeProfile  setReload={setReload} reload={reload} />) 
					: click ==="orderList" ? (<UserOrderList />) : (null) 
					}
				</div>
			</div>
		</div>
	)
}