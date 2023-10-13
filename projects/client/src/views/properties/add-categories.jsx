import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const AddCategory = ({ openCategories, setOpenCategories }) => {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [reload, setReload] = useState(false);
  const myCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/properties/category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (values) => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/properties/category",
        { categoryId: value, newCategory: values.newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpenCategories(false);
      setReload(!reload);
      setValue(null);
      setNewName(null);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(value);

  const deleteCategory = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this location?",
      confirmButtonText: 'Yes',
      showCancelButton: true,
      confirmButtonColor: '#2CA4A5',
      cancelButtonColor: '#e3e3e3',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:8000/api/properties/category/${value}`)
        setOpenCategories(false)
        setValue("")
      }
    })
  }

  const addCategory = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/properties/category",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Location successfully added",
        timer: 800
      });
      setTimeout(() => {
        setOpenCategories(false);
      },700);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    myCategories();
  }, [reload]);
  return (
    <div
      className={`w-full h-screen ${
        openCategories ? "flex" : "hidden"
      }  justify-center items-center fixed z-50`}
    >
      <div className="absolute w-full h-full bg-black opacity-70"></div>
      <div className=" relative md:w-1/3 md:h-fit w-full h-screen bg-white rounded-lg p-10">
        <div className=" w-full text-xl flex justify-between">
          <div className=" text-gray-700 font-semibold text-2xl">
            Edit or Add Your Location
          </div>
          <div
            onClick={() => {
              setOpenCategories(false);
            }}
            className="hover:scale-95 cursor-pointer"
          >
            X
          </div>
        </div>
        <div className="mt-10">Your Properties Location</div>
        <div>
          <div className="mt-2">
            <Select
              className="w-full h-12 rounded-md"
              options={categories.map((item) => ({
                value: item.id,
                label: item.category,
              }))}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </div>
          <div className=" w-full">
            <button onClick={deleteCategory} disabled={value? false : true} className=" disabled:bg-red-100 disabled:cursor-not-allowed p-2 bg-red-700 hover:bg-red-500 text-white w-full flex justify-center rounded-lg transition-all">Delete</button>
          </div>
          <div>
            <Formik
              initialValues={{
                newCategory: "",
              }}
              onSubmit={(values, action) => {
                editCategory(values);
                console.log(values);
                action.resetForm();
              }}
            >
              <Form>
                <div className="mt-4">
                  <div>New Location Name</div>
                  <div>
                    <div>
                      <Field
                        name="newCategory"
                        type="text"
                        className="w-full p-2 border border-gray-600 mt-2 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    onClick={editCategory}
                    disabled={value ? false : true}
                    className="disabled:bg-teal-100 disabled:cursor-not-allowed bg-bgPrimary text-white rounded-md hover:bg-bgPrimaryActive transition-all mt-5 p-2"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <hr className="px-2 mt-5" />
        <div className="mt-5">
          <Formik
            initialValues={{
              categoryName: "",
            }}
            onSubmit={(value) => {
              addCategory(value);
            }}
          >
            <Form>
              <div>Add New Location</div>
              <div>
                <Field
                  name="categoryName"
                  type="text"
                  className="w-full p-2 border border-gray-600 mt-2 rounded-md"
                />
              </div>
              <div className="w-full justify-end flex">
                <button
                  type="submit"
                  className=" bg-bgPrimary text-white rounded-md hover:bg-bgPrimaryActive transition-all mt-5 p-2"
                >
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};