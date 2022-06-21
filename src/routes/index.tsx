import { Flowbite } from "flowbite-react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes: React.FC = () => {
  const { signed } = useAuth();
  return (
    <BrowserRouter>
      <Flowbite theme={{ dark: false }}>
        <div className="flowbite-app w-full h-full">
          {signed ? <AppRoutes /> : <AuthRoutes />}
        </div>
      </Flowbite>
    </BrowserRouter>
  );
};

export default Routes;
