import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { LinkSelector } from "./link-selector";
import { Button } from "@/components/ui/button";
import {
  Toolbar,
  ToolbarProps,
  ToolbarToggleButton,
} from "@fluentui/react-components";
import { useState } from "react";
import {
  Code20Regular,
  TextBold20Regular,
  TextItalic20Regular,
  TextStrikethrough20Regular,
  TextUnderline20Regular,
} from "@fluentui/react-icons";

interface SelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
  isMath: boolean;
}

const items = [
  {
    icon: TextBold20Regular,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleBold().run();
    },
    isActive: (state: SelectorResult) => state.isBold,
  },
  {
    icon: TextItalic20Regular,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleItalic().run();
    },
    isActive: (state: SelectorResult) => state.isItalic,
  },
  {
    icon: TextUnderline20Regular,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleUnderline().run();
    },
    isActive: (state: SelectorResult) => state.isUnderline,
  },
  {
    icon: TextStrikethrough20Regular,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleStrike().run();
    },
    isActive: (state: SelectorResult) => state.isStrike,
  },
  {
    icon: Code20Regular,
    onClick: (editor: Editor) => {
      editor.chain().focus().toggleCode().run();
    },
    isActive: (state: SelectorResult) => state.isCode,
  },
];

export const TextButtons = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState<SelectorResult>({
    editor,
    selector: (instance) => ({
      isBold: instance.editor.isActive("bold"),
      isItalic: instance.editor.isActive("italic"),
      isUnderline: instance.editor.isActive("underline"),
      isStrike: instance.editor.isActive("strike"),
      isCode: instance.editor.isActive("code"),
      isMath: instance.editor.isActive("math"),
    }),
  });
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    textOptions: ["bold", "italic"],
  });
  const onChange: ToolbarProps["onCheckedValueChange"] = (
    e,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar
      aria-label="with controlled Toggle Button"
      checkedValues={checkedValues}
      style={{
        maxWidth: "90vw",
        borderRadius: "0.3rem",
        padding: 0,
      }}
      onCheckedValueChange={onChange}
    >
      {items.map((item, i) => {
        return (
          <Button
            key={"bubble-button-" + i}
            variant="ghost"
            size="icon"
            disabled={editorState.isMath}
            className="rounded-none flex-shrink-0"
          >
            <ToolbarToggleButton
              aria-label="Bold"
              key={i}
              icon={
                <item.icon
                  style={{
                    color: item.isActive(editorState) ? "var(--primary)" : "",
                  }}
                />
              }
              name="textOptions"
              appearance="subtle"
              value={i.toString()}
              onClick={() => {
                item.onClick(editor);
              }}
            />
          </Button>
        );
      })}
      <LinkSelector editor={editor} />
    </Toolbar>
  );
};
