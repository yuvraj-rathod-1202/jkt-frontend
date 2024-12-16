import React from "react";
import { Link } from "react-router-dom";
import bird from '../../assets/items/gameBird.png';

const ItemCard = ({ item }) => {
    return (
        <div className="rounded-lg transition-shadow duration-300 shadow-sm shadow-blue-800 bg-white hover:bg-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md max-w-screen-sm">
                    <Link to={`/item/${item._id}`}>
                        <img
                            src={bird}
                            alt={item.name || "Book image"}
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
                    <p className="text-gray-600 ml-2 mb-5 max-w-[350px] sm:max-w-[100px] truncate">
                        {item.description?.length > 80
                            ? `${item.description.slice(0, 80)}...`
                            : item.description}
                    </p>
                    <p className="font-medium mb-5 ml-2">
                        ₹{item.newPrice}{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
