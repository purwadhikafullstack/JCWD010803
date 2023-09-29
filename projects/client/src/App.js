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
          `http://localhost:8000/api/user/keepLogin`,
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
            email: user.email
          };
          dispatch(setData(userData))
        })
      }
      if (!token) {
        localStorage.removeItem('token')
      }
    };
    keepLogin()
  },[dispatch, token, firebaseToken]);
}

export default App;
