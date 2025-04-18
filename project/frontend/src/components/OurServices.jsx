import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    image: "https://kasalm.az/Public/Uploads/20240822162713pexels-expect-best-79873-323780.jpg",
    title: "Building the Future Today",
    description:
      "KAS ALÜMİNYUM offers solutions in the field of door-window, sliding and facade systems that provide low heat transmission in order to contribute to energy efficiency and reduce carbon footprint.",
  },
  {
    image: "https://kasalm.az/Public/Uploads/20240822163452pexels-pixabay-259950.jpg",
    title: "Comfort and Safety",
    description:
      "KAS ALUMINUM, door and window systems are designed to allow the use of special accessories and locking mechanisms that provide child safety and burglar safety.",
  },
  {
    image: "https://kasalm.az/Public/Uploads/20240822164722pexels-expect-best-79873-323772.jpg",
    title: "Affordable Cost and Implementation",
    description:
      "With the consultancy service it provides during the project design phase, KAS ALÜMİNYUM does not stick to standard system details, but can offer optimum cost solutions by producing new details specific to the projects.",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-52 sm:h-60 object-cover rounded-t-xl"
                  style={{ imageRendering: "auto" }}
                />
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                  <div className="w-10 h-1 bg-gray-300 mx-auto mt-4"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
