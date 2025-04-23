import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const RightPanel = ({ isLightMode, setisLightMode, feedback, setFeedback }) => {
  const scrollRef = useRef();

  const cleanedFeedback = feedback
    ?.replace(/\\n/g, "\n")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(
      /(❌ Bad Code:|🔍 Issues:|✅ Recommended Fix:|💡 Improvements:|Further Considerations:)/g,
      "### $1"
    );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [cleanedFeedback]);

  return (
    <div
      ref={scrollRef}
      className={`${
        isLightMode
          ? "bg-white text-gray-800 border-2 border-blue-300"
          : "bg-zinc-900 text-green-200 border-2 border-green-400"
      } w-full md:w-1/2 h-[70vh] md:h-full rounded-lg overflow-y-auto scrollbar-none p-4 md:p-6 shadow-lg transition-all duration-300`}
    >
      <div className="prose dark:prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-xl prose-code:text-pink-500">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="mt-6 mb-2 text-2xl font-bold" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="mt-6 mb-2 text-xl font-semibold" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mt-6 mb-2 text-lg font-semibold" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-3" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="mb-4 list-disc list-inside" {...props} />
            ),
            code: ({ node, ...props }) => (
              <code className="bg-gray-800 text-white px-2 py-1 rounded-md" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4" {...props} />
            ),
          }}
        >
          {cleanedFeedback}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default RightPanel;
