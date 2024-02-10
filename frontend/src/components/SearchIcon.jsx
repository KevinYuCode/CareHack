import React, { useState } from "react";
import microphone from "../assets/white_microphone.png";
import audio from "../assets/audio.png";
import "../styles/searchIcon.css";
function SearchIcon({ fetchData }) {
  const recognition = new window.webkitSpeechRecognition();
  const [listening, setListening] = useState(false);
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    fetchData(transcript);
  };

  const startTranscription = () => {
    recognition.start();
    setListening(true);
  };

  const stopTranscription = () => {
    recognition.stop();
    setListening(false);
  };

  return (
    <>
      {!listening ? (
        <button
          className="search-content flex justify-center items-center fixed bottom-[30px] right-[30px] p-[1rem] rounded-full bg-[#1d2132] hover:scale-[1.05] transition-all"
          onClick={() => {
            startTranscription();
          }}
        >
          <img
            className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] object-contain"
            src={microphone}
            alt="Magnify Glasss"
          />
        </button>
      ) : (
        <button
          className="search-content flex justify-center items-center fixed bottom-[30px] right-[30px] p-[1rem] rounded-full bg-[#1d2132] hover:scale-[1.05] transition-all"
          onClick={() => {
            stopTranscription();
          }}
        >
          <img
            className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] object-contain"
            alt="Magnify Glasss"
            src={audio}
          />
        </button>
      )}
    </>
  );
}

export default SearchIcon;
