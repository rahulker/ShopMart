import { Link, useRouteLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaLongArrowAltRight } from "react-icons/fa";
import Card from "../Custom/Card";
import { useRef } from "react";
import IMAGEPATH from "../../constant/Image";
import Button from "../Custom/Button";

const Home = () => {
  const data = useRouteLoaderData("root");
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <section>
      <div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 2000 }}
          loop
          modules={[Autoplay, Pagination, Navigation]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.params.navigation.prevEl = navigationPrevRef.current;
          }}
        >
          <SwiperSlide>
            <img
              src={IMAGEPATH.banner1}
              className="w-full h-[280px] sm:h-[300px] md:h-[380px] lg:h-[500px] object-cover"
              alt="banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={IMAGEPATH.banner2}
              className="w-full h-[280px] sm:h-[300px] md:h-[380px] lg:h-[500px] object-cover"
              alt="banner 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={IMAGEPATH.banner3}
              className="w-full h-[280px] sm:h-[300px] md:h-[380px] lg:h-[500px] object-cover"
              alt="banner 3"
            />
          </SwiperSlide>
        </Swiper>
        <div className="flex items-center justify-end mt-2 mx-5 gap-5">
          <Button
            text={<FaChevronLeft />}
            type="button"
            ref={navigationPrevRef}
          />
          <Button
            text={<FaChevronRight />}
            type="button"
            ref={navigationNextRef}
          />
        </div>
      </div>
      <div className="lg:mx-[50px] mx-[20px] mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md:text-2xl font-semibold">Feature Products</h2>
          <Link
            to="/product"
            className="flex items-center gap-1.5 hover:font-semibold transition-all"
          >
            View More
            <FaLongArrowAltRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-between justify-items-center grid-rows-2 mt-5">
          {data.slice(0, 8).map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
