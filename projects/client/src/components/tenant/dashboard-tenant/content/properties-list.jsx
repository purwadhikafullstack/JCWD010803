import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { BiEditAlt } from 'react-icons/bi'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BsFillHouseAddFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";


export const MyProperties = ({ setConfirmOpen, reload, setOpen, location, propertyCategory, propertyName, propertyDesc, id, propertyImg }) => {
  const [properties, setProperties] = useState([])
  const [sort, setSort] = useState("DESC")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState("")
  const [length, setLength] = useState("")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const maxPage = Math.ceil(length / limit)




  const myProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/properties/myProperties?sort=${sort}&page=${page}&search=${search}`, {
        headers: { Authorization: `Bearer: ${token}` }
      })
      setProperties(response.data.result)
      setLength(response.data.length)
      setLimit(response.data.limit)
    } catch (error) {
      console.log(error);
    }
  }

  const openModal = () => {
    setOpen(true)
  }

  const openDeleteModal = () => {
    setConfirmOpen(true)
  }

  const getPropCat = (value) => {
    propertyCategory(value)
  }
  const getPropDesc = (value) => {
    propertyDesc(value)
  }
  const getPropName = (value) => {
    propertyName(value)
  }
  const getId = (value) => {
    id(value)
  }
  const getImg = (value) => {
    propertyImg(value)
  }
  const getLocation = (value) => {
    location(value)
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

  const toAddProperty = () => {
    navigate('/dashboard/add-property')
  }

  const toDetailProperty = (id) => {
    navigate(`/dashboard/rooms/${id}`)
  }

  useEffect(() => {
    myProperties()
  }, [sort, reload, page, search])
  return (
    <div>
      <div className=" text-3xl w-full flex sm:justify-start justify-center text-teal-700">My Properties</div>
      <div className=" mt-2 h-12 items-center text-gray-700 flex justify-center sm:justify-between ">
        <div className='p-2 hidden sm:block bg-bgPrimary rounded-lg text-white font-thin cursor-pointer hover:scale-95' onClick={toAddProperty}>
          Do you want to add property?
        </div>
        <div className='p-1 block sm:hidden mr-3 bg-bgPrimary rounded-lg text-white font-thin cursor-pointer hover:scale-95' onClick={toAddProperty}>
          <BsFillHouseAddFill size={"25"} />
        </div>
        <div className='w-2/6 flex gap-2 items-center'>
          <input
            type="search"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            className=" w-20 focus:w-full transition-all duration-500 border-gray-300 focus:border-none py-2 px-5 rounded-md border "
          />
          <div className='text-gray-600'>
            <AiOutlineSearch size={"30"} />
          </div>
        </div>
        <div className='flex gap-5'>
          <div class=" flex items-center space-x-2">
            <input
              type="radio"
              id="1"
              name="name"
              value="ASC"
              class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              onChange={(e) => { setSort("ASC") }}
              checked={sort == "ASC" ? true : false}
            />
            <label for="1" class="text-gray-700">Latest</label>
          </div>

          |

          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="2"
              name="name"
              value="DESC"
              class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              onChange={(e) => { setSort("DESC") }}
              checked={sort == "DESC" ? true : false}
            />
            <label for="DESC" class="text-gray-700">Newest</label>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        {properties?.map((item) => {
          return (
            <div className=' hover:scale-105 transition-all cursor-pointer border mb-5 sm:flex block sm:w-full sm:h-44 h-fit rounded-lg'>
              <div className='w-full sm:w-72'>
                <img onClick={() => toDetailProperty(item.id)} className=' w-full sm:w-full h-full border  sm:rounded-l-lg'
                  src={`http://localhost:8000/property/${item.propertyImg}`}
                  alt={`Property ${item.propertyName}`} />
              </div>
              <div className='my-auto sm:px-10 w-full pb-5 sm:pb-0 '>
                <div onClick={() => toDetailProperty(item.id)} className=' w-full'>
                  <div className=' sm:px-0 px-2 text-xl font-semibold text-gray-800'> {item.propertyName} </div>
                  <div className=' sm:px-0 px-2 text-sm text-gray-600'> {item.category.category} </div>
                  <div className=' sm:px-0 px-2 mt-2 w-3/4 block xl:hidden text-gray-700'> {item.propertyDesc.slice(0, 70) + "..."} </div>
                  <div className=' sm:px-0 px-2 mt-2 lg:w-3/4 w-full hidden xl:block text-gray-700'> {item.propertyDesc.slice(0, 170) + "..."} </div>
                </div>
                <div className='flex mt-2 pr-5 gap-10 justify-end sm:justify-start'>
                  <div className='flex gap-5'>
                    <div
                      className='my-auto'
                      onClick={() => {
                        openModal()
                        getPropCat(item.categoryId)
                        getPropName(item.propertyName)
                        getPropDesc(item.propertyDesc)
                        getId(item.id)
                        getImg(item.propertyImg)
                        getLocation(item.category.category)
                      }}
                    >
                      <div className='text-gray-600 z-50 cursor-pointer hover:scale-95'>
                        <BiEditAlt size={"25"} />
                      </div>
                    </div>
                    <div
                      className='p-1 rounded-md text-white bg-red-600 cursor-pointer hover:scale-95'
                      onClick={() => {
                        openDeleteModal()
                        getId(item.id)
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className=" flex justify-center items-center h-14 gap-5">
        {page > 1 ?
          <div onClick={prevPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowLeftCircleFill size={"30"} /> </div>
          :
          null
        }
        {maxPage < 2 ? null : <div className=" text-xl font-thin"> page {page} </div>}
        {page < maxPage ?
          <div onClick={nextPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowRightCircleFill size={"30"} /> </div>
          :
          null
        }
      </div>
    </div>

  )
}