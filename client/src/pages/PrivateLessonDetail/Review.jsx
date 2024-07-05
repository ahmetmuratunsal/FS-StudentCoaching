import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

const Review = ({ item }) => {
  const arr = Array(Math.round(item.star)).fill();
  return (
    <div className="flex flex-col gap-5 py-10 border-b">
      <div className="flex gap-5">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src={item.student.profilePhoto}
          alt=""
        />

        <div>
          <h4 className="font-semibold">{item.student.username}</h4>
          <p>{item.student.city}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {arr.map((x, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}

        <span className="ms-1 me-3">{item.star}</span>
        <span className="border-s px-3 text-gray-600">
          {formatDistanceToNow(item.createdAt, { locale: tr, addSuffix: true })}
        </span>
      </div>

      <p>{item.desc}</p>
      <div className="flex gap-5 items-center">
        <span className="font-semibold">Yardımcı oldu mu ?</span>
        <button className="flex gap-1 items-center">
          <AiOutlineLike />
          Yes
        </button>
        <button className="flex gap-1 items-center">
          <AiOutlineDislike />
          No
        </button>
      </div>
    </div>
  );
};

export default Review;
