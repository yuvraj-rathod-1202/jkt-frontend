import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useAddCustomerMutation,
} from "../../redux/features/customers/customerApi";
import { useAddStockMutation } from "../../redux/features/Stocks/stocksApi";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";


const AddStock = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [selectedItemPrice, setSelectedItemPrice] = useState(0); // To store the selected item's price
  const [totalPrice, setTotalPrice] = useState(0); // To calculate and store the total price
  const [addCustomer] = useAddCustomerMutation();
  const [addStock] = useAddStockMutation();
  const [mobileNo, setmobileNo] = useState(0);

  const [items, setitems] = useState([]);

    useEffect(() => {
        const getResponse = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/items/`);
                console.log(response);
                console.log(response.data.items);
                setitems(response.data.items); // Set brands data to state
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        getResponse(); // Call the async function inside useEffect
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this runs only once after component mounts

  // Watch for changes in the itemId and itemQuantity fields
  const watchedItemId = watch("itemName");
  const watchedQuantity = watch("itemQuantity");
  const watchedMobileNo = watch("buyerMobileNo");

  // Update the selected item's price whenever the selected item changes
  useEffect(() => {
    const selectedItem = items.find((item) => item.name === watchedItemId);
    setSelectedItemPrice(selectedItem ? selectedItem.newPrice : 0);
  }, [watchedItemId, items]);

  

  // Calculate the total price whenever the quantity or selected item's price changes
  useEffect(() => {
    setTotalPrice(selectedItemPrice * (watchedQuantity || 0));
  }, [selectedItemPrice, watchedQuantity]);

  
  


  const onSubmit = async (data) => {
    setmobileNo(watchedMobileNo)
    console.log(mobileNo)
    console.log(data);
    const newStockData = {
      ...data,
      totalPrice: totalPrice,
    };

    
      // Check if customer exists
    
    let customer = ""
    try{
    const customerResponse = await axios.get(`${getBaseUrl()}/api/customers/customer/${newStockData.buyerMobileNo}`);
    customer = customerResponse.data.customer || "";
    }catch{
      customer = "";
    }
    
    try{
      
      console.log(customer)

      // Add the stock
      const stockResponse = await addStock(newStockData).unwrap();
      const addedStock = stockResponse.stock;

      if (customer === "") {
        // Add a new customer
        const newCustomerData = {
          name: newStockData.buyerName,
          mobileNo: Number(newStockData.buyerMobileNo),
          orders: [addedStock._id],
        };

        await axios.post(
          `${getBaseUrl()}/api/customers/create-customer`,
          newCustomerData,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
      } else {
        // Update existing customer
        const updatedOrders = [...customer.orders, addedStock._id];
        await axios.put(`${getBaseUrl()}/api/customers/edit/${customer._id}`, {name: customer.name, mobileNo: customer.mobileNo ,orders: updatedOrders}, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }

      // Show success message
      Swal.fire({
        title: "Stock added",
        text: "Your stock is uploaded successfully!",
        icon: "success",
      });

      reset(); // Reset form fields
    } catch (e) {
      console.error("Error adding stock:", e);

      Swal.fire({
        title: "Error",
        text: "An error occurred while adding stock. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoadingi) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  if (isErrori) {
    return <p>Error loading items. Please try again later.</p>; // Handle errors gracefully
  }

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-neutral-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Stock</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Buyer Name
          </label>
          <input
            type="text"
            {...register("buyerName", { required: true })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Buyer Name"
          />
          {errors.buyerName && (
            <p className="text-red-600 text-sm">Buyer Name is required</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Buyer Mobile No.
          </label>
          <input
            type="text"
            {...register("buyerMobileNo", { required: true })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Buyer Mobile No."
          />
          {errors.buyerMobileNo && (
            <p className="text-red-600 text-sm">Buyer Mobile No. is required</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Items
          </label>
          <select
            {...register("itemName", {
              required: "Item selection is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name} (Price: {item.newPrice})
              </option>
            ))}
          </select>
          {errors.itemName && (
            <p className="text-red-600 text-sm">{errors.itemName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            {...register("itemQuantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter quantity"
          />
          {errors.itemQuantity && (
            <p className="text-red-600 text-sm">
              {errors.itemQuantity.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Total Price
          </label>
          <input
            type="number"
            value={totalPrice}
            readOnly
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Total Price"
          />
        </div>

        

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Payment Status
          </label>
          <select
            {...register("paymentStatus", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select payment status</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
          {errors.paymentStatus && (
            <p className="text-red-600 text-sm">Payment Status is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          <span>Add Item</span>
        </button>
      </form>
    </div>
  );
};

export default AddStock;
