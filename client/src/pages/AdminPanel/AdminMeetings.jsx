import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import "moment/locale/tr";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { Link } from "react-router-dom";
import { getAllMeetings } from "./../../redux/meetingSlice/meetingActions";

const AdminMeetings = () => {
  const dispatch = useDispatch();
  const [filterParam, setFilterParam] = useState("");

  const { isLoading, isError, meetings } = useSelector(
    (store) => store.meeting
  );

  useEffect(() => {
    dispatch(
      getAllMeetings({ status: filterParam === "" ? undefined : filterParam })
    );
  }, [dispatch, filterParam]);

  return (
    <div className="w-full">
      <h2 className="font-semibold text-xl"> Tüm Randevular</h2>
      {/* filtreleme */}
      <form className="mb-6 flex items-center gap-1  my-4">
        <label htmlFor="status">Randevu Durumuna Göre Filtrele</label>
        <select
          onChange={(e) => setFilterParam(e.target.value)}
          name="status"
          value={filterParam}
          className="border px-2 py-1 rounded-lg mx-2 focus:outline-green-500 focus:font-semibold"
        >
          <option value="">Tüm Randevular</option>
          <option value="Planlanmış">Planlanmış</option>
          <option value="Beklemede">Beklemede</option>
          <option value="Tamamlandı">Tamamlandı</option>
          <option value="İptal Edildi">İptal Edildi</option>
        </select>
      </form>
      {meetings?.data?.length > 0 ? (
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6 mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 text-start min-w-[100px]">
                            Öğrenci İsmi
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Öğretmen İsmi
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Durumu
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Randevu Tarihi
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Güncellenme Tarihi
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Detaylar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <Loader />
                        ) : isError ? (
                          <Error />
                        ) : (
                          meetings?.data?.map((meeting) => (
                            <tr
                              key={meeting._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0 text-start">
                                <Link
                                  to={`/teachermeeting/${meeting._id}`}
                                  className="flex items-center"
                                >
                                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                    <img
                                      src={meeting.student.profilePhoto}
                                      className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                      alt={meeting.student.firstName}
                                    />
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    <a
                                      href="#"
                                      className="mb-1 font-semibold capitalize transition-colors duration-200 ease-in-out text-base text-secondary-inverse hover:text-primary"
                                    >
                                      {meeting.student.firstName}{" "}
                                      {meeting.student.lastName}
                                    </a>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold capitalize text-light-inverse text-md/normal">
                                  {meeting.teacher.firstName}{" "}
                                  {meeting.teacher.lastName}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span
                                  className={`${
                                    meeting.status === "Tamamlandı"
                                      ? "text-green-500"
                                      : meeting.status === "İptal Edildi"
                                      ? "text-red-500"
                                      : meeting.status === "Planlanmış"
                                      ? "text-orange-500"
                                      : "text-blue-500"
                                  } font-semibold text-light-inverse text-md/normal`}
                                >
                                  {meeting.status}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  {moment(meeting.date).format("LLLL")}
                                </span>
                              </td>
                              <td
                                className={`${
                                  meeting.status === "Tamamlandı"
                                    ? "text-green-500"
                                    : meeting.status === "İptal Edildi"
                                    ? "text-red-500"
                                    : meeting.status === "Planlanmış"
                                    ? "text-orange-500"
                                    : "text-blue-500"
                                } p-3 pr-0 text-center`}
                              >
                                {meeting.status === "Tamamlandı" ? (
                                  <span className="font-semibold text-light-inverse text-md/normal">
                                    {moment(meeting.updatedAt).format(
                                      "DD-MMMM-YYYY"
                                    )}
                                  </span>
                                ) : (
                                  <span className="font-semibold text-light-inverse text-md/normal">
                                    Henüz Tamamlanmadı
                                  </span>
                                )}
                              </td>
                              <td className="p-3 pr-0 ">
                                <Link
                                  to={`/teachermeeting/${meeting._id}`}
                                  className="font-semibold  flex justify-center items-center gap-2"
                                >
                                  <FaArrowLeft className="text-xl" />
                                  <span>Detay Gör</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col my-16 gap-5 items-center ">
          <h2 className="font-semibold text-2xl">Burada hiç randevu yok :(</h2>
          <Link
            className="text-blue-600 text-xl bg-green-500 p-2 rounded-lg font-semibold "
            to={"/adminpanel"}
          >
            Anasayfaya dönmek için tıkla!
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminMeetings;
