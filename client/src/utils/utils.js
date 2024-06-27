import { lessonOptions } from "./../constants/selectInput";

/* apiden gelen ders verisini türkçe karekterleri haline çeviriyoruz */
export const changeCategoryName = (category) => {
  const foundLesson = lessonOptions.find((i) => i.value === category);
  return foundLesson.label;
};
