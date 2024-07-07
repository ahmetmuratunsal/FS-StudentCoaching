import { MdClose } from "react-icons/md";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useState } from "react";
const RejectRequest = ({ id, close }) => {
  const [rejectText, setRejectText] = useState(null);
  const handleReject = async (e) => {
    e.preventDefault();
    const data = { rejectText };
    await api
      .patch(`/meeting/${id}`, data)
      .then(() => {
        toast.success(
          "Randevu iptal isteği öğretmene iletildi. Sayfayı Yenileyiniz."
        );
        close();
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.5)] grid place-items-center font-[poppins]">
      <div className="bg-white text-black w-1/3 h-auto rounded-lg p-5">
        <div className="flex items-center justify-between ">
          <h3 className="font-semibold text-xl">Randevu İptal İsteği</h3>
          <MdClose onClick={close} className="text-2xl cursor-pointer" />
        </div>
        <form onSubmit={handleReject} className="flex flex-col gap-3 mt-5">
          <p>Lütfen Mazeretinizi Yazınız : </p>
          <textarea
            onChange={(e) => setRejectText(e.target.value)}
            name="rejectText"
            className="border border-red-500 p-3 rounded-md outline-green-500"
            placeholder="Sebep belirtebilirsiniz."
            cols="30"
            rows="10"
          />
          <div>
            <button
              type="submit"
              className="bg-red-500 text-white px-5 py-1 rounded-md"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectRequest;
