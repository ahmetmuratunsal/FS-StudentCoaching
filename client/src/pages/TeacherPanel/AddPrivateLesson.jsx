import { useState } from "react";

import CreatableSelect from "react-select/creatable";
import {
  categoryOptions,
  featureOptions,
  lessonTypeOptions,
} from "../../constants/addPrivateLessonSelect";
import { TbPhoto } from "react-icons/tb";
import { upload } from "../../utils/upload";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPrivateLesson = () => {
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState();

  const handleCategoryChange = (selectedCategoryOptions) => {
    setSelectedCategoryOptions(selectedCategoryOptions);
  };

  const [selectedLessonTypeOptions, setLessonTypeOptions] = useState();

  const handleLessonTypeChange = (selectedLessonTypeOptions) => {
    setLessonTypeOptions(selectedLessonTypeOptions);
  };

  const [selectedFeatureOptions, setSelectedFeatureOptions] = useState([]);

  const handleFeatureChange = (selectedFeatureOptions) => {
    setSelectedFeatureOptions(selectedFeatureOptions);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* bütün inputlardaki verilere eriş
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    data.images = e.target.images.files;

    //* kapak fotoğrafını bulut depolama alanına yükle
    const coverUrl = await upload(data.coverImg, "coverImg");

    //* kapat fotoğrafının  url'ini nesneye kaydet
    data.coverImg = coverUrl;

    //* detay fotoğraflarını bulut depolama alanına yükle
    const imageUrls = await Promise.all(
      [...data.images].map(async (file) => {
        return await upload(file, "images");
      })
    );

    //* detay fotoğraflarının  url'ini nesneye kaydet
    data.images = imageUrls;

    //* özellikler kategoriler ve ders yeri bilgisini nesneye kaydet
    data.category = selectedCategoryOptions.value;

    data.features = selectedFeatureOptions.map((item) => item.label);

    data.lessonType = selectedLessonTypeOptions.value;

    delete data.bio;

    //* apiye veriyi kaydet
    await api
      .post("/privatelesson", data)
      .then((res) => {
        //* özel dersler sayfasına yönlendir
        navigate(`/privateLesson/${res.data.privateLesson._id}`);
        //* bildirim ver
        toast.success("Özel ders başarıyla oluşturuldu.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Bir hata oluştu`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
        <h1 className="font-semibold my-5 text-2xl mx-auto lg:mx-72">
          Özel Ders Ekle
        </h1>

        {/* Başlık ve açıklama */}
        <div className="flex flex-col gap-4 ml-4 lg:ml-64">
          {/* başlık */}
          <div className="w-full lg:w-1/2 h-12 relative flex rounded-xl">
            <input
              required
              className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
              id="title"
              type="text"
              name="title"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
              htmlFor="title"
            >
              Başlık
            </label>
          </div>
          {/* açıklama */}
          <div className=" w-full lg:w-1/2 h-12 relative flex rounded-xl">
            <input
              required
              className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
              id="desc"
              type="text"
              name="desc"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
              htmlFor="desc"
            >
              Açıklama
            </label>
          </div>

          {/* Öğretmen Biografisi */}
          <div className=" w-full lg:w-1/2  h-12 relative flex rounded-xl">
            <input
              required
              className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
              id="bio"
              type="text"
              name="bio"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
              htmlFor="bio"
            >
              Öğretmen Biografisi
            </label>
          </div>
        </div>

        {/* images ve kısa açıklamalar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5 ml-1 lg:ml-20 p-3 ">
          {/* images kısmı */}
          <div className="flex flex-col gap-10 my-auto ">
            <div className="w-full lg:w-1/2   h-12 relative flex rounded-xl border border-[#4070f4] p-8">
              <input
                required
                className="hidden peer"
                id="coverImg"
                type="file"
                name="coverImg"
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="coverImg"
              >
                Kapak Fotoğrafı
                <span className="text-2xl my-4">
                  <TbPhoto className="text-yellow-600  mx-auto" />
                </span>
              </label>
            </div>

            {/* detail images */}

            <div className="w-full lg:w-1/2   h-12 relative flex rounded-xl border border-[#4070f4] p-8 ">
              <input
                required
                className="hidden peer"
                id="images"
                type="file"
                name="images"
                multiple
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="images"
              >
                Detay Fotoğrafları
                <span className="text-2xl my-4">
                  <TbPhoto className="text-red-600  mx-auto" />
                </span>
              </label>
            </div>
          </div>

          {/* kısa açıklamalar kısmı */}
          <div className="flex flex-col gap-5">
            {/* Kısa başlık */}
            <div className="w-full lg:w-1/2  h-12 relative flex rounded-xl">
              <input
                required
                className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="shortTitle"
                type="text"
                name="shortTitle"
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="shortTitle"
              >
                Kısa Başlık
              </label>
            </div>
            {/* Kısa açıklama */}
            <div className="w-full lg:w-1/2  h-12 relative flex rounded-xl">
              <input
                required
                className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="shortDesc"
                type="text"
                name="shortDesc"
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="shortDesc"
              >
                Kısa Açıklama
              </label>
            </div>
            {/* Ders Süresi */}
            <div className="w-full lg:w-1/2  h-12 relative flex rounded-xl">
              <input
                required
                className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="duration"
                type="number"
                name="duration"
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="duration"
              >
                Ders Süresi
              </label>
            </div>
            {/* Fiyat */}
            <div className="w-full lg:w-1/2  h-12 relative flex rounded-xl">
              <input
                required
                className="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="price"
                type="number"
                name="price"
              />
              <label
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="price"
              >
                Fiyat Bilgisi
              </label>
            </div>
          </div>
        </div>

        {/* react selectler kategori - ders yeri - özellikler */}
        <div className="flex flex-col lg:flex-row ml-4  gap-3">
          {/* Kategori alanı */}
          <div className="w-full lg:w-1/2  border border-blue-500 rounded-xl p-4">
            <h6 className="font-light mb-1">Kategori Giriniz</h6>
            <CreatableSelect
              options={categoryOptions}
              value={selectedCategoryOptions}
              onChange={handleCategoryChange}
              placeholder="Kendiniz kategori yazabilirsiniz"
              className="w-full"
            />
          </div>

          {/* Ders Yeri alanı */}
          <div className="w-full lg:w-1/2 border border-blue-500 rounded-xl p-4">
            <h6 className="font-light mb-1">Ders yerini giriniz.</h6>
            <CreatableSelect
              options={lessonTypeOptions}
              value={selectedLessonTypeOptions}
              onChange={handleLessonTypeChange}
              placeholder="Dersi nasıl yapacaksınız?"
              className="w-full"
            />
          </div>

          {/*! Özellikler alanı */}
          <div className="w-full lg:w-1/2 border border-blue-500 rounded-xl  p-4">
            <h6 className="font-light mb-1">Özellik Giriniz</h6>
            <CreatableSelect
              options={featureOptions}
              isMulti
              value={selectedFeatureOptions}
              onChange={handleFeatureChange}
              placeholder="Kendiniz özellik yazabilirsiniz"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-center  justify-center ">
          <button
            type="submit"
            className="bg-blue-500 px-5 py-3 mt-4 rounded-lg text-white font-semibold transition hover:bg-blue-600"
          >
            Özel Dersi Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrivateLesson;
