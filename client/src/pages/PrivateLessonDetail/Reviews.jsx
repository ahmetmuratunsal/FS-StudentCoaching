import { useEffect } from "react";
import Review from "./Review";
import { getAllReviews } from "../../redux/reviewSlice/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { FaStar } from "react-icons/fa";
import api from "../../utils/api";

const Reviews = ({ privateLessonId }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, reviews } = useSelector((store) => store.reviews);

  useEffect(() => {
    dispatch(getAllReviews(privateLessonId));
  }, [privateLessonId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const starInpArr = [
      e.target[0],
      e.target[1],
      e.target[2],
      e.target[3],
      e.target[4],
    ];
    const found = starInpArr.find((inp) => inp.checked == true);
    const newReview = {
      star: found.value,
      desc: e.target[5].value,
      privateLessonId,
    };

    api.post("/review", newReview);
  };

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold">Yorumlar</h1>
      {/* yorum gönderme */}
      <div>
        <h2 className="font-semibold my-4">Yorum Gönder</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* star alanı */}
          <label>Deneyiminizi Puanlayın</label>
          <div className="flex">
            <div className="rating">
              <input type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">
                <FaStar />
              </label>
            </div>
          </div>
          {/* input alanı */}
          <label className="mt-5">Yorumunuzu Yazın</label>
          <input
            className="border p-2 rounded-md shadow"
            placeholder="Açıklama..."
            type="text"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 rounded p-3 font-bold text-white"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error isError={isError} />
      ) : reviews.length > 0 ? (
        reviews.map((item) => <Review key={item._id} item={item} />)
      ) : (
        <h2 className="my-2">
          Henüz yorum atılmamış :/ İlk yorumu atmak ister misin ?
        </h2>
      )}
    </div>
  );
};

export default Reviews;
