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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-10"></div>

        <div className="grid md:grid-cols-3 gap-8 px-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="w-10 h-1 bg-gray-300 mx-auto mt-4"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
