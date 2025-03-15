import { Data } from "../../../backend/Data";
import { motion } from "framer-motion";
const BuinessModel = () => {
  return (
    <>
      <motion.div
            whileInView={{opacity:1,y:0}}
            initial={{opacity:0,y:-50}}
             transition={{duration:1}} className="flex flex-col justify-center items-center mt-16 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-serif text-gray-900">Business Models</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

         {/* business models */}
         {
           Data.map((model) => (
            <div
            className="bg-gray-50 border border-gray-300 rounded-lg shadow" key={model.id}>
              <a href="#" className="flex items-center justify-center" key={model.id}>
                <img
                  className="rounded-t-lg mt-1 w-fit h-fit sm:w-[300px] sm:h-fit md:w-[300px] md:h-fit object-cover"
                  src={model.ImageUrl}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl tracking-tight text-gray-900 ">
                  {model.Title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-500">{model.Description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
           ))
         }
        </div>
      </motion.div>
    </>
  );
};

export default BuinessModel;
