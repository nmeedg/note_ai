import { Editor, isTextSelection } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import {
  AiSelector,
  MathSelector,
  NodeSelector,
  TextAlignSelector,
  TextButtons,
} from "./selectors";
import { useState } from "react";
import {
  Divider,
  tokens,
  Toolbar,
  ToolbarProps,
} from "@fluentui/react-components";

export const DefaultBubbleMenu = ({
  editor,
  showAiTools,
}: {
  editor: Editor | null;
  showAiTools?: boolean;
}) => {
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

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        placement: "top",
        hideOnClick: false,
        moveTransition: "transform 0.6s ease-out",
      }}
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { empty } = selection;

        if (!editor.isEditable) {
          return false;
        }

        if (empty) {
          return false;
        }

        if (!isTextSelection(selection)) {
          return false;
        }

        if (editor.isActive("codeBlock")) {
          return false;
        }

        return true;
      }}
    >
      <Toolbar
        aria-label="with controlled Toggle Button"
        checkedValues={checkedValues}
        style={{
          maxWidth: "90vw",
          borderRadius: "0.3rem",
          backgroundColor: tokens.colorNeutralBackground2,
          boxShadow: tokens.shadow8,
          padding: 0,
        }}
        onCheckedValueChange={onChange}
      >
        {showAiTools && (
          <>
            <AiSelector editor={editor} />
            <Divider vertical={true}></Divider>
          </>
        )}
        <NodeSelector editor={editor} />
        <Divider vertical={true}></Divider>
        <TextButtons editor={editor} />
        <Divider vertical={true}></Divider>
        <MathSelector editor={editor} />
        <Divider vertical={true}></Divider>
        <TextAlignSelector editor={editor} />
      </Toolbar>
    </BubbleMenu>
  );
};
