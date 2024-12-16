import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../../assets/banner/banner1.jpeg'
import banner2 from '../../assets/banner/banner2.jpeg'
import banner3 from '../../assets/banner/banner3.jpeg'
import banner4 from '../../assets/banner/banner4.jpeg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="bg-neutral-100 m-4">
            <div className="sm:min-h-screen p-2">
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide><img src={banner1} className="w-full h-3/4"></img></SwiperSlide>
                    <SwiperSlide><img src={banner2} className="w-full h-3/4"></img></SwiperSlide>
                    <SwiperSlide><img src={banner3} className="w-full h-3/4"></img></SwiperSlide>
                    <SwiperSlide><img src={banner4} className="w-full h-3/4"></img></SwiperSlide>
                    {/* <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide> */}
                </Swiper>
            </div>
        </div>

    )
}

export default Banner