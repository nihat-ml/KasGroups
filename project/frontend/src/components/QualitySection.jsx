import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ target }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        const next = prev + Math.ceil(target / 100); // Daha yavaş artım
        return next >= target ? target : next;
      });
    }, 60); // Daha yavaş interval

    return () => clearInterval(interval);
  }, [target]);

  return <span className="text-5xl font-extrabold text-gray-800">{value}</span>;
};

const QualitySection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-16 py-16">
      
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://kasalm.az/Public/images/added1.jpg"
          alt="Premium Quality"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          We guarantee the quality of our products and services
        </h2>
        <p className="text-lg text-gray-600 italic mt-2">
          Premium product and premium quality
        </p>

        <motion.div
          className="w-16 h-1 bg-blue-500 my-4 mx-auto md:mx-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>

        <div className="flex justify-center md:justify-start gap-16 mt-6">
          {[
            { value: 8, label: "Sales" },
            { value: 3, label: "Services" },
            { value: 11, label: "Sales and Services" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center w-32 p-4 bg-gray-100 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <AnimatedNumber target={stat.value} />
              <p className="text-gray-600 text-lg mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default QualitySection;
