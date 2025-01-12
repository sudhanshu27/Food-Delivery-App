import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/appDownload/AppDownload.jsx";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home">
      <Header />
      <div className="home-in">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
