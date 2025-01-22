import { Carousel } from "@material-tailwind/react";
import { Typography, Avatar } from "@material-tailwind/react";
import{Rate} from 'antd';
import { userReview } from "../../../backend/Data";

const UserReviews = () => {
  const reviews = userReview || [];
console.log(reviews)
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
        className="rounded-xl h-[70vh]"
      >
        {reviews?.map((review, index) => (
          <div
            className="px-8 text-center h-full w-full object-cover flex flex-col justify-center items-center"
            key={index}
          >
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-6 font-light"
            >
              {review.Review}
            </Typography>
            <Avatar src={review.ImageUrl} alt="image" size="lg" />
            <Typography variant="h6" className="mt-4">
              {review.Name}
            </Typography>
            <Typography color="gray" className="mb-4 font-normal">
              {review.Postion} {/* Fixed typo: Postion -> Position */}
            </Typography>
            <Rate defaultValue={review.Rating} allowHalf={true} disabled size="large" count={5} style={{color:"black"
            }} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default UserReviews;