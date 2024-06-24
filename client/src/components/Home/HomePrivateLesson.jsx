import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrivateLessons } from "../../redux/privateLessonSlice/privateLessonActions";
import Loader from "../Loader";
import HomePrivateLessonCard from "./HomePrivateLessonCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HomePrivateLesson = () => {
  const { isLoading, isError, privateLessons } = useSelector(
    (store) => store.privateLesson
  );

  console.log(privateLessons);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrivateLessons());
  }, []);

  const options = {
    type: "slide", // Slider tipi: 'fade', 'slide', 'loop', vb.
    rewind: true, // Slider geri sarma
    gap: "10px", // Slider genişliği
    perPage: 3, // Aynı anda görünecek slayt sayısı
    perMove: 1, // Bir seferde kaydırılacak slayt sayısı
    autoplay: true, // Otomatik oynatma
    interval: 3000, // Otomatik oynatma aralığı (ms cinsinden)
  };

  return (
    <div className="flex flex-wrap gap-5 justify-between">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error isError={isError} />
      ) : (
        <div className="flex flex-col items-start justify-start lg:justify-center lg:items-center gap-5">
          <h1 className="font-bold text-2xl">Özel Derslerimiz</h1>
          <div className="w-1/2 ">
            <Splide options={options} aria-label="Private Lesson Detail Images">
              {privateLessons?.map((privateLesson) => (
                <SplideSlide key={privateLesson._id}>
                  <HomePrivateLessonCard
                    key={privateLesson._id}
                    privateLesson={privateLesson}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePrivateLesson;
