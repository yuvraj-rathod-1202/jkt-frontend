import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import totalItems from "../counts/totalItems";
import Loading from "../../components/Loading";
import { AiFillProduct } from "react-icons/ai";
import totalBrands from "../counts/totalBrands";
import { MdBrandingWatermark } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import totalCustomers from "../counts/totalCustomers";
import totalSell from "../counts/totalSell";
import DailyRevenueChart from "../Graphs/DailyRevenueChart";

const AdminHome = () => {
  const [itemCount, setItemCount] = useState(null); // Initialize state to store the resolved value
  const [brandCount, setBrandCount] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [sellCount, setSellCount] = useState(null);
  useEffect(() => {
    // Fetch the total items count when the component mounts
    async function fetchTotalItems() {
      try {
        const count = await totalItems();
        const countb = await totalBrands();
        const countc = await totalCustomers();
        const counts = await totalSell(); // Await the promise returned by totalItems
        setItemCount(count); // Set the resolved value in the state
        setBrandCount(countb);
        setCustomerCount(countc);
        setSellCount(counts); // Set the resolved value in the state
      } catch (error) {
        console.error("Error fetching total:", error);
      }
    }

    fetchTotalItems();
    console.log(sellCount);
  }, []); // Empty dependency array to run only on component mount

  return (
    <div>
      <div className="flex flex-row justify-start mb-2 min-w-[1000px]">
        <Link
          to="/admin/additem"
          className="flex items-center bg-green-600 px-4 py-2 text-white rounded-md ml-auto"
        >
          <span className="flex flex-row items-center gap-3">
            Add Item <FaPlus />
          </span>
        </Link>

        <Link
          to="/admin/addbrandcategory"
          className="flex items-center bg-green-600 px-4 py-2 text-white rounded-md ml-2"
        >
          <span className="flex flex-row items-center gap-3">
            Add Brand/Category <FaPlus />
          </span>
        </Link>
      </div>
      <hr className="bg-green-600 mb-4" />
      <div className="grid grid-cols-4 gap-x-12">
        <div className="flex gap-4 items-center justify-center bg-purple-600 rounded-md text-white p-4 text-2xl">
          {itemCount !== null ? (
            <>
              <AiFillProduct />
              {itemCount} Items
            </>
          ) : (
            <Loading />
          )}
        </div>

        <div className="flex gap-4 items-center justify-center bg-orange-600 rounded-md text-white p-4 text-2xl">
          {brandCount !== null ? (
            <>
              <MdBrandingWatermark />
              {brandCount} Brands
            </>
          ) : (
            <Loading />
          )}
        </div>

        <div className="flex gap-4 items-center justify-center bg-purple-600 rounded-md text-white p-4 text-2xl">
          {brandCount !== null ? (
            <>
              <FaUserAlt />
              {customerCount} Customer
            </>
          ) : (
            <Loading />
          )}
        </div>

        <div className="flex gap-4 items-center justify-center bg-orange-600 rounded-md text-white p-4 text-2xl">
          {brandCount !== null ? (
            <>
              <FaArrowTrendUp />
              {Number(sellCount / 1000)} K sell
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of Revenue per Daily
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <DailyRevenueChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
