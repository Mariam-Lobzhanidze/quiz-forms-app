import React, { useEffect, useState } from "react";
import "./template.scss";

interface TemplateImageUploadProps {
  imgSrc: string;
}

const TemplateImage: React.FC<TemplateImageUploadProps> = ({ imgSrc }) => {
  const defaultImage = "src/assets/template_default_image.jpg";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(defaultImage);

  useEffect(() => {
    if (imgSrc) {
      setIsLoading(true);
      setCurrentSrc(imgSrc);
    } else {
      setCurrentSrc(defaultImage);
    }
  }, [imgSrc]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="container p-0 mt-4 border border-1 rounded w-100 image-container position-relative">
      {isLoading && (
        <div className="spinner-border text-success position-absolute top-50 start-50" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <img
        src={currentSrc}
        alt="Uploaded Template"
        onLoad={handleImageLoad}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default TemplateImage;
