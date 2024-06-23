import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPrivateLessons } from "../redux/privateLessonSlice/privateLessonActions";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import PrivateLessonCard from "./../components/PrivateLessonCard";
import FilterArea from "../components/FilterArea";

const PrivateLesson = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, privateLessons } = useSelector(
    (store) => store.privateLesson
  );
  //* urlden parametreleri al (aratılan kelimeyi)
  const [params] = useSearchParams();

  const title = params.get("title");
  const min = params.get("min");
  const max = params.get("max");
  const sort = params.get("sort");
  const fields =
    "title,coverImg,price,category,teacher,avgRating,reviewCount,starCount";
  //* parametrelerin hepsini göndermek için bir obje haline getir.
  const parametre = { title, min, max, sort, fields };
  //* apidan filtrelere uygun verileri al statee aktar. isloading iserror kontrolünü de yap
  useEffect(() => {
    dispatch(getAllPrivateLessons(parametre));
  }, [title, min, max, sort]);

  return (
    <div>
      {title && (
        <h1 className="text-xl mb-5">
          <span className="font-semibold">{title}</span> için sonuçlar
        </h1>
      )}
      <FilterArea />
      <div className="privateLessons">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error isError={isError} />
        ) : (
          privateLessons?.map((privateLesson) => (
            <PrivateLessonCard
              key={privateLesson._id}
              privateLesson={privateLesson}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PrivateLesson;
