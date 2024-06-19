import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaStar } from "react-icons/fa";

const Info = ({ lesson }) => {
  const options = {
    type: "loop", // Loop özelliğini etkinleştirir
    perPage: 1, // Her sayfada 1 slide gösterir
    gap: "1rem", // Slide'lar arasında boşluk
  };
  const starArr =
    lesson?.avgRating && Array(Math.round(lesson?.avgRating)).fill();
  return (
    <div className=" flex flex-1 flex-col gap-4">
      <p className="text-gray-500 capitalize flex gap-3 items-center">
        <Link to={"/"} className="text-lg">
          <AiOutlineHome />{" "}
        </Link>
        / <span>{lesson?.category}</span>
      </p>
      <h1 className="font-bold text-xl md:text-2xl capitalize">
        {lesson?.title}
      </h1>
      <div className="flex items-center gap-3">
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={lesson?.teacher?.profilePhoto}
          alt={lesson?.teacher?.username}
        />
        <h4 className="capitalize font-bold">{lesson?.teacher?.username}</h4>
        {starArr?.map((item, i) => (
          <FaStar key={i} className="text-yellow-500 cursor-pointer" />
        ))}
        <div className="flex items-center gap-[3px]">
          <span className="font-semibold">{lesson?.avgRating}</span>
          <span>({lesson?.totalRating})</span>
        </div>
      </div>

      {lesson?.images.length > 0 && (
        <Splide options={options} aria-label="My Favorite Images">
          {lesson?.images.map((url) => (
            <SplideSlide key={url}>
              <img
                className="w-full h-[50vh] object-contain"
                src={url}
                alt="Image 1"
              />
            </SplideSlide>
          ))}
        </Splide>
      )}

      <h1 className="font-bold text-lg">Bu Özel Ders Hakkında</h1>
      <p>{lesson?.desc}</p>
    </div>
  );
};

export default Info;
