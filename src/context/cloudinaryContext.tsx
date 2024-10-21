import { createContext, ReactNode, useContext } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

type CloudinaryContextType = Cloudinary | null;

const CloudinaryContext = createContext<CloudinaryContextType>(null);

export const CloudinaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
    },
  });

  return <CloudinaryContext.Provider value={cloudinary}>{children}</CloudinaryContext.Provider>;
};

export const useCloudinary = () => {
  return useContext(CloudinaryContext);
};
