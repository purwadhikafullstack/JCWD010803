import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AllProperties = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  console.log(data);

  const allProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/properties/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toDetailPage = (id) => {
    navigate(`/property/${id}`)
  }

  useEffect(() => {
    allProperties();
  }, []);
  return (
    <div className=" p-20 w-full h-screen ">
      <div className="  flex w-full gap-5 h-full">
        {data?.map((item) => {
          return (
            <div onClick={() => toDetailPage(item.id)} className="w-48 h-80 hover:scale-95 cursor-pointer transition-all">
              <div className="w-full h-full border rounded-md ">
                <div className="h-2/4 w-full">
                  <img
                    src={`http://localhost:8000/property/${item.propertyImg}`}
                    className="w-full h-full rounded-t-md"
                  />
                </div>

                <div className="p-2">
                  <div className=" text-gray-700"> {item.propertyName} </div>
                  <div className=" text-sm text-gray-500">
                    {" "}
                    {item.category.category}{" "}
                  </div>
                  <div className=" mt-2 text-sm text-gray-500">
                    {" "}
                    {item.propertyDesc}{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
