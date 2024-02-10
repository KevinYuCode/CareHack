import React, { useState } from "react";
import MagnifyGlass from "../assets/MagnifyGlass.png";
import MagnifyGlassBlack from "../assets/MagnifyGlassBlack.png";
import { motion } from "framer-motion";

import "../styles/searchIcon.css";
function SearchIcon({ scrollTo }) {
  let [hovered, setHovered] = useState(true);
  return (
    <motion.button
      whileHover={{ scale: 0.97, backgroundColor: "#ffffff" }}
      transition={{ duration: 0.5 }}
      initial={{ backgroundColor: "#1d2132" }}
      onClick={() => {
        scrollTo("Home");
      }}
      onMouseEnter={() => {
        setHovered(false);
      }}
      onMouseLeave={() => {
        setHovered(true);
      }}
      className="search-content flex justify-center items-center fixed bottom-[30px] right-[30px] p-[1rem] rounded-full"
    >
      {hovered ? (
        <motion.img className="w-[20px] lg:w-[30px]" src={MagnifyGlass} alt="Magnify Glasss" />
      ) : (
        <motion.img className="w-[20px] lg:w-[30px]" src={MagnifyGlassBlack} alt="Magnify Glasss" />
      )}
    </motion.button>
  );
}

export default SearchIcon;
