import { FormResetPassowrd } from "../../components/user/form-reset-password"
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const ResetPassword = () => {
    const [ref, inView] = useInView({
        triggerOnce: true
    })
    return (
        <div>
            <div className=" h-screen flex justify-end">
                <div className=' bg-center w-screen hidden sm:block bg-[url(https://abcdindex.com/images/3ae7ae827af3a12cbff77f6c620767a0.png)] bg-no-repeat bg-contain ' ></div>
                <div className=" w-4/5 bg-white justify-center flex mt-48">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: inView ? 1: 0, x: inView ? 0 : 800 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className=" ml-10 w-full">
                            <div className=" text-5xl text-bgPrimary font-bold">
                                Reset your password
                            </div>
                            <FormResetPassowrd />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}