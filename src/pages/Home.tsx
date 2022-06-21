import { DarkThemeToggle, ToggleSwitch } from "flowbite-react";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const auth = useAuth();
  return (
    <div className="dark:bg-gray-800">
      <h1>User {auth.signed ? "is" : "isn't"} Signed</h1>
      <DarkThemeToggle />
    </div>
  );
};

export default Home;
