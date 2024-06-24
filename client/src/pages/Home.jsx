import HomeContent from "../components/Home/HomeContent";
import HomeMenu from "../components/Home/HomeMenu";
import HomePrivateLesson from "../components/Home/HomePrivateLesson";

const Home = () => {
  return (
    <div>
      <HomeMenu />
      <HomeContent />
      <HomePrivateLesson />
    </div>
  );
};

export default Home;
