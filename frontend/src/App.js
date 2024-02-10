import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Response from "./pages/Response";
import Recommendations from "./pages/Recommendations";
import SearchIcon from "./components/SearchIcon";
import { animateScroll as scroll } from "react-scroll";

function App() {
  const [prompt, setPrompt] = useState(null);
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [lazySuggestions, setLazySuggestions] = useState(null);

  const scrollTo = (pageId) => {
    let page = document.getElementById(pageId);

    scroll.scrollTo(page.offsetTop);
  };

  const fetchData = (prompt) => {
    if (prompt === "") {
      alert("Please enter a non-empty prompt.");
      return;
    }
    setData(null);
    setSuggestions(null);

    // Gets the lazy loading message tip
    fetch("/loading", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          " ------------------- RECOMMENDED TOPICS -------------------"
        );
        console.log(data);
        setLazySuggestions(data.tip);
      });

    // Get Response for prompt
    fetch("/response", {
      method: "POST", // 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data);
        setData(data.response);
        setLazySuggestions(null);

        setTimeout(() => {
          scrollTo("Response"); //Scroll to the suggestion
        }, 200);
      });

    // Getting more suggestions
    fetch("/suggestions", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("SECOND CALL");

        console.log(data);
        console.log(data.suggestions);
        setSuggestions(data.suggestions);
      });
  };

  const recommendedPrompt = (title, description) => {
    setData(description);
    setPrompt(title);
  };
  return (
    <div className="App bg-[#F1F1F1] min-h-screen">
      <Home
        prompt={prompt}
        setPrompt={setPrompt}
        scrollTo={scrollTo}
        fetchData={fetchData}
        suggestions={suggestions}
        data={data}
        lazySuggestions={lazySuggestions}
      />
      {data && (
        <>
          <Response prompt={prompt} scrollTo={scrollTo} data={data} />
          <Recommendations
            suggestions={suggestions}
            scrollTo={scrollTo}
            data={data}
            recommendedPrompt={recommendedPrompt}
          />
        </>
      )}
      <SearchIcon scrollTo={scrollTo} />
    </div>
  );
}

export default App;
