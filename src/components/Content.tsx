import {
  Divider,
  Theme,
  Toaster,
  tokens,
  useId,
  webDarkTheme,
} from "@fluentui/react-components";
import ToolbarApp from "./Toolbar";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import defaultContent from "@/assets/default-content.json";
import { BlockEditor } from "./editor";
import { getTheme } from "@/App";

function Content() {
  const [editor, setEditor] = useState<Editor>();
  const toasterId = useId("toaster");

  const [theme, setTheme] = useState<Theme>(getTheme());
  useEffect(() => {
    window.ipcRenderer.on("nativeThemeChanged", () => setTheme(getTheme()));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        overflow: "scroll",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: theme == webDarkTheme ? tokens.colorNeutralBackground2Pressed : tokens.colorNeutralBackground1,
      }}
    >
      <div
        style={{
          // padding: "1rem",
          zIndex: 10,
          backgroundColor: theme == webDarkTheme ? tokens.colorNeutralBackground2Pressed : tokens.colorNeutralBackground1,
          position: "absolute",
          top: "0",
        }}
      >
        <div
          id="titlebar"
          style={{
            height: "3.5rem",
          }}
        ></div>
        <ToolbarApp editor={editor} />
        <Divider
          style={{
            marginTop: "0.4rem",
          }}
        ></Divider>
      </div>
      <div
        style={{
          marginTop: "6rem",
          zIndex: 0,
        }}
      >
        <div
          className="w-full pb-8 pt-4 px-3"
          style={{
            height: "calc(100vh - 7.1rem)",
          }}
        >
          <BlockEditor
            content={defaultContent}
            onCreate={setEditor}
            onUpdate={setEditor}
          ></BlockEditor>
        </div>
      </div>
      <Toaster toasterId={toasterId} />
    </div>
  );
}

export default Content;
