import axios from "axios";
import { toast } from "react-toastify";

export const upload = async (file, collection) => {
  // resim olduğunu kontrol et resim değilse hata ver
  if (!file.type.startsWith("image")) return null;

  // resmi bir form daha içerisine ekle

  const data = new FormData();

  data.append("file", file);
  // yüklenme ayarlarını belirle

  data.append("upload_preset", collection);

  try {
    // api isteği atıp resmi buluta yükle
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlcwbxs5c/image/upload",
      data,
      { withCredentials: false }
    );

    // resmin urlini fonksiyonun çağrıldığı yere döndür

    return res.data.url;
  } catch (error) {
    toast.error(`Fotoğraf yüklenirken bir hata oluştu. ${error.message}`);
  }
};
