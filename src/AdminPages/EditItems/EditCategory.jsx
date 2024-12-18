import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../redux/features/categories/categoriesApi";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const EditCategory = () => {
   
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
    
        const [deletecategories] = useDeleteCategoryMutation();
    
    
        const handleDeletecategory = async (id) => {
                try {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then(async (result) =>  {
                        if (result.isConfirmed) {
                            await deletecategories(id).unwrap();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your category has been deleted.",
                                icon: "success"
                            });
                          refetch();
                        }
                      });
                   
                } catch (error) {
                    console.log(error);
                    alert('Failed to delete category. Please try again.');
                }
            }
    
    
        return (
            <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap categories-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All categories</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <Link to='/admin/edititem'>
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Edit Items</button>
                                </Link>
                            </div>
                        </div>
                    </div>
        
                    <div className="block w-full overflow-x-auto">
                        <table className="categories-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        category Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        onHome
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Actions
                                </th>
                                </tr>
                            </thead>
        
                            <tbody>
                                {
                                    categories && categories.map((category, index) => (
                                        <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                           {index + 1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {category.name}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {category.onHome ? <FaCheck /> : <ImCross />}
                                        </td>
                                        
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
        
                                            <Link to={`/admin/editcategory/${category._id}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                                Edit
                                            </Link>
                                            <button 
                                            onClick={() => handleDeletecategory(category._id)}
                                            className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2">Delete</button>
                                        </td>
                                    </tr> 
                                    ))
                                }
                 
        
                            </tbody>
        
                        </table>
                    </div>
                </div>
            </div>
        
        </section>
        )
}

export default EditCategory;