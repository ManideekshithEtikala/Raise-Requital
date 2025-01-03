import React from "react";
import Rightimg from "/Users/manideekshith/Desktop/Manideekshith/MERN stack projects/RaiseRequital/frontend/raiserequital/src/assets/rightside.png";
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
      <div className=" flex h-[90vh] bg-clip-text">
        <div className=" w-full flex flex-col justify-center font-bold border-r-2 border-slate-400">
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-[7rem] text-transparent  flex flex-col justify-start font-serif items-center mt-18"
            style={{
              WebkitTextStroke: "1.3px white",
            }}
          >
            {text} <span className="text-4xl">needs bold</span>bilievers
          </motion.p>
          <div className="flex justify-end mr-10 mt-20">
            <button className="bg-white px-3 py-1 rounded-md flex justify-center items-center mx-4">Entrepreneur
            <FaArrowRight className="text-black mx-2 w-4"/>
            </button>
          </div>
        </div>
        <div className="w-full bg-white">
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            style={{ backgroundImage: `url(${Rightimg})` }}
            className="text-[6rem] text-transparent flex flex-col justify-end font-serif items-center mt-10 font-bold bg-clip-text"
          >
            Discover <span>Start Ups</span>
            <span className="text-4xl ">that are changing</span>the game!.
          </motion.p>
          <div className="flex justify-end mr-10">
            <button className="bg-blue-800 text-white px-5 py-1 rounded-md flex justify-center items-center mx-4">Investor
            <FaArrowRight className="text-white mx-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
