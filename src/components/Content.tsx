import {
  Divider,
  Link,
  Text,
  Theme,
  Toast,
  Toaster,
  ToastTitle,
  ToastTrigger,
  tokens,
  useId,
  useToastController,
  webDarkTheme,
} from "@fluentui/react-components";
import ToolbarApp from "./Toolbar";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import defaultContent from "@/assets/default-content.json";
import { BlockEditor } from "./editor";
import { getTheme } from "@/App";
import { useEditor } from "@tiptap/react";
import { defaultExtensions } from "./editor/default-extensions";
import { cn } from "@/lib/utils";
import { Ai } from "./editor/extensions/ai";
import { getSuggestion, SlashCommand } from "./editor/extensions/slash-command";
import Placeholder from "@tiptap/extension-placeholder";
import { AnimatePresence, motion } from "motion/react";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

function Content() {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const [key, setKey] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const [theme, setTheme] = useState<Theme>(getTheme());
  const editor: Editor = useEditor({
    extensions: [
      ...defaultExtensions,
      TaskList,
      TaskItem,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Placeholder.configure({
        placeholder: "Type  /  for commands...",
        emptyEditorClass: cn("is-editor-empty text-gray-300"),
        emptyNodeClass: cn("is-empty text-gray-300"),
      }),
      Ai.configure({
        onError: (error) => {
          console.error(error);
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                {error.message}
              </ToastTitle>
            </Toast>,
            { intent: "error" }
          );
        },
      }),
      SlashCommand.configure({
        suggestion: getSuggestion({ ai: true }),
      }),
    ],
    content: defaultContent,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onUpdate: () => {
      setKey((prev) => prev + 1);
    },
    autofocus: "start",
  });

  useEffect(() => {
    window.ipcRenderer.on("nativeThemeChanged", () => setTheme(getTheme()));
    if (!editor) return;

    const handleSelectionUpdate = ({ editor }: { editor: Editor }) => {
      const { from, to } = editor.state.selection;
      // Si from === to → position du curseur
      if (from === to) {
        setKey((prev) => prev + 1);
      }
    };

    editor.on("focus", () => {
      setIsFocus(true);
      console.log(editor?.getAttributes("textStyle").color);
    });
    editor.on("blur", () => {
      // setIsFocus(false);
    });
    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor]);
  const sequence = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        overflow: "scroll",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor:
          theme == webDarkTheme
            ? tokens.colorNeutralBackground3
            : tokens.colorNeutralBackground1,
      }}
    >
      <div
        style={{
          // padding: "1rem",
          zIndex: 10,
          backgroundColor:
            theme == webDarkTheme
              ? tokens.colorNeutralBackground3
              : tokens.colorNeutralBackground1,
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
        <AnimatePresence>
          {isFocus ? (
            <motion.span
              variants={sequence}
              initial="hidden"
              exit="exit"
              transition={{ duration: 0.3 }}
              animate="visible"
            >
              <ToolbarApp key={key} editor={editor} />
            </motion.span>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: -100 }}
              transition={{ duration: 0.4 }}
              style={{
                paddingLeft: "2vw",
                paddingBottom: "1vw",
              }}
            >
              <Text
                style={{
                  color: tokens.colorNeutralForeground4,
                }}
              >
                15.06.2025
              </Text>
            </motion.div>
          )}
        </AnimatePresence>

        <Divider
          style={{
            width: "71vw",
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
          <BlockEditor editor={editor}></BlockEditor>
        </div>
      </div>
      <Toaster toasterId={toasterId} />
    </div>
  );
}

export default Content;
