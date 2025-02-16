import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { Link } from "react-router-dom";
import {
  getAllStudent,
  getAllTeacher,
} from "../../redux/userSlice/userActions";
import ReactPaginate from "react-paginate";
import { changeCategoryName } from "./../../utils/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const Users = () => {
  const dispatch = useDispatch();

  const {
    isStudentLoading,
    isStudentError,
    isTeacherLoading,
    isTeacherError,
    students,
    teachers,
  } = useSelector((store) => store.user);
  const [studentParamPage, setStudentParamPage] = useState(1);
  const [teacherParamPage, setTeacherParamPage] = useState(1);
  const [teacherSearchName, setTeacherSearchName] = useState(null);
  const [studentSearchName, setStudentSearchName] = useState(null);

  const handleTeacherPageClick = (e) => {
    setTeacherParamPage(e.selected + 1);
  };
  const handleStudentPageClick = (e) => {
    setStudentParamPage(e.selected + 1);
  };

  const handleTeacherSearch = (e) => {
    e.preventDefault();
    if (e.target[0].value == "") {
      setTeacherSearchName(null);
    } else {
      setTeacherSearchName(e.target[0].value);
      e.target[0].value = "";
    }
  };

  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (e.target[0].value == "") {
      setStudentSearchName(null);
    } else {
      setStudentSearchName(e.target[0].value);
      e.target[0].value = "";
    }
  };

  const studentParam = {
    firstName: studentSearchName,
    page: studentParamPage,
    limit: 5,
  };
  const teacherParam = {
    firstName: teacherSearchName,
    page: teacherParamPage,
    limit: 5,
  };

  useEffect(() => {
    dispatch(getAllStudent(studentParam));
    dispatch(getAllTeacher(teacherParam));
  }, [
    teacherParamPage,
    studentParamPage,
    teacherSearchName,
    studentSearchName,
  ]);

  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className="font-semibold text-xl"> Bütün Öğretmenler</h2>
        <form onSubmit={handleTeacherSearch} className="p-5 flex items-center ">
          <input
            type="search"
            placeholder="İsme Göre Öğretmen Ara"
            className="border rounded-l-lg px-5 py-1 outline-none"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-green-500 py-1 px-4 border text-white font-semibold"
          >
            Ara
          </button>
        </form>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6 mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 pl-16 text-start min-w-[100px]">
                            İsim Soyisim
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Kullanıcı Adı
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Alan Bilgisi
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Kullanıcı Şehri
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Kayıt Tarihi
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Detaylar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isTeacherLoading ? (
                          <Loader />
                        ) : isTeacherError ? (
                          <Error isError={isTeacherError} />
                        ) : teachers?.data?.length > 0 ? (
                          teachers?.data?.map((user) => (
                            <tr
                              key={user._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0 text-start">
                                <Link
                                  to={`/userdetail/${user._id}`}
                                  className="flex items-center"
                                >
                                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                    <img
                                      src={user.profilePhoto}
                                      className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl me-3"
                                      alt={user.username}
                                    />
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    <a
                                      href="#"
                                      className="mb-1 font-semibold  capitalize "
                                    >
                                      {user.firstName} {user.lastName}
                                    </a>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold  capitalize">
                                  {user.username}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold  capitalize">
                                  {changeCategoryName(user.lesson)}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold  capitalize">
                                  {user.city}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold ">
                                  {format(user.createdAt, "dd-MMMM-yyyy", {
                                    locale: tr,
                                  })}
                                </span>
                              </td>

                              <td className="p-3 pr-0 ">
                                <Link
                                  to={`/userdetail/${user._id}`}
                                  className="font-semibold  flex justify-center items-center gap-2"
                                >
                                  <FaArrowLeft className="text-xl" />
                                  <span>Detay Gör</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="flex flex-col my-16 gap-5 items-center ">
                            <h2 className="font-semibold text-2xl">
                              Aradığınız isimde hiç öğretmen yok :(
                            </h2>
                            <button
                              className="text-blue-600 text-base bg-green-300 p-2 rounded-lg font-semibold "
                              onClick={() => setTeacherSearchName(null)}
                            >
                              Bütün Öğretmenleri görmek için tıklayın
                            </button>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="sonraki >"
                    className="pagination flex items-center gap-5 justify-center mt-10"
                    onPageChange={handleTeacherPageClick}
                    pageCount={Math.ceil(teachers?.totalDataLength / 5)}
                    previousLabel="< önceki"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bütün Öğrenciler */}
      <div className="w-full">
        <h2 className="font-semibold text-xl"> Bütün Öğrenciler</h2>
        <form onSubmit={handleStudentSearch} className="p-5 flex items-center">
          <input
            type="search"
            placeholder="İsme Göre Öğrenci Ara"
            className="border rounded-l-lg px-4 py-1 outline-none"
          />
          <button className="rounded-r-lg bg-green-500 py-1 px-4 border text-white font-semibold">
            Ara
          </button>
        </form>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6 mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 pl-16 text-start min-w-[100px]">
                            İsim Soyisim
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Kullanıcı Adı
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Kullanıcı Türü
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Kullanıcı Şehri
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Kayıt Tarihi
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Detaylar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isStudentLoading ? (
                          <Loader />
                        ) : isStudentError ? (
                          <Error isError={isStudentError} />
                        ) : students?.data?.length > 0 ? (
                          students?.data?.map((user) => (
                            <tr
                              key={user._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0 text-start">
                                <Link
                                  to={`/userdetail/${user._id}`}
                                  className="flex items-center"
                                >
                                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                    <img
                                      src={user.profilePhoto}
                                      className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl me-3"
                                      alt={user.username}
                                    />
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    <a
                                      href="#"
                                      className="mb-1 font-semibold  capitalize "
                                    >
                                      {user.firstName} {user.lastName}
                                    </a>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold  capitalize">
                                  {user.username}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span
                                  className={`${
                                    user.isPremium == false
                                      ? "text-red-500"
                                      : "text-green-500"
                                  } font-semibold  capitalize`}
                                >
                                  {user.isPremium
                                    ? "Premium Üye"
                                    : "Standart Üye"}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold  capitalize">
                                  {user.city}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold ">
                                  {format(user.createdAt, "dd-MMMM-yyyy", {
                                    locale: tr,
                                  })}
                                </span>
                              </td>

                              <td className="p-3 pr-0 ">
                                <Link
                                  to={`/userdetail/${user._id}`}
                                  className="font-semibold  flex justify-center items-center gap-2"
                                >
                                  <FaArrowLeft className="text-xl" />
                                  <span>Detay Gör</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="flex flex-col my-16 gap-5 items-center ">
                            <h2 className="font-semibold text-2xl">
                              Aradığınız isimde hiç öğrenci yok :(
                            </h2>
                            <button
                              className="text-blue-600 text-base bg-green-300 p-2 rounded-lg font-semibold "
                              onClick={() => setStudentSearchName(null)}
                            >
                              Bütün öğrencileri görmek için tıklayın
                            </button>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="sonraki >"
                    className="pagination flex items-center gap-5 justify-center mt-10"
                    onPageChange={handleStudentPageClick}
                    pageCount={Math.ceil(students?.totalDataLength / 5)}
                    previousLabel="< önceki"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
