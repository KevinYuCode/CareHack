import React from "react";
import Down_Arrow from "../assets/DownArrowLight.png";
import "../styles/response.css";
import { motion } from "framer-motion";

function Response({ prompt, data, scrollTo }) {
  return (
    <section
      id="Response"
      className="relative flex flex-col items-center justify-start min-h-screen mt-[8rem]"
    >
      <div className="max-w-[300px] md:max-w-[700px] lg:max-w-[1700px] min-h-[400px] min-w-[300px] lg:min-h-[500px] max-h-[600px] lg:min-w-[1300px] response-content rounded-[1rem] pt-[3rem] pb-[3rem] px:1 lg:px-[6rem] mt-[5rem] flex flex-col items-start justify-center">
        {prompt ? (
          <h1 className="w-[100%] text-center lg:text-left text-2xl lg:text-5xl mb-[1rem] lg:mb-[3rem] font-medium ">
            "{prompt}"
          </h1>
        ) : (
          <div></div>
        )}
        <div className="flex flex-col px-[1rem] lg:px-[0rem] w-[100%] max-w-[1200px] mt-[.5rem] max-h-[350px] overflow-scroll">
          {data?.map((suggestion, key) => (
            <motion.div key={key} className="flex lg:gap-4 mt-[1rem] lg:mt-[0rem]">
              <p className="text-[1rem] lg:text-2xl text-left leading-6 lg:leading-9 pr-[.6rem]">
                {key + 1}.
              </p>
              <p
                key={key}
                className="response-text text-[1rem] lg:text-2xl text-left leading-7 lg:leading-9"
              >
                {suggestion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className=" flex flex-col items-center response-discover-more absolute bottom-[2%] text-2xl font-thin">
        <button
          className=""
          onClick={() => {
            scrollTo("Recommendations");
          }}
        >
          Discover More
        </button>
        <motion.img
          animate={{ y: [0, 5, 0] }}
          transition={{
            delay: 0,
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          src={Down_Arrow}
          className="mt-[.5rem] w-[40px]"
          alt=""
        />
      </div>
    </section>
  );
}

export default Response;
