import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Head = () => {
  const text = "Big Ideas";
  const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5, delay: delay },
    }
  });

  return (
    <>
      <motion.div className="flex flex-col sm:flex-row h-[80vh] md:h-[90vh]"
       whileInView={{opacity:1,y:0}}
       initial={{opacity:0,y:-100}}
        transition={{duration:0.5}}>
        <div className="w-full flex flex-col justify-center items-center ">
          <motion.p
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] text-blue-gray-900 flex flex-col justify-center font-serif items-center mt-10 font-bold text-center "
          >
            {text} <span className="text-2xl md:text-4xl sm:text-3xl py-1 md:py-6 lg:py-10">needs bold</span> believers
          </motion.p>
          <motion.div
          variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end lg:justify-center w-full sm:my-5 md:mt-20 mb-5 mt-2"
          >
            <button className="text-sm sm:text-md bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-white flex justify-center items-center mx-2">
              <Link to={'/Entrepreneur/Details'}>Varshith</Link>
              <FaArrowRight className="text-white mx-2 w-4" />
            </button>
          </motion.div>
        </div>
        <div className="w-full flex flex-col justify-center items-center ">
          <motion.p
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6rem] text-blue-gray-900 flex flex-col justify-center font-serif items-center font-bold text-center mt-5 "
          >
            Discover <span className="text-3xl sm:text-[3rem] md:text-[3.5rem] text-blue-gray-900 flex flex-col justify-center font-serif items-center sm:py-2 font-bold text-center lg:text-[3rem] lg:mt-6">Start ups</span>
            <span className="text-2xl md:text-4xl sm:text-3xl sm:py-2 md:py-6 lg:py-7">that are changing</span> the game!
          </motion.p>
          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end lg:justify-center w-full sm:my-5 md:mt-14 mt-2"
          >
            <button className="text-sm sm:text-md bg-gray-700 hover:bg-gray-900  text-white px-5 py-1 rounded-md flex justify-center items-center mx-4">
              Investor
              <FaArrowRight className="text-white mx-2 w-4" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Head;
