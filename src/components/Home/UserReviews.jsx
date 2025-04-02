import { Carousel } from "@material-tailwind/react";
import { Typography, Avatar } from "@material-tailwind/react";
import{Rate} from 'antd';
import { userReviews } from "../../../backend/Data";

const UserReviews = () => {
  const reviews = userReviews || [];
  return (
    <>
      <Carousel
        transition={{ type: "tween", duration: 2 }}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        loop={true}
        autoplayDelay={2500}
        autoplay={true}
        className="rounded-xl h-[60vh] md:h-[70vh]"
      >
        {reviews?.map((review, index) => (
          <div
            className="px-8 text-center h-full w-full object-cover flex flex-col justify-center items-center"
            key={index}
          >
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-3 font-light text-lg md:text-2xl lg:text-[2rem]"
            >
              {review.Review}
            </Typography>
            <Avatar src={review.ImageUrl} alt="image" size="lg" />
            <Typography variant="h6" className="mt-2 text-lg md:text-2xl lg:text-[2rem] text-blue-gray-800">
              {review.Name}
            </Typography>
            <Typography color="gray" className="mb-4 font-normal">
              {review.Postion} {/* Fixed typo: Postion -> Position */}
            </Typography>
            <Rate defaultValue={review.Rating} allowHalf={true} disabled size="large" count={5} style={{color:"#28304a"
            }} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default UserReviews;