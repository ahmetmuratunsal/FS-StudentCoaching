import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const PrivateLessonCard = ({ privateLesson }) => {
  const starArr =
    privateLesson?.avgRating &&
    Array(Math.round(privateLesson?.avgRating)).fill();

  return (
    <Link
      to={`/privatelesson/${privateLesson._id}`}
      className="max-w-[400px]  border p-4 rounded-md shadow hover:shadow-lg cursor-pointer flex flex-col gap-2"
    >
      {/* //? cover image */}
      <img
        className="h-[300px] object-contain  rounded"
        src={privateLesson.coverImg}
        alt={privateLesson.title}
      />
      {/*  //? öğretmen bilgileri */}
      <div className="flex gap-2 items-center">
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={privateLesson.teacher.profilePhoto}
          alt=""
        />
        <p>
          <span className="capitalize font-semibold">
            {privateLesson.teacher.username}
          </span>{" "}
          tarafından
        </p>
      </div>
      {/*  //? başlık alanı */}
      <p className="font-semibold capitalize">{privateLesson.title}</p>
      {/*  //? rating alanı */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <div className="flex items-center gap-1">
          {starArr.length > 0 ? (
            starArr?.map((item, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))
          ) : (
            <FaStar />
          )}
        </div>

        {privateLesson.reviewCount === 0 ? "0" : privateLesson.avgRating}
        <span className="font-normal">({privateLesson.reviewCount})</span>
      </div>
      {/* //? fiyat alanı */}
      <p className="font-semibold">₺{privateLesson.price}</p>
    </Link>
  );
};

export default PrivateLessonCard;
