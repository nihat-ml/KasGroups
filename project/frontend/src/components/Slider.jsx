import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

const slides = [
  {
    image: "https://kasalm.az/Public/Uploads/20240820190917190828174042-flame-towers-at-night.jpg",
    title: "Why KAS ALUMINUM?",
    description:
      "KAS ALÜMİNYUM stands out in the sector with its 'Custom Design' details, aesthetic minimal systems and innovative AR-GE studies specific to projects.",
  },
  {
    image: "https://kasalm.az/Public/Uploads/20240824125031pexels-tima-miroshnichenko-6615230.jpg",
    title: "PROJECT SUPPORT",
    description:
      "KAS ALÜMİNYUM shares closely followed projects in Azerbaijan and other countries with its Project Sales and Marketing department.",
  },
  {
    image: "https://kasalm.az/Public/Uploads/20240824144307333.jpg",
    title: "SERVICES",
    description:
      "Founded in 2017, KAS Alüminyum's production journey begins in its own facilities. Aluminum is meticulously processed from raw material to final product.",
  },
];

const Slider = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div id="slider-section" className="w-full h-[70vh] relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className={`w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl max-w-[800px] leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/60 rounded-full hover:bg-gray-800 transition">
        <FaChevronLeft className="text-white text-xl" />
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/60 rounded-full hover:bg-gray-800 transition">
        <FaChevronRight className="text-white text-xl" />
      </button>
    </div>
  );
};

export default Slider;
