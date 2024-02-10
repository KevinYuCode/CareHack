import React from "react";

function ChatBox({ chatLog, scrollTo }) {
  return (
    <div
      id="chatbox"
      className="flex flex-col justify-start items-start w-[100%] max-w-[1400px] max-h-[600px] overflow-scroll px-[10px] py-[10px] gap-[15px]"
    >
      {chatLog.length > 0 &&
        chatLog.map((message, key) => (
          <div
            key={key}
            className={`rounded-[10px] py-[10px] px-[30px] flex justify-center items-center w-[auto] h-[auto] shadow-chat  ${
              key % 2 === 0
                ? "bg-[#111827] text-[white] self-end"
                : "bg-[#f1f1f1] self-start  border-[1px]"
            }`}
          >
            <p>{message}</p>
          </div>
        ))}
    </div>
  );
}

export default ChatBox;
