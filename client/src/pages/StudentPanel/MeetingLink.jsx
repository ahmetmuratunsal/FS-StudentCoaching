import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MdClose } from "react-icons/md";
const MeetingLink = ({ data, close }) => {
  return (
    <div className="w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.5)] grid place-items-center font-[poppins]">
      <div className="bg-white text-black w-1/3 h-auto rounded-lg p-5">
        <div className="flex items-center justify-between ">
          <h3 className="font-semibold text-xl">Randevu Bilgileri</h3>
          <MdClose onClick={close} className="text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <p>
            Görüşme Yapılacak Öğretmen :{" "}
            <span className="text-blue-500">
              {data?.teacher?.firstName} {data?.teacher?.lastName}
            </span>
          </p>

          <p>
            Randevu Tarihi :{" "}
            <span className="text-blue-500">
              {format(data?.date, "PPPPp", { locale: tr })}
            </span>
          </p>

          <p>
            Görüşme Programı :{" "}
            <span className="text-blue-500">{data?.program} - </span>
            <span className="text-xs">
              İndirmek İçin{" "}
              <a
                className="cursor-pointer font-bold text-blue-500 underline"
                href="https://zoom.us/tr/download"
              >
                Tıklayınız
              </a>
            </span>
          </p>

          <p>
            Randevu Linki :{" "}
            <a
              href={data?.link}
              className="text-blue-500 underline cursor-pointer"
            >
              {data?.link}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetingLink;
