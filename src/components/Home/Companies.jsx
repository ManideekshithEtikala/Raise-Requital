import { companies } from "../../../backend/Data";
import {motion} from "framer-motion";
const Companies = () => {
  return (
    <>
      <div>
        <motion.p
        whileInView={{opacity:1,y:0}}
        initial={{opacity:0,y:-50}}
         transition={{duration:0.7}} className="text-center text-2xl text-gray-900 font-medium font-serif md:text-5xl">
          Companies Allied with Us
        </motion.p>
        <div className="grid grid-cols-5 gap-2 justify-items-center mt-5 mx-1">
          {
            companies.map((company,ind) => (
              <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 " key={ind}>
                <motion.img
                whileInView={{scale:1}}
                initial={{scale:0}}
                 transition={{duration:0.5}}
                  src={company.Url}
                  alt="image1"
                  className="mx-auto h-fit"
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Companies;
