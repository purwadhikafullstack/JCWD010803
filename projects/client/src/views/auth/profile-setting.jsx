import { useSelector } from "react-redux";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { FormChangePassword } from "../../components/user/form-change-password";

export const ProfileSetting = () => {
	const data = useSelector((state) => state.firebase.value)
	const [click, setClick] = useState("")

	const clickChangePassword = () => {
		setClick("changePassword")
	}

	return (
		<div>
			<div className=" h-20 w-full fixed border-4">Navbar</div>
			{/* profile setting */}
			<div className="flex w-full h-screen pt-28 pb-10 gap-5 justify-center">
				<div className=" w-1/4  flex">
					<div className=" border rounded border-gray-300 w-full h-fit pb-10">
						<div className="w-full h-24 px-10 gap-5 border-b flex">
							<div className="my-auto"> {data.imgUrl ? data.imgUrl : <RxAvatar size={"50"} color="#2CA4A5" />} </div>
							<div className="my-auto">
								<div className="my-auto font-bold text-gray-600"> {data.displayName} </div>
								<div className="my-auto font-thin"> {data.phoneNumber ? data.phoneNumber : "Google"} </div>
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

				<div className="w-1/2 h-fit rounded border-gray-300 border flex ">
					<FormChangePassword />
				</div>
			</div>
		</div>
	)
}