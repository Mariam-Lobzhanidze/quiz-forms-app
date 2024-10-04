import Login from "../auth/login";
import Register from "../auth/register";
import LatestTemplates from "./latestTemplates";
import TopTemplates from "./topTemplates";

const Home: React.FC = () => {
  return (
    <div className="container container-sm container-md container-lg d-flex flex-column gap-5">
      <LatestTemplates />
      <TopTemplates />

      <Login />
      <Register />
    </div>
  );
};

export default Home;
