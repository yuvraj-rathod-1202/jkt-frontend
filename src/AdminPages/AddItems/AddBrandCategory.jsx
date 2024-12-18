import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAddBrandMutation } from '../../redux/features/brands/brandApi';
import { useAddCategoryMutation } from '../../redux/features/categories/categoriesApi';

const Addbrandcategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [imageFileName, setimageFileName] = useState("");
  const [addBrand, {isLoadingb, errorb}] = useAddBrandMutation();
  const [addCategory, {isLoadingc, errorc}] = useAddCategoryMutation();
  const onSubmit = async (data) => {
    const newItemData = {
      ...data,
      image: imageFileName,
    };
    try {
      if(newItemData.brandcategory == "brand"){
        await addBrand({
          name: newItemData.name,
          onHome: newItemData.onHome,
          image: newItemData.image
        })
      }else{
        await addCategory({
          name: newItemData.name,
          onHome: newItemData.onHome,
          image: newItemData.image
        })
      }
      Swal.fire({
        title: "Brand/Category added",
        text: "Your Brand/Category is uploaded successfully!",
        icon: "success",
        showCancelButton: false,
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Add New Brand/Category
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <SelectField
          label="category"
          name="brandcategory"
          options={[
            { value: "brand", label: "brand" },
            { value: "category", label: "category" },
          ]}
          register={register}
        />

        {/* Reusable Input Field for name */}
        <InputField
          label="name"
          name="name"
          placeholder="Enter Item name"
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("onHome")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Add on Home page
            </span>
          </label>
        </div>

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
            name="image"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {
             (isLoadingc || isLoadingb) ? <span>Adding..</span> : <span>Add Item</span>
            }
        </button>
      </form>
    </div>
  );
};

export default Addbrandcategory;
