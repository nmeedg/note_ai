import { useState } from "react";
import Content from "./components/Content";
import FolderContent from "./components/FolderContent";
import Sidebar from "./components/sidebar";

function App() {
  const [currentFolder, setCurrentFolder]=useState("1")
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      <Sidebar changeFolder={setCurrentFolder} ></Sidebar>
      <FolderContent currentFolder={currentFolder}></FolderContent>
      <Content />
    </div>
  );
}

export default App;
