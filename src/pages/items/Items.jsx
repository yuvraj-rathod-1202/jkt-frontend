import React, { useEffect, useState } from "react";
import ItemCard from "../home/itemCard";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const Items = () => {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    })


    return(
        <div>
            <div className="font-medium text-center text-blue-800 font-serif mb-4 ml-4 text-2xl">
                Items
                <hr className="border-green-700" />
            </div>
            {
                items && items.map(item => (
                    <div>
                    <ItemCard item={item}></ItemCard>
                    <p className="mb-4"></p>
                    </div>
                ))
            }
        </div>
    )
}


export default Items;