import { useDispatch } from "react-redux"
import { googleAuth } from "../../firebase"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert2'
import { FcGoogle } from "react-icons/fc";
import { setValue } from "../../redux/user-slice"


export const FireBaseLogin = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const onButtonClick = async () => {
        try {

            const auth = await googleAuth()
            const data = {
                username: auth.user.displayName,
                email: auth.user.email
            };
            console.log(data);
            dispatch(setValue(data))
            const token = auth.user.accessToken
            localStorage.setItem('firebase-token', token)
            swal.fire({
                icon: 'success',
                title: 'Login Success',
                text: 'Welcome!',
                timer: 2500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.log(error);
            swal.fire({
                icon: 'warning',
                iconColor: 'red',
                title: 'Login Failed',
                text: error.response.data.message,
            });
        }
    }

    return (
        <button className="
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
                <div className="ml-3">Sign In With Google</div>
            </div>
        </button>
    )
}