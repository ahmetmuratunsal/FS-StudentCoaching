import { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { upload } from "../../utils/upload";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { lessonOptions } from "../../constants/selectInput";
import Select from "react-select";
import { MdClose } from "react-icons/md";

const AddQuestion = ({ isEditQuestion, close }) => {
  const [selectedQuestionCategory, setQuestionCategory] = useState();
  const navigate = useNavigate();

  const handleCategoryChange = (selectedQuestionCategory) => {
    setQuestionCategory(selectedQuestionCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.category = selectedQuestionCategory.value.toLowerCase();

    //* soru fotoğrafını bulut depolama alanına yükle
    const questionPhotoUrl = await upload(data.questionPhoto, "questions");

    //* soru fotoğrafının  url'ini nesneye kaydet
    data.questionPhoto = questionPhotoUrl;

    if (isEditQuestion) {
      //* apiye veriyi kaydet
      await api
        .patch(`/question/${isEditQuestion}`, data)
        .then((res) => {
          //* sorularım sayfasına yönlendir
          navigate(`/studentquestions`);
          //* bildirim ver
          toast.success("Sorunuz başarıyla güncellendi.");
          close();
          e.target.reset();
          setQuestionCategory(" ");
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Bir hata oluştu`);
        });
    } else {
      //* apiye veriyi kaydet
      await api
        .post("/question", data)
        .then((res) => {
          //* sorularım sayfasına yönlendir
          navigate(`/studentquestions`);
          //* bildirim ver
          toast.success("Sorunuz başarıyla oluşturuldu.");
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Bir hata oluştu`);
        });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  gap-5 w-full items-center"
    >
      <div className="flex justify-between items-center gap-5 w-full">
        <h2 className="font-semibold text-2xl mx-auto">
          {isEditQuestion ? "Soruyu güncelle!" : " Haydi Sorunu Sor"}
        </h2>
        {isEditQuestion && (
          <MdClose onClick={close} className="text-3xl cursor-pointer" />
        )}
      </div>
      {/* sorunun başlığı*/}
      <div className="w-full lg:w-1/2 h-12 relative flex rounded-xl">
        <input
          required
          className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
          id="questionTitle"
          type="text"
          name="questionTitle"
        />
        <label
          className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
          htmlFor="questionTitle"
        >
          Sorunun Başlığı
        </label>
      </div>

      {/* sorunun açıklaması*/}
      <div className="w-full lg:w-1/2 h-12 relative flex rounded-xl">
        <input
          required
          className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
          id="questionText"
          type="text"
          name="questionText"
        />
        <label
          className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
          htmlFor="questionText"
        >
          Sorunun Açıklaması
        </label>
      </div>

      {/* sorunun kategorisi*/}

      <div className="w-full lg:w-1/2  border border-blue-500 rounded-xl p-4">
        <h6 className="font-light mb-1">Dersi Giriniz</h6>
        <Select
          options={lessonOptions}
          value={selectedQuestionCategory}
          onChange={handleCategoryChange}
          placeholder="Lütfen Dersinizi Seçiniz"
          className="w-full"
        />
      </div>

      {/* sorunun resmi */}

      <div className="w-full lg:w-1/2 mt-5   h-20 relative flex rounded-xl border border-[#4070f4] p-8">
        <input
          required
          className="hidden peer"
          id="questionPhoto"
          type="file"
          name="questionPhoto"
        />
        <label
          className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
          htmlFor="questionPhoto"
        >
          Kapak Fotoğrafı
          <span className="text-3xl my-4">
            <TbPhoto className="text-yellow-600  mx-auto" />
          </span>
        </label>
        <label></label>
      </div>

      {/* gönder */}
      <div className="flex items-center  justify-center ">
        <button
          type="submit"
          className="bg-blue-500 px-5 py-3 mt-4 rounded-lg text-white font-semibold transition hover:bg-blue-600"
        >
          {isEditQuestion ? "Soruyu güncelle" : "Soru Ekle"}
        </button>
      </div>
    </form>
  );
};

export default AddQuestion;
