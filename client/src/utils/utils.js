import { cityOptions, lessonOptions } from "./../constants/selectInput";

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
