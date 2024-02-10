import "../styles/home.css";
import { motion } from "framer-motion";
import ChatBox from "../components/ChatBox.jsx";
function Home({
  prompt,
  setPrompt,
  fetchData,
  lazySuggestions,
  chatLog,
  condition,
  setCondition,
}) {
  return (
    <section
      id="Home"
      className="home flex flex-col items-center justify-between py-[100px] min-h-screen"
    >
      <div className="flex flex-col  justify-center items-center">
        {/* <img className="w-[100px]" src={logo} alt="Logo" /> */}
        <h1 className="text-4xl lg:text-5xl self-center font-normal text-[#616161] text-center">
          CareHack
        </h1>
        <h2
          className="leading-[35px] font-normal w-[100%] 
          text-center text-lg lg:text-xl pb-[50px]"
        >
          Success in patient care begins with continuous learning and
          improvement.
        </h2>
      </div>

      <div className=" flex items-center flex-col h-[100%] ">
        <ChatBox />
        {/* Text Input */}
        <div className="home-actions flex flex-col items-center w-[1000px] mt-[3rem] relative">
          <motion.input
            type="text"
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            placeholder="Ask questions to learn more..."
            className=" text-center text-1xl lg:text-3xl w-[100%] max-w-[1300px] m-auto py-3 rounded-[15px]"
          />

          {/* Send */}
          <button
            initial={{ border: "2px solid #1d2132" }}
            className="absolute top-[50%] right-[10px] translate-y-[-50%] px-[20px] py-[10px] rounded-[12px] bg-[#111827] text-[white] hover:bg-[#111827]/90"
            onClick={() => {
              fetchData(prompt);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
