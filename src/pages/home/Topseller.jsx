import React from "react";
import { useFetchAllItemsQuery } from "../../redux/features/items/itemsApi";
import ItemCard from "./itemCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Topseller = () => {
    const { data, isLoading, isError } = useFetchAllItemsQuery();

    // Handle loading and error states
    if (isLoading) return <Loading />
    if (isError) return <div>Error loading items</div>;

    // Ensure `items` is an array
    const items = Array.isArray(data) ? data : data?.items || [];

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
