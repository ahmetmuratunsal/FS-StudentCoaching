import { FaStar } from "react-icons/fa";
import { cityOptions } from "./../../constants/selectInput";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const TeacherInfo = ({ teacher, lessonType }) => {
  return (
    <div className="w-[300px] lg:w-[700px]">
      <div>
        <h1 className="text-lg font-bold mt-5">Öğretmen Hakkında</h1>

        <div className="flex items-center gap-2 mt-4">
          <img
            className="w-[70px] h-[70px] rounded-full object-cover"
            src={teacher?.profilePhoto}
            alt={teacher?.username}
          />
          <div className="flex flex-col gap-1">
            <h4 className="capitalize text-lg font-bold">
              {teacher?.username}
            </h4>
            <div className="flex gap-1 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <button className="text-sm rounded-md py-1 px-2 border">
              İletişime Geç
            </button>
          </div>
        </div>
      </div>
      <div className="border mt-5 p-5">
        <p className="flex flex-col gap-2">
          <span>Otobiografi</span>
          <span>{teacher?.bio}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <p className="flex flex-col gap-1 ">
            <span>İsim Soyisim</span>
            <span className="font-bold capitalize">
              {teacher?.firstName} {teacher?.lastName}
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span>Hangi Şehirdeyim?</span>
            <span className="font-bold capitalize">
              {cityOptions.map((i) => i.value === teacher?.city && i.label)}
            </span>
          </p>

          <p className="flex flex-col gap-1">
            <span>Ders yeri tercihim?</span>
            <span className="font-bold capitalize">{lessonType}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span>Üyelik Tarihi</span>
            <span className="font-bold capitalize">
              {format(teacher?.createdAt, "dd MMMM yyyy", { locale: tr })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
