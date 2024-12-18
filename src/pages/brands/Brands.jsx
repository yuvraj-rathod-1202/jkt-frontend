import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bird from '../../assets/items/gameBird.png';
import getBaseUrl from "../../utils/baseURL";
import axios from "axios";

const Brands = () => {
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

    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="mb-4 bg-neutral-100 rounded-lg">
            <div className="font-medium text-center text-blue-800 font-serif mb-4 ml-4 text-2xl">
                Brands
                <hr className="border-green-700" />
            </div>

            <div className="p-4">
                <div className="bg-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 w-full content-center mx-auto gap-4 justify-center shadow-sm shadow-green-500">
                        {
                            brands && brands.map((brand) => (
                                <Link key={brand._id} className="flex justify-center items-center">
                                    <img
                                        src={bird}
                                        alt={brand.name}
                                        className="w-24 h-24 rounded-full object-cover shadow-sm shadow-purple-600 hover:shadow-md hover:shadow-purple-600"
                                    />
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

            <button
                onClick={handleBack} // Call handleBack when clicked
                className="w-full py-2 bg-green-500 mt-4 max-w-32 text-white font-bold rounded-md"
            >
                Back
            </button>
        </div>
    );
};

export default Brands;
