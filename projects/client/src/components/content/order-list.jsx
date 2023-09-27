import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";

import axios from 'axios'
import { SortStatus } from "../navbar/sort-status";

export const OrderListComponent = ({ setOpen, setDetail, setOrderId }) => {


  const token = localStorage.getItem('token')
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState("")
  const [length, setLength] = useState("")
  const [status, setStatus] = useState("")
  const [statusName, setStatusName] = useState("")
  const [sort, setSort] = useState("DESC")

  const maxPage = Math.ceil(length / limit)
  const getOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/order/myOrder?page=${page}&statusId=${status}&sort=${sort}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setLimit(response.data.limit)
      setLength(response.data.length)
      setData(response.data.filteredOrder)
    } catch (error) {
      console.log(error);
    }
  }
  const detailOrder = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/order/${id}`)
      setDetail(response.data)
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

  const sorting = () => {
    if (sort === "ASC") {
      setSort("DESC")
    }
    else {
      setSort("ASC")
    }
  }

  useEffect(() => {
    getOrder()
  }, [status, sort, reload])

  return (
    <div className="p-14">
      <div className=" text-4xl text-bgPrimary">My order list</div>
      <div className="mb-10 mt-20 w-full items-center gap-5 flex justify-end">
        <div>Sort by status :</div>
        <div> <SortStatus setStatusName={setStatusName} statusName={statusName} status={status} setStatus={setStatus} /> </div>
      </div>
      <div className=" text-gray-600 w-full p-5 rounded-lg shadow-md">
        <table className=" text-gray-600 w-full">
          <tr className=" text-gray-600 border-b ">
            <th onClick={sorting} className=" gap-2 justify-center flex cursor-pointer text-gray-500 py-5">
              <div>TRANSACTION DATE</div>
              <div className={`${sort === "ASC" ? "rotate-180" : "rotate-0"} transition-all`}> <IoIosArrowUp size={"20"} /> </div>
            </th>
            <th className=" text-gray-500 py-5">USER</th>
            <th className=" text-gray-500 py-5">ROOM NAME</th>
            <th className=" text-gray-500 py-5">STATUS</th>
          </tr>
          <tbody>
            {data.map((item, index) => (
              <tr
                onClick={() => {
                  setOpen(true)
                  detailOrder(item.id)
                  setOrderId(item.id)
                }}
                className=" border-b-2 hover:scale-95 h-24 transition-all cursor-pointer">
                <th>
                  {new Date(new Date(item.createdAt).getTime() - 7 * 60 * 60 * 1000).toLocaleString()}
                </th>
                <th className=" border-b-2">
                  {item.user.firstName} {item.user.lastName}
                </th>
                <th className=" border-b-2">{item.room.roomName}</th>
                <th className=" text-gray-600 border-b-2 p-2 w-56">
                  <div
                    className={`${item.status.id === 1
                        ? "bg-orange-400"
                        : "null"
                      } ${item.status.id === 2
                        ? "bg-blue-400"
                        : "null"
                      } ${item.status.id === 3
                        ? "bg-green-600"
                        : "null"
                      } ${item.status.id === 4
                        ? "bg-red-600"
                        : "null"
                      } ${item.status.id === 5
                        ? "bg-red-600"
                        : "null"
                      } text-white rounded-md font-thin`}
                  >
                    {item.status.status}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex justify-center items-center h-14 gap-5">
        {length < limit && page > 1 ?
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
    </div>
  )
}