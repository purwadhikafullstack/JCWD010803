import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
 

export const VerifyOtp = ({token}) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(["", "", "", ""]);
    console.log(otp);

    const handleClick = (elementIndex, event) => {
        if (/[^0-9]/.test(event.target.value)) {
            return;
        }

        otp[elementIndex] = event.target.value;

        if (elementIndex < otp.length - 1 && event.target.value !== "") {
            document.getElementById(`otp-input-${elementIndex + 1}`).focus();
        }

        setOtp([...otp]);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`http://localhost:8000/api/user/checkOtp`, { otp: `${otp.join('')}` })
            Swal.fire({
                icon: "success",
                title: "Verify OTP success",
                text: "You can reset your password now",
                timer: 1500
            })
            setTimeout(() => {
                navigate(`/reset-password/${token}`)
            }, 2000)
        } catch (error) {
            Swal.fire({
                icon: "warning",
                iconColor: "red",
                title: 'Failed verify OTP',
                text: error.response.data.message,
                timer: 2000
            })
            console.log(error);
        }
    };
    return (
        <div className="mt-28 flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-4xl font-thin text-bgPrimary">
                    Enter your OTP
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            {otp.map((d, i) => (
                                <input
                                    className="
                                    w-10 
                                    text-center 
                                    text-xl 
                                    outline-none 
                                    border-2
                                    rounded-xl"
                                    type="text"
                                    id={`otp-input-${i}`}
                                    key={i}
                                    value={d}
                                    onChange={(e) => handleClick(i, e)}
                                    maxLength="1"
                                />
                            ))}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="mt-10 w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-bgPrimary active:bg-bgPrimaryActive"
                            >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}