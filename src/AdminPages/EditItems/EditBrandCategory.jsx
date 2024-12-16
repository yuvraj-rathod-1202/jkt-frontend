import React, { useState } from "react";
import EditBrand from "./EditBrand";
import EditCategory from "./EditCategory";

const EditBrandCategory = () => {
  const [selected, setSelected] = useState("brand"); // Default selection

  const handleChange = (e) => {
    setSelected(e.target.value); // Update state correctly
  };

  return (
    <div>
      <div className="max-w-lg mx-auto md:p-6 p-3 bg-neutral-100 rounded-lg shadow-md mb-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Select an option
          </label>
          <select
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleChange} // Attach onChange to the select element
            value={selected} // Keep the select in sync with the state
          >
            <option key="brand" value="brand">
              brand
            </option>
            <option key="category" value="category">
              category
            </option>
          </select>
        </div>
      </div>
      <div>
        {selected === "brand" && <EditBrand />}
        {selected === "category" && <EditCategory />}
      </div>
    </div>
  );
};

export default EditBrandCategory;
