import React, { useState } from 'react';
import BusinessDataShow from "./components/BusinessDataShow"
import NavbarE from "./components/NavbarE"


const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
    <NavbarE onCategoryChange={handleCategoryChange}/>
    <BusinessDataShow category={selectedCategory}/>
    </>
  )
}

export default HomePage