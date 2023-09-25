import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { useState } from "react";

export const ProfileSettingSelect = ({ choose, values }) => {
  const [click, setClick] = useState("");
  const dataFireBase = useSelector((state) => state.firebase.value);
  const data = useSelector((state) => state.user.value);

  const clickChangeProfile = () => {
    setClick("changeProfile");
    choose("changeProfile");
  };

  const clickChangePassword = () => {
    setClick("changePassword");
    choose("changePassword");
  };

  const clickOrderList = () => {
    setClick("orderList");
    choose("orderList");
  };

  return (
    <div className=" w-full hidden sm:flex">
      <div className=" border rounded border-gray-300 w-full h-fit pb-10">
        <div className="w-full h-24 px-10 gap-5 border-b flex">
          <div className="my-auto">
            {data.profileImg || dataFireBase.profileImg ? (
              <img
                className="h-14 w-14 border rounded-full object-fill"
                src={`http://localhost:8000/avatars/${
                  data.profileImg || dataFireBase.imgUrl
                }`}
                alt="Avatar"
              />
            ) : (
              <RxAvatar size={"50"} color="#2CA4A5" />
            )}
          </div>
          <div className="my-auto">
            <div className="my-auto font-bold text-gray-700">
              {" "}
              {data.username ? data.username : dataFireBase.username}{" "}
            </div>
            <div className="my-auto font-thin">
              {" "}
              {data.phoneNumber || dataFireBase.phoneNumber
                ? data.phoneNumber || dataFireBase.phoneNumber
                : "Google"}{" "}
            </div>
          </div>
        </div>

        <div className=" pt-5">
          <div
            className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
							${values === "changePassword" ? "bg-bgPrimary" : "null"}
							${values === "changePassword" ? "text-white" : "text-bgPrimary"}
							border-b
							cursor-pointer
							`}
            onClick={clickChangePassword}
          >
            <div
              className={`
								my-auto
								${click === "changePassword" ? "animate-spin" : "null"}
								`}
            >
              <BiKey size={"30"} />
            </div>
            <div className="my-auto">Change password</div>
          </div>

          <div
            className={`
						flex 
						px-10
						w-full 
						h-16 
						gap-3
						${values === "changeProfile" ? "bg-bgPrimary" : "null"}
						${values === "changeProfile" ? "text-white" : "text-bgPrimary"}
						border-b
						cursor-pointer
						`}
            onClick={clickChangeProfile}
          >
            <div
              className={`
							my-auto
							${click === "changeProfile" ? "animate-spin" : "null"}
							`}
            >
              <BiKey size={"30"} />
            </div>
            <div className="my-auto">My profiles</div>
          </div>

          <div
            className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
              ${values === "orderList" ? "bg-bgPrimary" : "null"}
						  ${values === "orderList" ? "text-white" : "text-bgPrimary"}
							border-b
							cursor-pointer
							`}
            onClick={clickOrderList}
          >
            <div
              className={`
								my-auto
                ${click === "orderList" ? "animate-spin" : "null"}
								`}
            >
              <BiKey size={"30"} />
            </div>
            <div className="my-auto">My order</div>
          </div>
        </div>
      </div>
    </div>
  );
};
