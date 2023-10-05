import { useState } from "react"
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";

export const FormAddPropertyName = ({ setPage, propertyName, page, setPropertyName }) => {
    const [data, setData] = useState(propertyName)
    const navigate = useNavigate();
    const next = () => {
        setPage(page + 1)
    }
    const back = () => {
        if (page > 1) {
            setPage(page - 1)
        }
        if (page === 1) {
            navigate('/dashboard')
        }
    }

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    return (
        <div className="w-screen h-screen flex justify-center items-end">
            <div className="w-full h-full">
                <div className="w-full h-5/6 flex justify-center items-end pt-10">
                    <div className="w-2/4 h-5/6">
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 5000 }}
                            transition={{ duration: 0.4 }}
                            className='w-full'
                        >
                            <div className="w-full ">
                                <div className=" text-4xl flex justify-center text-gray-800">Now, please provide a name for your property.</div>
                                <div className=" text-xl flex justify-center mt-5 text-gray-600">Give a name that is easy for users to remember</div>
                            </div>
                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 7000 }}
                            transition={{ duration: 0.7 }}
                            className='w-full'
                        >
                            <div className="mt-10 p-10">
                                <input
                                    type="text"
                                    className=" border-gray-600 text-2xl px-5 border rounded-xl w-full h-20"
                                    onChange={(e) => {
                                        setData(e.target.value)
                                        setPropertyName(e.target.value)
                                    }}
                                    defaultValue={propertyName}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full mt-12 ">
                    <div className="px-24 flex mb-5 justify-between h-full w-full">
                        <div className=" text-gray-600 text-2xl font-bold cursor-pointer hover:text-gray-900" onClick={back}>Back</div>
                        <button className=" bg-bgPrimary p-2 rounded-md text-white text-2xl font-semibold cursor-pointer hover:bg-bgPrimaryActive disabled:bg-teal-100 disabled:cursor-not-allowed" disabled={data ? false : true} onClick={next}>next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}