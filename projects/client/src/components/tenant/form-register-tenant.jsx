import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const RegisterTenant = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'vvY9ZcZt350jQpZPPsHa4IINImjvngdSTX2vpxQnnXk',
          orientation: 'landscape',
        },
      })
      .then((response) => {
        setBackgroundImage(response.data.urls.full);
      })
      .catch((error) => {
        console.error('Error fetching background image from Unsplash:', error);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    idCard: Yup.mixed()
      .required('ID card is required')
      .test('fileSize', 'File size must be less than 1MB', (value) =>
        value ? value.size <= 1000000 : true
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      idCard: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Image Section */}
      <div className="lg:w-1/2 bg-cover bg-center h-screen" style={{ backgroundImage: `url("${backgroundImage}")` }}>
        {/* Image content, if any */}
      </div>

      {/* Registration Form Section */}
      <div className="lg:w-1/2 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-6 text-teal-500">Register</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input border rounded py-2 px-3 w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input border rounded py-2 px-3 w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input border rounded py-2 px-3 w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="form-input border rounded py-2 px-3 w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Upload ID Card (KTP) (Max 1MB)</label>
              <Dropzone
                name="idCard"
                multiple={false}
                accept="image/*"
                onDrop={(acceptedFiles) => {
                  // Handle file upload here
                  const file = acceptedFiles[0];
                  // Set the file as a value for idCard field
                  formik.setFieldValue('idCard', file);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`border-dashed border-2 border-gray-400 p-4 ${
                      formik.errors.idCard && formik.touched.idCard ? 'border-red-500' : ''
                    }`}
                  >
                    <input {...getInputProps()} />
                    <p>Drag & drop or click to select an image</p>
                  </div>
                )}
              </Dropzone>
              {formik.touched.idCard && formik.errors.idCard ? (
                <div className="text-red-500">{formik.errors.idCard}</div>
              ) : null}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTenant;
