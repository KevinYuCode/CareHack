import React from "react";
import { motion } from "framer-motion";
import "../styles/recommended.css";
function Recommendations({ suggestions, data, scrollTo, recommendedPrompt }) {
  return (
    <section
      id="Recommendations"
      className="flex flex-col justify-start items-center min-h-screen"
    >
      <h1 className="text-3xl lg:text-5xl mb-[5rem] mt-[6rem]">Recommendations:</h1>
      <div className="recommendations-content flex flex-wrap justify-center items-center content-center gap-[2rem] pb-[5rem] lg:pb-[0rem] ">
        {suggestions ? (
          suggestions?.map((suggestion, key) => (
            <motion.button
              whileHover={{
                scale: 0.97,
                border: "2px solid #1d2132",
              }}
              key={key}
              className="recommended-topics rounded-[.8rem] min-h-[200px] max-w-[700px] w-[300px] lg:w-[500px]"
              onClick={() => {
                scrollTo("Response");
                recommendedPrompt(suggestion.title, suggestion.description);
              }}
            >
              <h1 className="text-black p-[2rem] text-2xl lg:text-4xl">
                {suggestion.title}
              </h1>
            </motion.button>
          ))
        ) : (
          <motion.div className="dot-container flex gap-[1rem]">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
              className="dot w-[20px] h-[20px] bg-[black] rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.1 }}
              className="dot w-[20px] h-[20px] bg-[black] rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="dot w-[20px] h-[20px] bg-[black] rounded-full"
            ></motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Recommendations;
