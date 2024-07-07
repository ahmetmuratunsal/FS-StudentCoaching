import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../../utils/api";
const RejectPage = ({ data, close }) => {
  const handleReject = async (meetingId) => {
    const data = { status: "İptal Edildi" };
    await api
      .patch(`/meeting/${meetingId}`, data)
      .then(() => {
        toast.success(
          "Randevu iptal isteği kabul edildi. Sayfayı Yenileyiniz."
        );
        close();
      })
      .catch((err) =>
        toast.error("Randevu iptal edilirken bir hata meydana geldi")
      );
  };
  return (
    <div className="w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.5)] grid place-items-center font-[poppins]">
      <div className="bg-white text-black w-1/3 h-auto rounded-lg p-5">
        <div className="flex items-center justify-between ">
          <h3 className="font-semibold text-xl">Randevu İptal Sayfası</h3>
          <MdClose onClick={close} className="text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <p>
            Öğrencinin Mazereti :{" "}
            <span className="text-blue-500">{data?.rejectText}</span>
          </p>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => handleReject(data._id)}
              className="bg-red-500 px-3 py-1 cursor-pointer text-white rounded-lg "
            >
              İptali Kabul Et
            </button>
            <button
              onClick={() => {
                close();
                toast.error("Iptal Reddedildi. Sayfayı yenileyiniz.");
              }}
              className="bg-gray-500 px-3 py-1 cursor-pointer text-white rounded-lg"
            >
              İptali Reddet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectPage;
