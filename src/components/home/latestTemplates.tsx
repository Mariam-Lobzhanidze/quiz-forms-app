import { useEffect, useState } from "react";
import httpClient from "../../axios";
import { Template } from "../shared/types";
import "./home.scss";
import defaultImage from "../../assets/template_default_image.jpg";
import { formatDate } from "../../utils/formatDate";

const LatestTemplates: React.FC = () => {
  const [cards, setCards] = useState<Template[]>([]);

  const getAllTemplates = async () => {
    try {
      const response = await httpClient.get("/templates");
      const latestTemplates = getLatestTemplates(response.data.templates);
      setCards(latestTemplates);
      console.log(latestTemplates);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const getLatestTemplates = (templates: Template[]): Template[] => {
    return templates
      .sort((a: Template, b: Template) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8);
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <section>
      <p className="fs-2 text-center mb-5">Latest templates</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 ">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="card shadow-sm">
              <div className="fixed-height">
                <img
                  src={card.imageUrl ? card.imageUrl : defaultImage}
                  className="card-img-top img-fluid"
                  alt="Placeholder"></img>
              </div>

              <div className="card-body">
                <p className="card-text">{card.title}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-primary">
                      View
                    </button>
                  </div>
                  <small className="text-body-secondary">{formatDate(card.createdAt)}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestTemplates;
