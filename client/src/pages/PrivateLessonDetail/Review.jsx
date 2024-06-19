import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const Review = () => {
  return (
    <div className="flex flex-col gap-5 py-10 border-b">
      <div className="flex gap-5">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="https://picsum.photos/200/300"
          alt=""
        />

        <div>
          <h4 className="font-semibold">Ahmet</h4>
          <p>Ankara</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <span className="ms-1 me-3">5</span>
        <span className="border-s px-3 text-gray-600">1 Ay Önce</span>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
        architecto.
      </p>
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
