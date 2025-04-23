import { useState } from "react";
import "./App.css";
import LeftPanel from "./Components/LeftPanel";
import RightPanel from "./Components/RightPanel";

function App() {
  const [isLightMode, setisLightMode] = useState(true);
  const [feedback, setFeedback] = useState("No Review Yet !");

  return (
    <>
      <div
        className={`${
          isLightMode ? "bg-white" : "bg-black"
        } flex flex-col md:flex-row gap-3 p-3 md:p-6 h-auto md:h-screen`}
      >
        <LeftPanel
          isLightMode={isLightMode}
          setisLightMode={setisLightMode}
          feedback={feedback}
          setFeedback={setFeedback}
        />
        <RightPanel
          isLightMode={isLightMode}
          setisLightMode={setisLightMode}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      </div>
    </>
  );
}

export default App;