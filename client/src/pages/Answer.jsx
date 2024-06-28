import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnswer } from "../redux/answerSlice/answerActions";
import { changeCategoryName } from "../utils/utils";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Answer = ({ close, isOpenAnswer }) => {
  const { answer, isLoading, isError } = useSelector((store) => store.answer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenAnswer) dispatch(getAllAnswer({ question: isOpenAnswer }));
  }, [isOpenAnswer]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center gap-5 w-full">
        <h2 className="font-bold text-2xl mx-auto">Sorunun Cevabı</h2>

        <MdClose onClick={close} className="text-3xl cursor-pointer" />
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        answer?.data && (
          <div className="flex flex-col md:flex-row -mx-4 my-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  onClick={() => setIsFullscreen(false)}
                  className={`${
                    isFullscreen
                      ? "fixed inset-0 z-50 object-contain "
                      : "object-cover"
                  } w-full h-full `}
                  src={answer?.data[0]?.answerPhoto}
                  alt={answer?.data[0]?.importantpoint}
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
              <h2 className="  dark:text-white mb-2 flex flex-col gap-2">
                <span className="text-base font-bold text-red-500">
                  Dikkat edilmesi gereken yerler:{" "}
                </span>
                <span className="capitalize indent-5 text-gray-800">
                  {answer?.data[0]?.importantpoint}
                </span>
              </h2>
              <p className=" dark:text-gray-300  mb-4 flex flex-col gap-2 my-4">
                <span className="text-base font-bold text-red-500">
                  Çözüm Önerileri:{" "}
                </span>
                <span className="indent-5 text-gray-800">
                  {" "}
                  {answer?.data[0]?.suggestion}
                </span>
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Ders:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    {changeCategoryName(answer?.data[0]?.question?.category)}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Çözülme Durumu:
                  </span>
                  <span
                    className={`${
                      answer?.data[0]?.question?.status === "Çözüldü"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold dark:text-gray-300 `}
                  >
                    {" "}
                    {answer?.data[0]?.question?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Answer;
