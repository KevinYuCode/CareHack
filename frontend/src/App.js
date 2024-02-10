import React, { useEffect, useState } from "react";
import "./App.css";
import "./global.css";
import Home from "./pages/Home";
import { animateScroll as scroll } from "react-scroll";

function App() {
  const [prompt, setPrompt] = useState(null);
  const [lazySuggestions, setLazySuggestions] = useState(null);
  const [condition, setCondition] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [chatLog, setChatLog] = useState([]);

  const scrollTo = (pageId) => {
    let page = document.getElementById(pageId);

    scroll.scrollTo(page.offsetTop);
  };

  // used to send prompt and get responses
  const fetchData = (prompt) => {
    if (prompt === "") {
      alert("Please enter a non-empty prompt.");
      return;
    }

    // Gets the lazy loading message tip
    fetch("/loading", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLazySuggestions(data.tip);
      });

    // Get Response for prompt
    setChatLog(...chatLog, prompt);

    fetch("/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { prompt: prompt, symptoms: chatLog[0] },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChatLog(...chatLog, data.response);
        setLazySuggestions(null);
      });
  };
  
  useEffect(() => {
    // when clicking "ready" button
    const fetchInit = () => {
      fetch("/init", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setChatLog(...chatLog, data.symptoms);
          setCondition(data.disease);
        });
    };
    // Get the initial prompt from openAI/(patient)
    fetchInit();
  }, []);

  // const recommendedPrompt = (title, description) => {
  //   setData(description);
  //   setPrompt(title);
  // };
  return (
    <div className="App bg-[#F1F1F1] min-h-screen">
      <Home
        prompt={prompt}
        setPrompt={setPrompt}
        scrollTo={scrollTo}
        fetchData={fetchData}
        lazySuggestions={lazySuggestions}
        setQuestionCount={setQuestionCount}
        questionCount={questionCount}
        condition={condition}
        setCondition={setCondition}
        setChatLog={setChatLog}
        chatLog={chatLog}
      />
      {/* {data && ( */}
        {/* <> */}
          {/* <Response prompt={prompt} scrollTo={scrollTo} data={data} /> */}
          {/* <Recommendations
            suggestions={suggestions}
            scrollTo={scrollTo}
            data={data}
            // recommendedPrompt={recommendedPrompt}
          /> */}
        {/* </> */}
      {/* )} */}
    </div>
  );
}

export default App;
