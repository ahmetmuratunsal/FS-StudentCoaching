import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneQuestion } from "../../redux/questionSlice/questionActions";
import { IoCloudUploadOutline } from "react-icons/io5";
import { lessonOptions } from "../../constants/selectInput";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { getCreateAnswer } from "./../../redux/answerSlice/answerActions";
import { upload } from "../../utils/upload";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const QuestionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, oneQuestion } = useSelector(
    (store) => store.question
  );
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    dispatch(getOneQuestion(id));
  }, [id]);

  const foundLesson = lessonOptions.find(
    (i) => i.value === oneQuestion?.data?.category
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.questionId = id;

    //* cevabın fotoğrafını bulut depolama alanına yükle
    const answerPhotoUrl = await upload(data.answerPhoto, "answer");

    //* kapat fotoğrafının  url'ini nesneye kaydet
    data.answerPhoto = answerPhotoUrl;

    await dispatch(getCreateAnswer(data))
      .then(() => {
        toast.success("Cevabınız başarıyla gönderildi.");
        e.target.reset();
      })
      .catch((err) => toast.error("Cevap gönderirken bir sorun oluştu.", err));
  };

  return (
    <div className="flex flex-col gap-5">
      <Link
        to={-1}
        className="flex items-center font-semibold text-xl text-blue-400 gap-5"
      >
        <FaArrowLeft className="text-2xl text-red-400" /> Geri Dön{" "}
      </Link>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  onClick={() => setIsFullscreen(false)}
                  className={`${
                    isFullscreen
                      ? "fixed inset-0 z-50 object-contain "
                      : "object-cover"
                  } w-full h-full `}
                  src={oneQuestion?.data?.questionPhoto}
                  alt={oneQuestion?.data?.questionTitle}
                />
              </div>
              <div className="flex justify-center  mb-2">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className=" px-2 py-1 rounded-lg font-semibold bg-green-500"
                >
                  Tam Ekranda Göster
                </button>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {oneQuestion?.data?.questionTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {oneQuestion?.data?.questionText}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Ders:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    {foundLesson?.label}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Çözülme Durumu:
                  </span>
                  <span
                    className={`${
                      oneQuestion?.data?.status === "Çözüldü"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold dark:text-gray-300 `}
                  >
                    {" "}
                    {oneQuestion?.data?.status}
                  </span>
                </div>
              </div>

              {oneQuestion?.data?.status === "Çözüldü" ? (
                <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 mt-20">
                  <span>Soru çözülmüştür</span>{" "}
                  <FaCheck className=" text-green-500" />
                </h2>
              ) : (
                <div className="flex items-center justify-center my-4">
                  {isOpenAnswer === false ? (
                    <div className="w-1/2 px-2">
                      <button
                        onClick={() => setIsOpenAnswer(true)}
                        className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        Ben çözerim !
                      </button>
                    </div>
                  ) : (
                    <div className="w-1/2 px-2">
                      <button
                        onClick={() => setIsOpenAnswer(false)}
                        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Sonra çözeceğim !
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* cevap gönderme formu */}
              {isOpenAnswer && (
                <form
                  onSubmit={handleSubmit}
                  className="max-w-sm mx-auto mt-10 "
                >
                  <div className="flex items-center justify-between">
                    <h2 className="my-3 font-semibold text-xl">Çözüm Alanı</h2>
                    <button
                      className="text-xl"
                      onClick={() => setIsOpenAnswer(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="importantpoint"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Dikkat edilmesi gereken yerler
                    </label>
                    <input
                      type="text"
                      id="importantpoint"
                      name="importantpoint"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Bu soru için şu konulara dikkat et"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="suggestion"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Çözüm Önerileri
                    </label>
                    <input
                      type="text"
                      id="suggestion"
                      name="suggestion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Sorunun cevabını açıklayabilirsiniz"
                      required
                    />
                  </div>

                  {/* Fotoğraf alanı */}
                  <div className="flex w-full max-w-xl text-center flex-col gap-1 mb-5">
                    <span className="w-fit pl-0.5 text-sm text-slate-700 dark:text-slate-300">
                      Cevabınızı Yükleyiniz
                    </span>
                    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 p-8 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      <div className="group">
                        <label
                          htmlFor="fileInputDragDrop"
                          className="cursor-pointer font-medium text-blue-700 group-focus-within:underline dark:text-blue-600 flex flex-col gap-3 items-center"
                        >
                          <IoCloudUploadOutline className="text-6xl text-gray-600" />
                          <input
                            id="fileInputDragDrop"
                            name="answerPhoto"
                            type="file"
                            className="sr-only"
                            aria-describedby="validFileFormats"
                            required
                          />
                          Tıklayıp seçebilir{" "}
                        </label>
                        ya da sürükleyip bırakabilirsiniz
                      </div>
                      <small id="validFileFormats">
                        PNG, JPG, WebP - Max 5MB
                      </small>
                      <small id="validFileFormats">
                        Yüklenme kısa bir süre alacaktır
                      </small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cevabı Gönder
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
