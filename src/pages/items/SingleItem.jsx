import React, { useEffect } from "react";
import { useFetchItemByIdQuery } from "../../redux/features/items/itemsApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import bird from '../../assets/items/gameBird.png';
import Loading from "../../components/Loading";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const SingleItem = () => {
    const { id } = useParams();
    const itemObj = axios.get(`${getBaseUrl()}/api/items/${id}`);
    const item = itemObj.data.item;
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    // Check if item has necessary properties
    if (!item || !item._id || !item.name) {
        return <div>Item not found</div>;
    }

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div>
            <div className="rounded-lg transition-shadow duration-300 shadow-md shadow-blue-800 bg-white hover:bg-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                    <div className="sm:h-72 sm:flex-shrink-0 border rounded-md max-w-screen-sm">
                        <Link to={`/item/${item._id}`}>
                            <img
                                src={bird} // Use item image or fallback to 'bird'
                                alt={item.name || "Item image"}
                                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            />
                        </Link>
                    </div>

                    <div>
                        <Link to={`/item/${item._id}`}>
                            <h3 className="text-xl ml-2 font-semibold hover:text-blue-600 mb-3">
                                {item.name}
                            </h3>
                        </Link>
                        <p className="text-gray-600 ml-2 mb-5 max-w-[350px] truncate">
                            {item.description}
                        </p>
                        <p className="font-medium mb-5 ml-2">
                            ₹{item.newPrice}{" "}
                        </p>
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

export default SingleItem;
