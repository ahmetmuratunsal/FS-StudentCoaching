import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const PrivateLessonCard = ({ privateLesson }) => {
  return (
    <Link
      to={`/privatelesson/${privateLesson._id}`}
      className="max-w-[300px] border p-2 rounded-md shadow hover:shadow-lg cursor-pointer flex flex-col gap-2"
    >
      {/* //? cover image */}
      <img className="w-[300px]" src="/logo3.png" alt={privateLesson.title} />
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
      <p className="flex items-center gap-1 font-bold text-lg">
        <FaStar className="text-yellow-500" />
        {privateLesson.avgRating}
        <span className="font-normal">({privateLesson.totalRating})</span>
      </p>
      {/* //? fiyat alanı */}
      <p className="font-semibold">₺{privateLesson.price}</p>
    </Link>
  );
};

export default PrivateLessonCard;
