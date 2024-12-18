import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bird from "../../assets/items/gameBird.png";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const Brand = () => {

  const [categories, setcategories] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getResponse = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/categories/category/true`);
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

  // Destructure data from the query
  



  return (
    <div className="mb-4 bg-white rounded-lg">
      <div className="font-medium text-xl text-blue-800 font-serif mb-4 ml-4">
        Categories
        <hr className="border-green-700" />
      </div>
      <div className="text-right">
        <Link
          to="/categories"
          className="font-semibold mr-4 font-mono text-purple-500 hover:text-blue-500 hover:text-xl text-right"
        >
          View All
        </Link>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 w-full content-center mx-auto gap-4 justify-center shadow-sm shadow-green-500 bg-gray-200">
          {categories.length > 0 ? (
            categories.map((brand, index) => (
              <Link
                key={brand._id}
                className="flex justify-center items-center"
              >
                <img
                  src={bird}
                  alt={brand.name}
                  className="w-24 h-24 rounded-full object-cover shadow-sm shadow-purple-600 hover:shadow-md hover:shadow-purple-600"
                />
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No categories available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
