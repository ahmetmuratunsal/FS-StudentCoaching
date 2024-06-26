import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrivateLessons } from "../../redux/privateLessonSlice/privateLessonActions";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import PrivateLessonCard from "../../components/PrivateLessonCard";

const MyPrivateLesson = () => {
  const dispatch = useDispatch();
  const params = {
    userId: JSON.parse(localStorage.getItem("user"))._id,
  };

  useEffect(() => {
    dispatch(getAllPrivateLessons(params));
  }, [params.userId]);

  const { isLoading, isError, privateLessons } = useSelector(
    (store) => store.privateLesson
  );

  return (
    <div>
      <h1 className="text-2xl my-3 font-semibold">Bana ait özel dersler</h1>
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

export default MyPrivateLesson;
