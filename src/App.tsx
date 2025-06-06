import { useEffect, useState } from "react";
import Content from "./components/Content";
import FolderContent from "./components/FolderContent";
import Sidebar from "./components/Sidebar";
import {
  makeStyles,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { FluentProvider } from "@fluentui/react-components";

const useStyle = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    position: "relative",
    boxSizing: "border-box",
  },
  content: {
    marginLeft: "29vw",
    width: "100%",
    overflow: "auto",
  },
});

const shouldUseDarkColors = (): boolean =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const getTheme = () =>
  shouldUseDarkColors() ? webDarkTheme : webLightTheme;

function App() {
  const [currentFolder, setCurrentFolder] = useState("1");

  const mystyle = useStyle();
  const [theme, setTheme] = useState<Theme>(getTheme());
  useEffect(() => {
    window.ipcRenderer.on("nativeThemeChanged", () => {
      setTheme(getTheme());

      document.documentElement.classList.toggle("dark");
    });
  }, []);

  return (
    <FluentProvider
      theme={theme}
      style={{ height: "100vh", overflow: "auto", background: "transparent" }}
    >
      <div className={mystyle.root}>
        <Sidebar changeFolder={setCurrentFolder}></Sidebar>
        <FolderContent currentFolder={currentFolder}></FolderContent>
        <div className={mystyle.content}>
          <Content />
        </div>
      </div>
    </FluentProvider>
  );
}

export default App;
