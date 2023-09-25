import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion'



export const FormAddPropertyImage = ({ file, setFile, setPage, page }) => {

    const [data, setData] = useState(file)
    console.log(data);
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
        <div className=" p-15 w-full h-screen ">
            <motion.div
                ref={ref}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 5000 }}
                transition={{ duration: 0.4 }}
                className='w-full'
            >
                <div className="pt-10">
                    <div className="text-6xl text-gray-800 flex justify-center">Add photo of your property</div>
                    <div className="text-xl flex justify-center mt-5">Your property picture have a significant impact on sales. Please upload your best property picture!</div>
                </div>
            </motion.div>
            <div className="mt-10 mb-2 w-full h-2/3 flex justify-center ">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 7000 }}
                    transition={{ duration: 0.7 }}
                    className='w-1/2'
                >
                    <div className="w-full h-3/4">
                        <img className=" w-full h-full shadow-inner" id="selected-image" src={file.path} alt="" />
                        <input
                            type="file"
                            id="fileInput"
                            className="h-12 border-none rounded-md text-xl mt-2"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                                setData(e.target.files[0]);
                                // Tambahkan kode untuk menampilkan gambar yang dipilih
                                const selectedImage = document.getElementById('selected-image');
                                if (e.target.files.length > 0) {
                                    selectedImage.src = URL.createObjectURL(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                </motion.div>
            </div>
            <div className="w-full ">
                <div className="px-24 flex mb-5 justify-between h-full w-full">
                    <div className=" text-gray-600 text-2xl font-bold cursor-pointer hover:text-gray-900" onClick={back}>Back</div>
                    <button className=" bg-bgPrimary p-2 rounded-md text-white text-2xl font-semibold cursor-pointer hover:bg-bgPrimaryActive disabled:bg-teal-100 disabled:cursor-not-allowed" disabled={data ? false : true} onClick={next}>next</button>
                </div>
            </div>

        </div>
    )
}