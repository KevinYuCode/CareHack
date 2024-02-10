import React from "react";

function ChatBox() {
  return (
    <div className="flex flex-col justify-start items-start w-[100%] max-w-[1200px]">
      {[
        "Patient is feeling pretty bad",
        "Your cock is very drake",
        "What do you mean Donggggggg",
        "Sample test you should you probably take some viagara",
      ].map((message, key) => (
        <div
          className={`rounded-[10px] py-[10px] px-[30px] flex justify-center items-center w-[auto] h-[auto]  ${
            key % 2 === 0
              ? "bg-[#111827] text-[white] self-end"
              : "bg-[#f1f1f1] self-start shadow-[rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px] border-[1px]"
          }`}
        >
          <p>{message}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
