import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMeetings } from "../../redux/meetingSlice/meetingActions";
import { changeCategoryName } from "./../../utils/utils";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import MeetingLink from "./MeetingLink";
import RejectRequest from "./RejectRequest";

const StudentMeetings = () => {
  const dispatch = useDispatch();
  const [filterParam, setFilterParam] = useState("");
  const [isOpenLink, setIsOpenLink] = useState(false);
  const [isOpenRejectRequest, setIsOpenRejectRequest] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoading, isError, meetings } = useSelector(
    (store) => store.meeting
  );
  useEffect(() => {
    dispatch(
      getAllMeetings({
        student: user._id,
        status: filterParam === "" ? undefined : filterParam,
      })
    );
  }, [dispatch, filterParam, isOpenLink, isOpenRejectRequest]);

  const handleDelete = (meetingId) => {
    api
      .delete(`/meeting/${meetingId}`)
      .then(() => {
        toast.success("Randevu silindi");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <section className="container mx-auto p-6 font-mono">
      <h1 className="text-xl font-bold mb-6">Tüm Randevularım</h1>
      <form className="mb-6 flex flex-col gap-1 items-start">
        <label htmlFor="status">Randevu Durumuna Göre Filtrele</label>
        <select
          onChange={(e) => setFilterParam(e.target.value)}
          name="status"
          value={filterParam}
          className="border px-2 py-1 rounded-lg mx-2"
        >
          <option value="">Tüm Randevular</option>
          <option value="Planlanmış">Planlanmış</option>
          <option value="Beklemede">Beklemede</option>
          <option value="Tamamlandı">Tamamlandı</option>
          <option value="İptal Edildi">İptal Edildi</option>
        </select>
      </form>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Öğretmen İsim Soyisim</th>
                <th className="px-4 py-3">Randevu Durumu</th>
                <th className="px-4 py-3">Randevu Tarihi</th>
                <th className="px-4 py-3">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <Error isError={isError} />
              ) : (
                meetings?.data?.map((meeting) => (
                  <tr key={meeting._id} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={meeting.teacher.profilePhoto}
                            alt={meeting.teacher.firstName}
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">
                            {meeting.teacher.firstName}{" "}
                            {meeting.teacher.lastName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {changeCategoryName(meeting.teacher.lesson)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span
                        className={`px-2 py-1 font-semibold leading-tight ${
                          meeting.status === "Planlanmış"
                            ? "text-yellow-700 bg-yellow-100 rounded-sm"
                            : meeting.status === "Tamamlandı"
                            ? "text-green-700 bg-green-100 rounded-sm"
                            : meeting.status === "Beklemede"
                            ? "text-blue-700 bg-blue-100 rounded-sm"
                            : "text-red-700 bg-red-100 rounded-sm"
                        } `}
                      >
                        {meeting.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {format(meeting.date, "PPPPp", { locale: tr })}
                    </td>

                    <td className="px-4 py-3 text-ms font-semibold border">
                      {meeting.status === "Beklemede" ? (
                        <>
                          <button className="mr-2 text-yellow-500 bg-yellow-100 p-1 rounded-lg">
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(meeting._id)}
                            className="text-red-500 bg-red-100 p-1 rounded-lg"
                          >
                            Sil
                          </button>
                        </>
                      ) : meeting.status === "Tamamlandı" ? (
                        <button className="text-green-500 bg-green-100 p-1 rounded-lg">
                          Puanla
                        </button>
                      ) : meeting.status === "Planlanmış" ? (
                        <>
                          <button
                            onClick={() => setIsOpenLink(meeting)}
                            className="text-green-400 bg-green-100 p-1 rounded-lg mr-2"
                          >
                            Linki Gör
                          </button>
                          <button
                            onClick={() => setIsOpenRejectRequest(meeting._id)}
                            className="text-orange-400 bg-orange-100 p-1 rounded-lg"
                          >
                            {meeting.rejectText
                              ? "Öğretmen Cevabı Bekliyor"
                              : "Mazeret Bildir"}
                          </button>
                        </>
                      ) : (
                        <button className="text-gray-500 bg-gray-100 p-1 rounded-lg">
                          Aktif Et
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <ul className="py-5 px-10 list-disc text-sm text-gray-500">
          <li>
            Oluşturulan randevuların öğretmen tarafından onaylanması
            gerekmektedir. Onaylanana kadar randevuyu silebilir veya
            düzenleyebilirsiniz
          </li>
          <li>
            Planlanmış randevuları iptal edebilmek için mazeret bildirmelisiniz.
          </li>
          <li>
            İptal edilen randevuları aktif etmek için aktif et butonuna tıklayıp
            öğretmenle iletişime geçebilirsiniz.
          </li>
          <li>
            Tamamlanmış randevularınızı puanla butonuna tıklayarak lütfen
            puanlayınız.
          </li>
        </ul>
      </div>
      {isOpenLink && (
        <MeetingLink data={isOpenLink} close={() => setIsOpenLink(false)} />
      )}

      {isOpenRejectRequest && (
        <RejectRequest
          id={isOpenRejectRequest}
          close={() => setIsOpenRejectRequest(false)}
        />
      )}
    </section>
  );
};

export default StudentMeetings;
