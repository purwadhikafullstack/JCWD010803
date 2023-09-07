import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { useState } from "react";

export const ProfileSettingSelect = ({choose}) => {
    const [click, setClick] = useState("")    
    const dataFireBase = useSelector((state) => state.firebase.value)
	const data = useSelector((state) => state.user.value)

    const clickChangePassword = () => {
		setClick("changePassword")
        choose("changePassword")
	}
    return(
        <div className=" w-full hidden sm:flex">
					<div className=" border rounded border-gray-300 w-full h-fit pb-10">
						<div className="w-full h-24 px-10 gap-5 border-b flex">
							<div className="my-auto"> {data.profileImg || dataFireBase.profileImg  ? data.profileImg  || dataFireBase.imgUrl : <RxAvatar size={"50"} color="#2CA4A5" />} </div>
							<div className="my-auto">
								<div className="my-auto font-bold text-gray-700"> {data.userName? data.userName : dataFireBase.userName} </div>
								<div className="my-auto font-thin"> {data.phoneNumber || dataFireBase.phoneNumber ? data.phoneNumber || dataFireBase.phoneNumber : "Google"} </div>
							</div>
						</div>

						<div className=" pt-5">
							<div className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
							${click === "changePassword" ? "bg-bgPrimary" : "null"}
							${click === "changePassword" ? "text-white" : "text-bgPrimary"}
							border-b
							cursor-pointer
							`}
								onClick={clickChangePassword}
							>
								<div className={`
								my-auto
								${click === "changePassword" ? "animate-spin" : "null"}
								`}
								>
									<BiKey size={"30"} />
								</div>
								<div className="my-auto">Change password</div>
							</div>

							<div className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
							border-b
							cursor-pointer
							`}
							>
								<div className={`
								my-auto
								`}
								>
									<BiKey size={"30"} />
								</div>
								<div className="my-auto">My profile</div>
							</div>
							<div className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
							border-b
							cursor-pointer
							`}
								onClick={clickChangePassword}
							>
								<div className={`
								my-auto
								`}
								>
									<BiKey size={"30"} />
								</div>
								<div className="my-auto">My order</div>
							</div>
						</div>
					</div>
				</div>
    )
}