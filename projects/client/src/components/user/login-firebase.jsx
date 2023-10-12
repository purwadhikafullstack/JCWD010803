import { useDispatch } from "react-redux";
import { googleAuth } from "../../firebase";
import { setData } from "../../redux/firebase-slice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export const FireBaseLogin = ({buttonText}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onButtonClick = async () => {
    try {
      const auth = await googleAuth();
      const data = {
        userName: auth.user.displayName,
        email: auth.user.email,
        fullName: auth.user.displayName,
        phoneNumber: auth.user.providerData[0].phoneNumber,
        profileImg: auth.user.providerData[0].photoURL,
        flag: 1,
      };

      const check = await axios.post(
        `http://localhost:8000/api/user/checkFirebase`,
        data
      );

      if (!check.data.result) {
        const response = await axios.post(
          `http://localhost:8000/api/user/register`,  
          data
        );
        console.log(response);
        const tokenFireBase = auth.user.accessToken;
        const token = response.data.token;
        dispatch(setData(data));
        localStorage.setItem("firebase-token", tokenFireBase);
        localStorage.setItem("token", token);
        swal.fire({
          icon: "success",
          title: "Register Success",
          text: "Welcome!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const tokenFireBase = auth.user.accessToken;
        const token = check.data.token;

        dispatch(setData(data));
        localStorage.setItem("firebase-token", tokenFireBase);
        localStorage.setItem("token", token);
        swal.fire({
          icon: "success",
          title: "Login Success",
          text: "Welcome!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      swal.fire({
        icon: "warning",
        iconColor: "red",
        title: "Login Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <button
      className="
        bg-white
        text-lg
        p-2
        w-full
        mt-3
        text-gray-500
        shadow-md
        rounded
        active:bg-gray-200
        "
      onClick={onButtonClick}
    >
      <div className="flex justify-center">
        <FcGoogle size={"30"} />
        <div className="ml-3">{buttonText}</div>
      </div>
    </button>
  );
};
