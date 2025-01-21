import React from "react";
import { Carousel } from "@material-tailwind/react";
import { Typography, Avatar, Rating } from "@material-tailwind/react";
const UserReviews = () => {
  return (
    <>
      <Carousel
        transition={{ type: "tween", duration: 1 }}
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
        className="rounded-xl h-[90vh]"
      >
        <div className="px-8 text-center h-full w-full object-cover flex flex-col justify-center items-center">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-6 font-medium"
          >
            &quot;This is an excellent product, the documentation is excellent
            and helped me get things done more efficiently.&quot;
          </Typography>
          <Avatar
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image"
            size="lg"
          />
          <Typography variant="h6" className="mt-4">
            Tania Andrew
          </Typography>
          <Typography color="gray" className="mb-4 font-normal">
            Lead Frontend Developer
          </Typography>
          <Rating value={5} readonly />
        </div>
        <div className="px-8 text-center h-full w-full object-cover flex flex-col justify-center items-center">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-6 font-medium"
          >
            &quot;This is an excellent product, the documentation is excellent
            and helped me get things done more efficiently.&quot;
          </Typography>
          <Avatar
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image"
            size="lg"
          />
          <Typography variant="h6" className="mt-4">
            Tania Andrew
          </Typography>
          <Typography color="gray" className="mb-4 font-normal">
            Lead Frontend Developer
          </Typography>
          <Rating value={5} readonly />
        </div>
        <div className="px-8 text-center h-full w-full object-cover flex flex-col justify-center items-center">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-6 font-medium"
          >
            &quot;This is an excellent product, the documentation is excellent
            and helped me get things done more efficiently.&quot;
          </Typography>
          <Avatar
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image"
            size="lg"
          />
          <Typography variant="h6" className="mt-4">
            Tania Andrew
          </Typography>
          <Typography color="gray" className="mb-4 font-normal">
            Lead Frontend Developer
          </Typography>
          <Rating value={5} readonly />
        </div>
      </Carousel>
    </>
  );
};

export default UserReviews;
