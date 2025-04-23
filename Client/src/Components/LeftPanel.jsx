import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import ShareCircleBold from "../assets/ShareCircleBold";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

const LeftPanel = ({ isLightMode, setisLightMode, feedback, setFeedback }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const [Code, setCode] = useState("// Write your Code here");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    console.log(Code);
  }, [Code]);

  const sendCodeToAI = () => {
    // toast.success(`Code sent to AI. Wait for the response...`);
    setIsLoading(true); // Set loading to true when starting request
    const loadingToastId = toast.loading("Processing...");
    
    axios
      .post(`${apiUrl}/get-response`, { Code })
      .then((res) => {
        console.log("Message received Successfully :)");
        setFeedback(res.data.msg);
        toast.dismiss(loadingToastId); // Dismiss loading toast on success
      })
      .catch((e) => {
        console.log("Message not received :(");
        toast.dismiss(loadingToastId); // Dismiss loading toast on failure
        toast.error("Error receiving message.");
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  useEffect(() => {
    if (textareaRef.current && !editorRef.current) {
      const editor = CodeMirror.fromTextArea(textareaRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editor.getWrapperElement().style.backgroundColor = "white";
      editor.setSize("100%", "100%");
      editorRef.current = editor;

      const editorElement = editorRef.current.getWrapperElement();
      editorElement.style.borderRadius = "15px";
      editorElement.style.overflow = "hidden";

      editor.on("change", (instance) => {
        const updatedCode = instance.getValue();
        setCode(updatedCode);
      });
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full md:w-1/2 h-full relative flex flex-col gap-3 rounded-lg overflow-hidden">
      <div className="h-[70vh] md:h-5/6 w-full rounded-lg">
        <textarea
          defaultValue="//Write your Code here !"
          ref={textareaRef}
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="h-[30vh] md:h-1/6 w-full flex flex-col md:flex-row gap-4 items-center justify-between p-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <ShareCircleBold
            className={`${isLightMode ? "text-blue-500" : "text-green-400"}`}
          />
          <h1
            className={`text-xl md:text-2xl ${
              isLightMode ? "text-blue-700" : "text-green-300"
            } font-bold`}
          >
            Code Reviewer
          </h1>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center w-full md:w-auto">
          {isLightMode ? (
            <MdDarkMode
              onClick={() => setisLightMode((prev) => !prev)}
              className="text-lg text-blue-600 hover:scale-105 hover:rotate-45 transition-all transform cursor-pointer"
            />
          ) : (
            <MdLightMode
              onClick={() => setisLightMode((prev) => !prev)}
              className="text-lg text-green-500 hover:scale-95 hover:rotate-45 transition-all transform cursor-pointer"
            />
          )}
          <button
            className={`${
              isLightMode
                ? "bg-blue-500 hover:bg-blue-700 active:bg-blue-800"
                : "bg-green-500 hover:bg-green-700 active:bg-green-800"
            } rounded-lg text-white px-4 py-2 transition-all hover:cursor-pointer hover:scale-95 active:scale-90 text-sm md:text-base flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={sendCodeToAI}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              "Execute and Analysis with AI"
            )}
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
