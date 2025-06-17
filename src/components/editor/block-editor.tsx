
import { Editor, EditorContent } from "@tiptap/react";
import { CodeBlockLanguageMenu } from "./menus/codeblock-language-menu";
import { DefaultBubbleMenu } from "./menus/default-bubble-menu";
import { TableOptionsMenu } from "./menus/table-options-menu";

interface BlockEditorProps {
  editor: Editor;
}

const BlockEditor = ({ editor }: BlockEditorProps) => {
  return (
    <>
      <EditorContent
        editor={editor}
        className="prose prose-a:no-underline prose-neutral dark:prose-invert focus:outline-none max-w-none z-0"
      />
      <TableOptionsMenu editor={editor} />
      <CodeBlockLanguageMenu editor={editor} />
      <DefaultBubbleMenu editor={editor} showAiTools={true} />
    </>
  );
};

export { BlockEditor, type BlockEditorProps };
