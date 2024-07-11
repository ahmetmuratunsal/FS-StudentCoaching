import { toast } from "react-toastify";
import { lessonTypeOptions } from "../constants/addPrivateLessonSelect";
import { cityOptions, lessonOptions } from "./../constants/selectInput";
import api from "./api";

/* apiden gelen ders verisini türkçe karekterleri haline çeviriyoruz */
export const changeCategoryName = (category) => {
  const foundLesson = lessonOptions.find((i) => i.value === category);
  if (!foundLesson) {
    return category;
  }
  return foundLesson.label;
};

/* apiden gelen city verisini türkçe karekterleri haline çeviriyoruz */
export const changeCityName = (city) => {
  const foundCity = cityOptions.find((i) => i.value === city);
  if (!foundCity) {
    return city;
  }
  return foundCity.label;
};

export const changeLessonType = (type) => {
  const foundType = lessonTypeOptions.find((i) => i.value === type);
  if (!foundType) {
    return type;
  }
  return foundType.label;
};

export const logout = async () => {
  await api
    .post("/auth/logout")
    .then((res) => {
      localStorage.removeItem("user");
      toast.success(res.data.message);
    })
    .catch((err) =>
      toast.error(`Çıkış yapılırken bir sorun oluştu ${err.message}`)
    );
};
