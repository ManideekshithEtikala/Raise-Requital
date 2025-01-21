
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
    },
  });
  return (
    <>
      <div className=" flex h-[90vh]">
        <div className="w-full flex flex-col justify-center">
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-[7rem] text-black flex flex-col justify-center font-serif items-center mt-18 font-bold"
          >
            {text} <span className="text-5xl">needs bold</span>bilievers
          </motion.p>
          <div className="flex justify-end mr-10 mt-20">
            <button className="bg-blue-800 px-3 py-1 rounded-md text-white flex justify-center items-center mx-4">Entrepreneur
            <FaArrowRight className="text-white mx-2 w-4"/>
            </button>
          </div>
        </div>
        <div className="w-full">
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-[6rem] flex flex-col justify-end font-serif items-center mt-10 font-bold bg-clip-text"
          >
            Discover <span>Start Ups</span>
            <span className="text-4xl ">that are changing</span>the game!.
          </motion.p>
          <div className="flex justify-end mr-10">
            <button className="bg-blue-800 text-white px-5 py-1 rounded-md flex justify-center items-center mx-4">Investor
            <FaArrowRight className="text-white mx-2 w-4"/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
