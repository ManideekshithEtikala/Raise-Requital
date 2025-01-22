import { companies } from "../../../backend/Data";
import {motion} from "framer-motion";
const Companies = () => {
  return (
    <>
      <div>
        <motion.p
        whileInView={{opacity:1,y:0}}
        initial={{opacity:0,y:-50}}
         transition={{duration:0.7}} className="text-center text-5xl">
          Companies Allied with our Product
        </motion.p>
        <div className="grid grid-cols-5 gap-2 justify-items-center mt-16">
          {
            companies.map((company) => (
              <>
              <div className="flex justify-center  items-center w-28 h-28 ">
                <motion.img
                whileInView={{scale:1}}
                initial={{scale:0}}
                 transition={{duration:0.5}}
                  src={company.Url}
                  alt="image1"
                  className="mx-auto h-fit"
                />
              </div>
              </>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Companies;
