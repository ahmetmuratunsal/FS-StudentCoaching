import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  getAllQuestion,
} from "../../redux/questionSlice/questionActions";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { changeCategoryName } from "./../../utils/utils";
import AddQuestion from "./AddQuestion";
import Answer from "../Answer";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const StudentQuestions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const { isLoading, isError, questions } = useSelector(
    (store) => store.question
  );

  useEffect(() => {
    dispatch(getAllQuestion({ student: user._id }));
  }, [dispatch, isEditQuestion]);

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id))
      .then((res) => {
        if (res.type === "question/deleteQuestion/fulfilled") {
          toast.success("Sorunuz başarıyla silinmiştir");
        } else {
          toast.error("Soruyu silerken bir hata meydana geldi");
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <h2 className="font-semibold text-xl"> Sorduğum Sorular</h2>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  {/* tablo alanı */}
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      {/* Tablo başlıkları */}
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
                          Cevap
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Tablo içeriği */}
                      {isLoading ? (
                        <Loader />
                      ) : isError ? (
                        <Error isError={isError} />
                      ) : questions?.data?.length > 0 ? (
                        questions?.data?.map((question) => (
                          <tr
                            key={question._id}
                            className="border-b border-dashed last:border-b-0"
                          >
                            <td className="p-3 pl-0 text-start">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={question.questionPhoto}
                                    onClick={() => setIsShowQuestion(false)}
                                    className={`${
                                      isShowQuestion
                                        ? "fixed inset-0 w-full h-full z-50 object-contain"
                                        : "w-[50px] h-[50px] inline-block shrink-0 rounded-2xl object-cover "
                                    } `}
                                    alt={question.questionTitle}
                                  />
                                </div>
                                <div>
                                  {!isShowQuestion && (
                                    <a
                                      className="mx-2 bg-red-300 p-1 rounded-md"
                                      href={question.questionPhoto}
                                    >
                                      Soruyu Gör
                                    </a>
                                  )}
                                </div>
                                <div className="flex flex-col justify-start">
                                  <a
                                    href="#"
                                    className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    {question.questionTitle}
                                  </a>
                                </div>
                              </div>
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
                                {format(question.createdAt, "dd MMMM yyyy", {
                                  locale: tr,
                                })}
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
                                  {format(question.updatedAt, "dd MMMM yyyy", {
                                    locale: tr,
                                  })}
                                </span>
                              ) : (
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  Henüz Çözülmedi
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {question.status === "Çözüldü" ? (
                                <button
                                  onClick={() => setIsOpenAnswer(question._id)}
                                  className="font-semibold flex items-center justify-center mx-auto gap-2"
                                >
                                  <FaArrowLeft className="text-xl" />{" "}
                                  <span>Cevabı Gör</span>
                                </button>
                              ) : (
                                <div className="flex flex-col gap-3 items-center justify-center my-auto">
                                  <button
                                    onClick={() =>
                                      setIsEditQuestion(question._id)
                                    }
                                    className="font-semibold flex items-center justify-center mx-auto gap-2 text-yellow-500"
                                  >
                                    <MdEditNote className="text-xl" />{" "}
                                    <span>Düzenle</span>
                                  </button>

                                  <button
                                    onClick={() => handleDelete(question._id)}
                                    className="font-semibold flex items-center justify-center mx-auto gap-2 text-red-500"
                                  >
                                    <MdDeleteForever className="text-xl" />{" "}
                                    <span>Sil</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className="flex flex-col my-16 gap-5 items-center ">
                          <h2 className="font-semibold text-2xl">
                            Burada hiç soru yok :(
                          </h2>
                          <Link
                            className="text-blue-600 text-xl bg-green-500 p-2 rounded-lg font-semibold "
                            to={"/add-question"}
                          >
                            Soru Sormak için tıkla!
                          </Link>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* düzenleme alanı */}
      <div
        className={`${
          isEditQuestion ? "grid" : "hidden"
        }  fixed w-full bg-[#000000ad] inset-0  place-items-center `}
      >
        <div className="bg-white w-1/2 p-10 rounded-lg">
          <AddQuestion
            isEditQuestion={isEditQuestion}
            close={() => setIsEditQuestion(false)}
          />
        </div>
      </div>

      {/* cevabı gör alanı */}
      <div
        className={`${
          isOpenAnswer ? "grid" : "hidden"
        }  fixed w-full bg-[#000000ad] inset-0  place-items-center `}
      >
        <div className="bg-white w-1/2 p-10 rounded-lg">
          <Answer
            isOpenAnswer={isOpenAnswer}
            close={() => setIsOpenAnswer(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentQuestions;
