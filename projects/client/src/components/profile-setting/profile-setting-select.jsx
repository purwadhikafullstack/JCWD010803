import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { BiKey } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProfileSettingSelect = ({ reload, choose, values }) => {
  const [click, setClick] = useState("");
  const dataFireBase = useSelector((state) => state.firebase.value);
  const data = useSelector((state) => state.user.value);
  const tokenFireBase = localStorage.getItem("firebase-token")
  const token = localStorage.getItem("token")
  const [image, setImage] = useState("")

  const getUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/keepLogin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setImage(response.data.profileImg)
    } catch (error) {
      console.log(error);
    }
  };
  

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

  useEffect(() => {
    getUser()
  }, [reload]);

  return (
    <div className=" w-full hidden sm:flex">
      <div className="rounded bg-white w-full h-fit">
        <div className="w-full h-24 px-10 gap-5 border-b flex">
          <div className="my-auto">
            {image || dataFireBase.profileImg ? (
              <img
                className="h-14 w-14 border rounded-full object-fill"
                src={`${process.env.REACT_APP_API_IMG_URL}/avatars/${
                  image || dataFireBase.imgUrl
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
              {data.username ? data.username : dataFireBase.userName}{" "}
            </div>
            <div className="my-auto font-thin">
              {" "}
              {data.phoneNumber || dataFireBase.phoneNumber
                ? data.phoneNumber || dataFireBase.phoneNumber
                : "Google"}{" "}
            </div>
          </div>
        </div>

        <div className="">
          <div
            className={`
						px-10
						w-full 
						h-16 
						gap-3
						${values === "changeProfile" ? "bg-bgPrimary" : "null"}
						${values === "changeProfile" ? "text-white" : "text-gray-700"}
            ${tokenFireBase ? "hidden" : "flex"}
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
            ></div>
            <div className="my-auto">My profiles</div>
          </div>

          <div
            className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
							${values === "changePassword" ? "bg-bgPrimary" : "null"}
							${values === "changePassword" ? "text-white" : "text-gray-700"}
              ${tokenFireBase ? "hidden" : "flex"}
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
            ></div>
            <div className="my-auto">Change password</div>
          </div>

          <div
            className={`
							flex 
							px-10
							w-full 
							h-16 
							gap-3
              ${values === "orderList" ? "bg-bgPrimary" : "null"}
						  ${values === "orderList" ? "text-white" : "text-gray-700"}
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
            ></div>
            <div className="my-auto">My order</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
