import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import { defaultExtensions } from "./default-extensions";
import { Ai } from "./extensions/ai";
import { getSuggestion, SlashCommand } from "./extensions/slash-command";
import { CodeBlockLanguageMenu } from "./menus/codeblock-language-menu";
import { DefaultBubbleMenu } from "./menus/default-bubble-menu";
import { TableOptionsMenu } from "./menus/table-options-menu";
import {
  Link,
  Toast,
  ToastTitle,
  ToastTrigger,
  useId,
  useToastController,
} from "@fluentui/react-components";

interface BlockEditorProps {
  content?: Content;
  placeholder?: string;
  onCreate?: (editor: Editor) => void;
  onUpdate?: (editor: Editor) => void;
}

const BlockEditor = ({
  content,
  placeholder,
  onCreate,
  onUpdate,
}: BlockEditorProps) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      Placeholder.configure({
        placeholder: placeholder ?? "Type  /  for commands...",
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
    content: content,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onCreate: ({ editor }) => {
      onCreate?.(editor);
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor);
    },
    onContentError: ({ error }) => {
      console.error(error);
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className="prose prose-a:text-blue-500 prose-neutral dark:prose-invert focus:outline-none max-w-none z-0"
      />
      <TableOptionsMenu editor={editor} />
      <CodeBlockLanguageMenu editor={editor} />
      <DefaultBubbleMenu editor={editor} showAiTools={true} />
    </>
  );
};

export { BlockEditor, type BlockEditorProps };
