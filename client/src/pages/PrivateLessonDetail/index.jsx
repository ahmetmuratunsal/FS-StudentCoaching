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

  const lesson = onePrivateLesson.privateLesson;

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
        <div className="flex flex-col lg:flex-row gap-10">
          <div>
            {/* Info detaylar kısmı */}
            <Info lesson={lesson} />
            {/* Teacher detaylar kısmı */}
            <TeacherInfo teacher={lesson?.teacher} />
            {/* Yorumlar kısmı */}
            <Reviews />
          </div>
          {/* Satın alma kısmı */}
          <OrderBox lesson={lesson} />
        </div>
      )}
    </div>
  );
};

export default PrivateLessonDetail;
