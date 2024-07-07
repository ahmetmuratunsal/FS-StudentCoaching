import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MdClose } from "react-icons/md";
import api from "../../utils/api";
import { toast } from "react-toastify";
const AddMeetingLink = ({ data, close }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formVeri = Object.fromEntries(formData.entries());
    formVeri.status = "Planlanmış";

    await api
      .patch(`/meeting/${data._id}`, formVeri)
      .then((res) => {
        toast.success(
          "Görüşme linki ve programı eklendi. Sayfayı yenileyiniz."
        );
        close();
      })
      .catch((err) => {
        toast.error(
          "Görüşme linki ve programı eklerken bir hata meydana geldi"
        );
      });
  };
  return (
    <div className="w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.5)] grid place-items-center font-[poppins]">
      <div className="bg-white text-black w-1/3 h-auto rounded-lg p-5">
        <div className="flex items-center justify-between ">
          <h3 className="font-semibold text-xl">Randevu Bilgileri</h3>
          <MdClose onClick={close} className="text-2xl cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
          <p>
            Görüşme Yapılacak Öğrenci :{" "}
            <span className="text-blue-500 capitalize">
              {data?.student?.firstName} {data?.student?.lastName}
            </span>
          </p>

          <p>
            Görüşmenin Konusu:{" "}
            <span className="text-blue-500 capitalize">{data?.notes}</span>
          </p>

          <p>
            Randevu Tarihi :{" "}
            <span className="text-blue-500">
              {format(data?.date, "PPPPp", { locale: tr })}
            </span>
          </p>

          <p>
            Görüşme Yapacağınız Program :{" "}
            <input
              name="program"
              className="border px-3 py-1 rounded-lg "
              type="text"
              placeholder="Programın ismi"
            />
          </p>

          <p>
            Randevu Linki :{" "}
            <input
              name="link"
              type="text"
              placeholder="Randevu Linki"
              className="border px-3 py-1 rounded-lg"
            />
          </p>
          <div>
            <button
              type="submit"
              className="text-white bg-blue-500 px-5 py-1 rounded-lg"
            >
              Onayla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeetingLink;
