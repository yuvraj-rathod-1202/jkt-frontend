import React, { useEffect, useState } from "react";
import InputField from "../../AdminPages/AddItems/InputField";
import SelectField from "../../AdminPages/AddItems/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import getBaseUrl from "../../utils/baseURL";
import axios from 'axios'

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [imageFileName, setimageFileName] = useState("");
  

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/categories/`);
            console.log(response);
            console.log(response.data.Categorys);
            setcategories(response.data.Categorys); // Set brands data to state
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    getResponse(); // Call the async function inside useEffect
    window.scrollTo(0, 0);
}, []); // Empty dependency array ensures this runs only once after component mounts

const [brands, setBrands] = useState([]); // State to hold the brands data
    

useEffect(() => {
    const getResponse = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/brands/`);
            console.log(response);
            console.log(response.data.Brands);
            setBrands(response.data.Brands); // Set brands data to state
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    getResponse(); // Call the async function inside useEffect
    window.scrollTo(0, 0);
}, []); // Empty dependency array ensures this runs only once after component mounts

  const {id} = useParams();
  console.log(id)

  const onSubmit = async (data) => {
    const newItemData = {
      ...data,
      image: imageFileName,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/items/edit/${id}`, newItemData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      Swal.fire({
        title: "Item Edited",
        text: "Your Item is edited successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
      setimageFileName("");
      setimageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add Item. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-neutral-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Item</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for name */}
        <InputField
          label="name"
          name="name"
          placeholder="Enter Item name"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter Item description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "0", label: "Choose A Category" },
            ...(categories || []).map((category, index) => ({
              value: index + 1, // Assuming you want index-based values
              label: category.name,
            })),
          ]}
          register={register}
        />

        {/* Reusable Select Field for Brand */}
        <SelectField
          label="brand"
          name="brand"
          options={[
            { value: "0", label: "Choose A Brand" },
            ...(brands || []).map((brand, index) => ({
              value: brand.name, // Assuming you want index-based values
              label: brand.name,
            })),
          ]}
          register={register}
        />

        {/* Top Seller Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("topSeller")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Top Seller
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          <span>Edit Item</span>
        </button>
      </form>
    </div>
  );
};

export default AddItem;
