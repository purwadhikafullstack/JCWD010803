import { useState } from "react"
import { FormForgotPassword } from "../../components/user/form-forgot-password"
import { VerifyOtp } from "../../components/user/form-verify-otp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const ForgotPassword = () => {
	const [success, setSuccess] = useState(false)
	const [token, setToken] = useState("")


	const handleChange = (value) => {
		setSuccess(value)
	}
	const getToken = (token) => {
		setToken(token)
	}

	const [ref, inView] = useInView({
		triggerOnce: true
	})

	return (
		<div>
			{success ?
				(

					<div className="flex">
						<div className="bg-center hidden sm:block w-screen h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/007/779/163/non_2x/creative-concept-idea-key-to-success-light-bulb-energy-and-symbol-search-for-new-creative-thoughts-cartoon-style-flat-modern-design-illustration-vector.jpg')] bg-no-repeat bg-cover"></div>
						<div className="w-full sm:w-2/3 px-14 pt-20">
							<motion.div
								ref={ref}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: success ? 1 : 0, x: success ? 0 : 800 }}
								transition={{ duration: 1.5 }}
							>
								<div>
									<VerifyOtp token={token} />
								</div>
							</motion.div>
						</div>
					</div>

				) : (

					<div className="flex">
						<div className="bg-center hidden sm:block w-screen h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/007/779/163/non_2x/creative-concept-idea-key-to-success-light-bulb-energy-and-symbol-search-for-new-creative-thoughts-cartoon-style-flat-modern-design-illustration-vector.jpg')] bg-no-repeat bg-cover"></div>
						<div className="w-full sm:w-2/3 px-14 pt-20">
							<motion.div
								ref={ref}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 800 }} // Change animation based on inView
								transition={{ duration: 0.7 }}
							>
								<div>
									<div className=" text-6xl flex flex-wrap w-80 font-bold text-bgPrimary">
										Forgot Password ?
									</div>
									<div className="mt-10 text-xl text-gray-600">
										Enter the email address for verify your account.
									</div>
									<FormForgotPassword token={getToken} value={handleChange} />
								</div>
							</motion.div>
						</div>
					</div>
				)}
		</div>
	)
}