import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPrivateLesson } from "../../redux/privateLessonSlice/privateLessonActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Info from "./Info";
import OrderBox from "./OrderBox";
import TeacherInfo from "./TeacherInfo";
import Reviews from "./Reviews";

const PrivateLessonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, onePrivateLesson } = useSelector(
    (store) => store.privateLesson
  );

  useEffect(() => {
    dispatch(getPrivateLesson(id));
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error isError={isError} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between w-full">
          <div>
            {/* Info detaylar kısmı */}
            <Info lesson={onePrivateLesson.privateLesson} />
            {/* Teacher detaylar kısmı */}
            <TeacherInfo
              teacher={onePrivateLesson?.privateLesson?.teacher}
              lessonType={onePrivateLesson?.privateLesson?.lessonType}
            />
            {/* Yorumlar kısmı */}
            <Reviews privateLessonId={id} />
          </div>
          {/* Satın alma kısmı */}
          <OrderBox lesson={onePrivateLesson?.privateLesson} />
        </div>
      )}
    </div>
  );
};

export default PrivateLessonDetail;
