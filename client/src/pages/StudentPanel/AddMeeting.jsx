import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacher } from "../../redux/userSlice/userActions";
import Spinner from "./../../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { changeCategoryName } from "../../utils/utils";

const AddMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllTeacher());
  }, [dispatch]);
  const { teachers, isTeacherLoading, isTeacherError } = useSelector(
    (store) => store.user
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    api
      .post("/meeting", data)
      .then(() => {
        toast.success("Randevu eklendi");
        e.target.reset();
        navigate("/studentmeetings");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bir hata meydana geldi.");
      });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Randevu Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Öğretmen:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            name="teacherId"
          >
            <option value="">Öğretmen seçin</option>
            {teachers?.data?.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName} -{" "}
                {changeCategoryName(teacher.lesson)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Tarih:</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            name="date"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Randevu Konusu:</label>
          <textarea
            name="notes"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {isTeacherLoading ? <Spinner /> : "Randevu Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddMeeting;
