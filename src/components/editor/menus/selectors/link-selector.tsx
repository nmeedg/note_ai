import {
  Button,
  Input,
  Menu,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { LinkMultiple20Regular } from "@fluentui/react-icons";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { useRef } from "react";

export const LinkSelector = ({ editor }: { editor: Editor }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorState = useEditorState({
    editor,
    selector: (instance) => ({
      isLink: instance.editor.isActive("link"),
      getLink: instance.editor.getAttributes("link").href,
      isMath: instance.editor.isActive("math"),
    }),
  });

  return (
    <Menu positioning="above">
      <MenuTrigger>
        <Button appearance="subtle" icon={<LinkMultiple20Regular />} disabled={editorState.isMath}>
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <form
          className="flex space-x-1 items-center"
          onSubmit={(evt) => {
            evt.preventDefault();
            const url = inputRef.current?.value;
            if (!url) {
              return;
            }
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          <Input
            ref={inputRef}
            placeholder="Paste a link..."
            defaultValue={editorState.getLink}
          />
          {editorState.isLink ? (
            <Button
              appearance="primary"
              style={{
                backgroundColor: "red"
              }}
              type="button"
              icon={ <Trash2Icon className="size-4" />}
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
             
            </Button>
          ) : (
            <Button appearance="primary" type="submit" icon={<CheckIcon className="size-4" />}>
              
            </Button>
          )}
        </form>
      </MenuPopover>
    </Menu>
  );
};
