import { FaRegClock } from "react-icons/fa";
import { GiFaceToFace } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";
const OrderBox = ({ lesson }) => {
  return (
    <div className="h-fit flex flex-col gap-4 border shadow rounded-md p-5">
      <div className="flex justify-between items-center gap-5">
        <h2 className="font-semibold text-lg text-nowrap">
          {lesson?.shortTitle}
        </h2>
        <p className="text-lg">₺{lesson?.price}</p>
      </div>
      <h2>{lesson?.shortDesc}</h2>

      <div className="flex flex-col lg:flex-col sm:flex-row justify-between font-semibold gap-2 ">
        <p className="flex items-center gap-2 whitespace-nowrap">
          <FaRegClock />
          <span> {lesson?.duration}</span> Dakika Ders Süresi
        </p>
        <p className="flex items-center gap-3 whitespace-nowrap">
          <GiFaceToFace />
          <span> Ders Yeri:</span>{" "}
          <span className="capitalize">{lesson?.lessonType}</span>
        </p>
      </div>

      {lesson?.features && (
        <ul>
          {lesson?.features?.map((text, i) => (
            <li key={i} className="flex gap-2 items-center">
              <IoMdCheckmark className="text-2xl font-bold" />
              <span className="text-gray-400">{text}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="bg-green-500 p-2 mt-2 text-white font-semibold hover:bg-green-600 transition rounded-md">
        Devam Et
      </button>
    </div>
  );
};

export default OrderBox;
