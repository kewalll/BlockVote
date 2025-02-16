import { motion } from "framer-motion";
import TagLine from "./TagLine";

const Slider = ({ images }) => {
  const imagesArr = [...images, ...images]; // Duplicate images for seamless looping

  return (
    <section
      id="sdgs"
      className="relative overflow-hidden mx-auto max-w-screen-xl py-7"
    >
      {/* Centered Heading */}
      <h2 className="text-center font-extrabold text-3xl mb-2 pt-3 w-full bg-gradient-to-r from-red-500 via-orange-600 to-pink-500 bg-clip-text text-transparent mt-10">
        SDG's Achieved
      </h2>

      {/* Centered Tagline */}
      <div className="w-full flex justify-center">
        <TagLine className="text-center block w-full mt-10">
          Driving Sustainable Democracy with Innovation and Integrity!
        </TagLine>
      </div>

      {/* Gradient Overlay for Smooth Effect */}
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bg-gradient-to-l after:h-full after:w-1/4 after:from-white after:to-transparent"></div>

      {/* Motion Slider */}
      <div className="w-full overflow-hidden mt-16">
        <motion.div
          className="flex flex-nowrap w-auto"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 100, // Adjust speed as needed
            repeat: Infinity,
          }}
          style={{ display: "flex", width: "max-content" }}
        >
          {/* Render the images twice to create a seamless loop */}
          {[...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr, ...imagesArr].map((image, index) => (
            <div key={index} className="flex-shrink-0 px-4">
              <div className="flex items-center justify-center h-auto">
                <img
                  src={typeof image === "string" ? image : image.logo}
                  alt={typeof image === "object" ? image.name : `Image ${index}`}
                  className="h-32 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Slider;
