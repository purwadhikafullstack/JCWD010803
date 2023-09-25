import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion'
import axios from "axios";
import Select from "react-select";


export const FormAddPropertyCat = ({ setPage, onClick, propertyCategory, page, setPropertyCategory, categoryName, setCategoryName }) => {
  const [data, setData] = useState("")
  const [category, setCategory] = useState([])
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

  const getCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/properties/allCategories`)
      setCategory(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="w-screen h-screen flex justify-center items-end">
      <div className="w-full h-full">
        <div className="w-full h-5/6 flex justify-center items-end pt-10">
          <div className="w-2/4 h-5/6">
            <motion.div
              ref={ref}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 3000 }}
              transition={{ duration: 0.4 }}
              className='w-full'
            >
              <div className="w-full ">
                <div className=" text-4xl flex justify-center text-gray-800">Where your property location?</div>
                <div className=" text-xl flex justify-center mt-5 text-gray-600">Specifying the location can make it easier for users to find your property.</div>
              </div>
            </motion.div>
            <motion.div
              ref={ref}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: inView ? 1 : 1, y: inView ? 0 : 5000 }}
              transition={{ duration: 0.7 }}
              className='w-full'
            >
              <div className="mt-10 p-10">
                <Select
                  className="w-full h-12 rounded-md text-xl"
                  options={category.map(item => ({
                    value: item.id,
                    label: item.category,
                  }))}
                  defaultInputValue={categoryName}
                  defaultValue={propertyCategory}
                  isOptionSelected={(value) => {
                    return (
                      propertyCategory === value
                    )
                  }}

                  onChange={(item) => {
                    setPropertyCategory(item.value)
                    setData(item.value)
                    setCategoryName(item.label)
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full mt-12 ">
          <div className="px-24 flex mb-5 justify-between h-full w-full">
            <div className=" text-gray-600 text-2xl font-bold cursor-pointer hover:text-gray-900" onClick={back}>Back</div>
            <button className=" bg-bgPrimary p-2 rounded-md text-white text-2xl font-semibold cursor-pointer hover:bg-bgPrimaryActive disabled:bg-teal-100 disabled:cursor-not-allowed" disabled={data ? false : true} onClick={onClick}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}