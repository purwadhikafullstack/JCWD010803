import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Select from 'react-select'
import swal from 'sweetalert2'

export const UpdatePropertyModal = ({ reload, setReload,location, open, setOpen, propertyCategory, propertyImgProp, propertyNameProp, propertyDescProp, Id }) => {

  const [category, setCategory] = useState([])
  const [file, setFile] = useState(null)
  const [idCategory, setIdCategory] = useState(propertyCategory)
  const getCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/allCategories`)
      setCategory(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  const onSubmit = async (value) => {
    try {
      const formData = new FormData();
      const { categoryId, propertyName, propertyDesc } = value;
      formData.append("propertyName", propertyName);
      formData.append("propertyDesc", propertyDesc);
      formData.append("categoryId", categoryId);
      formData.append("file", file);
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/properties/${Id}`, formData, {
        headers: { "Content-type": "multipart/form-data" }
      })
      setReload(!reload)
      // window.location.reload()
      swal.fire({
        icon: 'success',
        title: 'Update success',
        timer: 1500,
        showConfirmButton: false,
    });
    setOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories()
  },[])


  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div className={` fixed z-50 w-full ${open ? "flex" : "hidden"} justify-center items-center h-full`}>
      <div className=" z-40 bg-black w-full h-screen fixed opacity-80"></div>
      <div className="z-50 sm:w-1/3 flex sm:h-fit w-full h-full items-end justify-center rounded-xl  relative bg-white">
        <div className="p-10 w-full">
          <div  className="w-full justify-end flex ">
            <div className="w-fit text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}>X</div>
          </div>
          <div className="text-2xl flex justify-center text-gray-600">Update your property</div>
          <div>
            <Formik
              initialValues={{
                propertyName: propertyNameProp || "",
                propertyDesc: propertyDescProp || "",
                categoryId: propertyCategory || "",
                propertyImgFile: ""
              }}
              enableReinitialize
              onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm()
              }}
            >
              <Form>
                <div className="mt-5 mb-2">
                  <div>Property name</div>
                  <Field
                    className="w-full border-2 h-12 rounded-md px-5 text-xl"
                    name="propertyName"
                  />
                </div>
                <div className="mt-5 mb-2">
                  <div>Property description</div>
                  <Field
                    className="w-full border-2 h-12 rounded-md px-5 text-xl"
                    name="propertyDesc"
                  />
                </div>
                <div className="mt-5 mb-2">
                  <div>Location</div>
                  <Field name="categoryId">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <div>
                        <Select
                          className="w-full h-12 rounded-md text-xl"
                          options={category.map(item => ({
                            value: item.id,
                            label: item.category,
                          }))}
                          onChange={(item) => {
                            setFieldValue("categoryId", item.value)
                          }}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="mt-10 mb-2">
                  <div className="border rounded-md w-full flex justify-center">
                    <img className=" w-64 h-72" id="selected-image" src={propertyImgProp ? `${process.env.REACT_APP_API_IMG_URL}/property/${propertyImgProp}` : ''} alt="" />
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    className="w-full h-12  border-none rounded-md text-xl mt-2"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      // Tambahkan kode untuk menampilkan gambar yang dipilih
                      const selectedImage = document.getElementById('selected-image');
                      if (e.target.files.length > 0) {
                        selectedImage.src = URL.createObjectURL(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="flex gap-10 justify-end items-end">
                  <div className="p-2 bg-gray-200 text-bgPrimary rounded-md cursor-pointer hover:scale-105" onClick={closeModal}>Cancel</div>
                  <button type="submit" className="p-2 bg-bgPrimary text-white rounded-md cursor-pointer hover:scale-105 disabled:bg-teal-100 disabled:cursor-not-allowed disabled:scale-100" disabled={file? false : true}>Save</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

    </div>
  )
}