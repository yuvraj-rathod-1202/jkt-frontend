import React, { useEffect } from "react";
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi';
import ItemCard from "../home/itemCard";

const Items = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const { data: response= {}, isLoading, iserror } = useFetchAllItemsQuery();
    const items = response.items;


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