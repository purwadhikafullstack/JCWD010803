import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

export const AllProperties = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [length, setLength] = useState("");
  const maxPage = Math.ceil(length / limit)
  const allProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties?page=${page}`);
      setData(response.data.result);
      setLength(response.data.length)
      setLimit(response.data.limit)
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    if (page < maxPage) {
      setPage((prevPage) => Math.max(+prevPage + 1, 1));
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => Math.max(+prevPage - 1, 1));
    }
  };

  const toDetailPage = (id) => {
    navigate(`/property/${id}`);
  };

  const formatRupiah = (amount) => {
    return Number(amount).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  useEffect(() => {
    allProperties();
  }, [page]);
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() => toDetailPage(item.id)}
            className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={`${process.env.REACT_APP_API_IMG_URL}/property/${item.propertyImg}`}
              alt={item.propertyName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.propertyName},{" "}
                <span className="text-sm text-gray-600 block sm:inline">
                  {item.category.category}
                </span>
              </h2>
              <p className="mt-2 text-sm text-gray-700">{item.propertyDesc}</p>
              <p className="mt-2 text-sm text-gray-700">
                {item.rooms[0] ? formatRupiah(item.rooms[0].price) : null}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center items-center h-14 gap-5">
        {page > 1 ? (
          <div
            onClick={prevPage}
            className="cursor-pointer hover:scale-110 active:scale-95"
          >
            {" "}
            <BsFillArrowLeftCircleFill size={"30"} />{" "}
          </div>
        ) : null}
        {maxPage < 2 ? null : (
          <div className=" text-xl font-thin"> page {page} </div>
        )}
        {page < maxPage ? (
          <div
            onClick={nextPage}
            className="cursor-pointer hover:scale-110 active:scale-95"
          >
            {" "}
            <BsFillArrowRightCircleFill size={"30"} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
};
