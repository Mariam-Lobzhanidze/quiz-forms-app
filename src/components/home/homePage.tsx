import TemplateForm from "../template/templateForm";
import LatestTemplates from "./latestTemplates";
import TopTemplates from "./topTemplates";

const Home: React.FC = () => {
  return (
    <div className="px-5 container container-sm container-md container-lg d-flex flex-column gap-5">
      <LatestTemplates />
      <TopTemplates />
      <TemplateForm />
    </div>
  );
};

export default Home;
