import { useState } from "react"
import { FormAddPropertyImage } from "../../components/tenant/property/form-add-property-image"
import { useNavigate } from 'react-router-dom'
import { FormAddPropertyName } from "../../components/tenant/property/form-add-property-name"
import { FormAddPropertyDesc } from "../../components/tenant/property/form-add-property-desc"
import { FormAddPropertyCat } from "../../components/tenant/property/form-add-property-cat"
import { motion } from 'framer-motion'
import { useInView } from "react-intersection-observer";
import swal from 'sweetalert2'
import axios from "axios"

export const AddProperty = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [page, setPage] = useState(1)
    const [file, setFile] = useState("")
    const [categoryName, setCategoryName] = useState("") 
    const [propertyName, setPropertyName] = useState("")
    const [propertyDesc, setPropertyDesc] = useState("")
    const [propertyCategory, setPropertyCategory] = useState("")


    const [ref, inView] = useInView({
        triggerOnce: true,
    });

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

    const createProperty = async () => {
        const formData = new FormData()
        formData.append("propertyName", propertyName)
        formData.append("propertyDesc", propertyDesc)
        formData.append("file", file)
        formData.append("categoryId", propertyCategory)
        try {
            const response = await axios.post('http://localhost:8000/api/properties', formData, {
                headers: { Authorization: `Bearer: ${token}` }
            })
            swal.fire({
                icon: 'success',
                title: 'Add property success',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate('/dashboard')

        } catch (error) {
            swal.fire({
                icon: 'warning',
                iconColor: 'red',
                title: 'Add property failed',
                text: error.response.data.message,
            });
        }
    }

    return (
        <div className="h-screen">
            <div className={`w-full ${page === 1 ? "flex" : "hidden"} justify-center  h-5/6`}>
                <div>
                    <div className="w-full px-14 h-full my-auto items-center flex">
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 1, y: 50 }}
                            animate={{ opacity: inView ? 1 : 1, x: inView ? 0 : -600 }}
                            transition={{ duration: 1 }}
                            className='w-full'
                        >

                            <div className="w-full flex justify-center">
                                <div>
                                    <div className="text-6xl font-semibold text-gray-700">Prepare the data needed <div>to add the property</div></div>
                                    <div className="mt-4 text-xl w-1/2">
                                        At this point, you'll create a title and description, and add the best photos of your property.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 1, y: 50 }}
                            animate={{ opacity: inView ? 1 : 1, x: inView ? 0 : 600 }}
                            transition={{ duration: 1 }}
                            className='w-2/3'
                        >
                            <div className="h-full w-full flex justify-center">
                                <img src="https://i.pinimg.com/736x/01/fe/eb/01feeb775e8af7228eb536aa19620a66.jpg" alt="" />
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full ">
                        <div className="px-10 flex mb-5 justify-between h-full w-full">
                            <div className=" text-gray-600 text-2xl font-bold cursor-pointer hover:text-gray-900" onClick={back}>Back</div>
                            <div className=" bg-bgPrimary p-2 rounded-md text-white text-2xl font-semibold cursor-pointer hover:bg-bgPrimaryActive" onClick={next}>next</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {page === 2 ?
                    <FormAddPropertyImage file={file} setFile={setFile} page={page} setPage={setPage} /> :
                    null
                }
            </div>
            <div>
                {page === 3 ?
                    <FormAddPropertyName propertyName={propertyName} setPropertyName={setPropertyName} page={page} setPage={setPage} /> :
                    null
                }
            </div>
            <div>
                {page === 4 ?
                    <FormAddPropertyDesc propertyDesc={propertyDesc} setPropertyDesc={setPropertyDesc} page={page} setPage={setPage} /> :
                    null
                }
            </div>
            <div>
                {page === 5 ?
                    <FormAddPropertyCat onClick={createProperty} categoryName={categoryName} setCategoryName={setCategoryName} propertyCategory={propertyCategory} setPropertyCategory={setPropertyCategory} page={page} setPage={setPage} /> :
                    null
                }
            </div>

        </div>
    )
}