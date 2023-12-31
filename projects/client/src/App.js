import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth, { googleAuth } from "./firebase";
import { setValue } from "./redux/user-slice";
import { setData } from "./redux/firebase-slice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const firebaseToken = localStorage.getItem("firebase-token");

  useEffect(() => {
    const keepLogin = async () => {
      if (token) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user/keepLogin`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setValue(response.data));
      } if (firebaseToken) {
        auth.onAuthStateChanged(user => {
          const userData = {
            uid: user.uid,
            userName: user.displayName,
            email: user.email,
            profileImg : user.providerData[0].photoURL,
            phoneNumber : user.providerData[0].phoneNumber,
            flag : 1
          };
          
          dispatch(setData(userData))
        })
      }
      if (!token) {
        localStorage.removeItem('token')
      }
    };
    keepLogin()
  },[ token, firebaseToken, dispatch]);

  

}

export default App;
