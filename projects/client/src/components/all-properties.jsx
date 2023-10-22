import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

export const AllProperties = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [length, setLength] = useState("");
  const maxPage = Math.ceil(length / limit);
  const allProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/properties?page=${page}`
      );
      setData(response.data.result);
      setLength(response.data.length);
      setLimit(response.data.limit);
    } catch (error) {
      console.log(error);
    }
  };

  const handleArrowClick = (action) => {
    if (action === "prev") {
      prevPage();
    } else if (action === "next") {
      nextPage();
    }
    // Scroll back to the top of the page
    window.scrollTo(0, 0);
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
              </h2>

              <span className="text-sm text-gray-600 font-bold block sm:inline">
                {item.category?.category || "No Category Selected"}
              </span>

              <p className="mt-2 text-sm text-gray-700">
                {item.propertyDesc.length > 80
                  ? item.propertyDesc.substring(0, 80) + "..."
                  : item.propertyDesc}
              </p>
            </div>
            <div className="p-4 mt-auto">
              <p className="text-sm font-bold text-gray-700">
                {item.rooms[0] ? formatRupiah(item.rooms[0].price) : null}{" "}
                <span className="font-medium text-sm"> / Night </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 py-5">
        {page > 1 && (
          <div
            onClick={() => handleArrowClick("prev")}
            className="cursor-pointer hover:text-blue-600 transition-transform transform hover:scale-105 rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center"
          >
            <BsArrowLeft size={24} className="mr-2" />
          </div>
        )}
        {maxPage > 1 && (
          <div className="text-2xl font-bold col-span-2">{page}</div>
        )}
        {page < maxPage && (
          <div
            onClick={() => handleArrowClick("next")}
            className="cursor-pointer hover:text-blue-600 transition-transform transform hover:scale-105 rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center"
          >
            <BsArrowRight size={24} className="ml-2" />
          </div>
        )}
      </div>
    </div>
  );
};
