import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/navbar/navbar"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import Footer from "../../components/footer";

export const SortProperties = () => {
  const [properties, setProperties] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState("")
  const [length, setLength] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryId = queryParams.get('categoryId')
  const checkIn = queryParams.get('checkIn')
  const checkOut = queryParams.get('checkOut')
  const maxPage = Math.ceil(30 / limit)
  console.log(page);

  const sortProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/properties/sortProperties?page=${page}&categoryId=${categoryId}&checkIn=${checkIn}&checkOut=${checkOut}`)
      setProperties(response.data.properties)
      setLength(response.data.length)
      setLimit(response.data.limit)

    } catch (error) {
      console.log(error);
    }
  }

  const nextPage = () => {
    if (page < maxPage) {
        setPage((prevPage) => Math.max(+prevPage + 1, 1));
    };
};

const prevPage = () => {
    if (page > 1) {
        setPage((prevPage) => Math.max(+prevPage - 1, 1));
    };
};

  const handleClick = (id) => {
    navigate(`/property/${id}`)
  }

  useEffect(() => {
    sortProperties()
  }, [page])
  return (
    <div>
      <div className="z-50">
        <Navbar />
      </div>
      <div className="px-5 sm:px-24 pt-32 pb-7 flex">
        <div className="flex justify-center w-full">
          {properties.length > 0 ? (
            <div className=" flex w-full flex-wrap justify-center gap-10 pt-10">
              {properties?.map(item => {
                return (
                  <div className=" w-72 h-96 border p-5 rounded-xl sm:border-none sm:p-0">
                    <div className="w-72 h-96 absolute z-10 hover:bg-white cursor-pointer opacity-20 " onClick={(() => handleClick(item.id))}></div>
                    <img
                      className="w-full h-2/3  rounded-xl relative"
                      src={`http://localhost:8000/api/properties/image/${item.propertyImg}`}
                      alt={`Property ${item.propertyName}`}
                    />
                    <div className=" z-0">
                      <div className=" mt-2 font-semibold text-lg text-gray-800"> {item.propertyName} </div>
                      <div className=" text-gray-700 text-sm"> {item.category.category} </div>
                      <div className=" font-thin text-gray-600"> {item.propertyDesc.slice(0, 90) + "..."} </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className=" w-full ">
              <div className=" text-4xl w-full mx-auto mt-20 text-center text-gray-700 font-thin">
                We couldn't find any properties that match your search.
                <div>
                  Please try again later.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-center items-center h-14 gap-5">
        {length < limit || page > 1 ?
          <div onClick={prevPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowLeftCircleFill size={"30"} /> </div>
          :
          null
        }
        {maxPage < 2 ? null : <div className=" text-xl font-thin"> page {page} </div>}
        {length > limit || page < maxPage ?
          <div onClick={nextPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowRightCircleFill size={"30"} /> </div>
          :
          null
        }
      </div>
      <Footer />
    </div>
  )
}