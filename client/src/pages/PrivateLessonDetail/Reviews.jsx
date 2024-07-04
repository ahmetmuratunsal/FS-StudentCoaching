import { useEffect } from "react";
import Review from "./Review";
import {
  createReview,
  getAllReviews,
} from "../../redux/reviewSlice/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const Reviews = ({ privateLessonId }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, reviews, isCreateLoading } = useSelector(
    (store) => store.reviews
  );

  useEffect(() => {
    dispatch(getAllReviews(privateLessonId));
  }, [privateLessonId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const star = formData.get("rate");
    const description = formData.get("description");

    if (!star || !description) {
      return toast.error("Lütfen yıldız ve açıklama kısmını giriniz");
    }

    const newReview = {
      privateLessonId: privateLessonId,
      star: +star, // Input'tan gelen değeri number tipine çevirme
      desc: description,
    };

    try {
      dispatch(createReview(newReview));
      e.target[5].value = ""; // Açıklama alanını temizle
      const radioButtons = document.querySelectorAll('input[name="rate"]');
      radioButtons.forEach((radio) => {
        radio.checked = false;
      });

      toast.success("Yorumunuz başarıyla eklenmiştir");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold">Yorumlar</h1>
      {/* yorum gönderme */}
      {user && user.isStudent && (
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
              name="description"
              placeholder="Açıklama..."
              type="text"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 rounded p-3 font-bold text-white"
                disabled={isCreateLoading}
              >
                {isCreateLoading ? <Spinner /> : "Gönder"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error isError={isError} />
      ) : reviews.length > 0 ? (
        reviews.map((item) => <Review key={item._id} item={item} />)
      ) : (
        <h2 className="my-2">
          Henüz yorum atılmamış :/{" "}
          {user && user.isStudent && "İlk yorumu atmak ister misin ?"}
        </h2>
      )}
    </div>
  );
};

export default Reviews;
