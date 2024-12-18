import React, { useEffect, useState } from "react";
import ItemCard from "./itemCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const Topseller = () => {
    

    const [items, setitems] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    })

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


    return (
        <div className="mb-4 bg-green-50 rounded-lg">
            <div className="font-medium text-xl text-blue-800 font-serif mb-4 ml-4">
                Top seller
                <hr className="border-green-700" />
            </div>

            <div className="text-right">
                <Link to="/items" className="font-semibold mr-4 font-mono mb-4 text-purple-500 hover:text-blue-500 hover:text-xl text-right">
                    View All
                </Link>
            </div>
            <div className="mt-4">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index} className="mb-4">
                        <ItemCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </div>
    );
};

export default Topseller;
