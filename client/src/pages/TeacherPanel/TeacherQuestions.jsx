import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../redux/questionSlice/questionActions";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import "moment/locale/tr";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { Link } from "react-router-dom";
import { changeCategoryName } from "./../../utils/utils";

const TeacherQuestions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const { isLoading, isError, questions } = useSelector(
    (store) => store.question
  );

  const parametre = { category: user?.lesson };

  useEffect(() => {
    dispatch(getAllQuestion(parametre));
  }, [dispatch]);

  return (
    <div className="w-full">
      <h2 className="font-semibold text-xl"> Alanımda Sorular Sorular</h2>
      {questions?.data.length > 0 ? (
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
                            Sorularım
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Kategori
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            Çözülme Durumu
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Paylaşılma Tarihi
                          </th>
                          <th className="pb-3  text-center min-w-[100px]">
                            Çözülme Tarihi
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
                          questions?.data?.map((question) => (
                            <tr
                              key={question._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0 text-start">
                                <Link
                                  to={`/teacherquestion/${question._id}`}
                                  className="flex items-center"
                                >
                                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                    <img
                                      src={question.questionPhoto}
                                      className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                      alt={question.questionTitle}
                                    />
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    <a
                                      href="#"
                                      className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                    >
                                      {question.questionTitle}
                                    </a>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  {changeCategoryName(question.category)}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span
                                  className={` ${
                                    question.status === "Çözüldü"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  } font-semibold text-light-inverse text-md/normal`}
                                >
                                  {question.status}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  {moment(question.createdAt).format(
                                    "DD-MMMM-YYYY"
                                  )}
                                </span>
                              </td>
                              <td
                                className={`${
                                  question.status === "Çözüldü"
                                    ? "text-green-500"
                                    : "text-red-500"
                                } p-3 pr-0 text-center`}
                              >
                                {question.status === "Çözüldü" ? (
                                  <span className="font-semibold text-light-inverse text-md/normal">
                                    {moment(question.updatedAt).format(
                                      "DD-MMMM-YYYY"
                                    )}
                                  </span>
                                ) : (
                                  <span className="font-semibold text-light-inverse text-md/normal">
                                    Henüz Çözülmedi
                                  </span>
                                )}
                              </td>
                              <td className="p-3 pr-0 ">
                                <Link
                                  to={`/teacherquestion/${question._id}`}
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
          <h2 className="font-semibold text-2xl">Burada hiç soru yok :(</h2>
          <Link
            className="text-blue-600 text-xl bg-green-500 p-2 rounded-lg font-semibold "
            to={"/teacherpanel"}
          >
            Anasayfaya dönmek için tıkla!
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeacherQuestions;
