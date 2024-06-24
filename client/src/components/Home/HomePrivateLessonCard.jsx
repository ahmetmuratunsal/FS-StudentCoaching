import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const HomePrivateLessonCard = ({ privateLesson }) => {
  const starArr =
    privateLesson?.avgRating &&
    Array(Math.round(privateLesson?.avgRating)).fill();

  return (
    <Link
      to={`/privatelesson/${privateLesson._id}`}
      className="max-w-[200px] w-[170px] h-[320px]  border p-4 rounded-md shadow hover:shadow-lg cursor-pointer flex flex-col gap-2"
    >
      {/* //? cover image */}
      <img
        className="h-[100px] object-contain  rounded"
        src={privateLesson.coverImg}
        alt={privateLesson.title}
      />
      {/*  //? öğretmen bilgileri */}
      <div className="flex gap-2 items-center">
        <img
          className="w-[30px] h-[30px] rounded-full"
          src={privateLesson.teacher.profilePhoto}
          alt=""
        />
        <p>
          <span className="capitalize font-semibold text-sm">
            {privateLesson.teacher.username}
          </span>{" "}
          <span className="text-sm">tarafından</span>
        </p>
      </div>
      {/*  //? başlık alanı */}
      <p className="font-semibold capitalize text-sm">{privateLesson.title}</p>
      {/*  //? rating alanı */}
      <div className="flex items-center gap-2 font-bold text-sm">
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
    </Link>
  );
};

export default HomePrivateLessonCard;
