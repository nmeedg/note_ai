import {
  Button,
  Menu,
  MenuItem,
  Text,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  AlignCenterVertical16Regular,
  AlignLeft16Regular,
  AlignRight16Regular,
} from "@fluentui/react-icons";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";

interface SelectorResult {
  isLeft: boolean;
  isCenter: boolean;
  isRight: boolean;
}

const items = [
  {
    title: "Left",
    icon: AlignLeft16Regular,
    onClick: (editor: Editor) =>
      editor.chain().focus().setTextAlign("left").run(),
    isActive: (state: SelectorResult) => state.isLeft,
  },
  {
    title: "Center",
    icon: AlignCenterVertical16Regular,
    onClick: (editor: Editor) =>
      editor.chain().focus().setTextAlign("center").run(),
    isActive: (state: SelectorResult) => state.isCenter,
  },
  {
    title: "Right",
    icon: AlignRight16Regular,
    onClick: (editor: Editor) =>
      editor.chain().focus().setTextAlign("right").run(),
    isActive: (state: SelectorResult) => state.isRight,
  },
];

export const TextAlignSelector = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState<SelectorResult>({
    editor,
    selector: (instance) => ({
      isLeft: instance.editor.isActive({ textAlign: "left" }),
      isCenter: instance.editor.isActive({ textAlign: "center" }),
      isRight: instance.editor.isActive({ textAlign: "right" }),
    }),
  });

  const activeItem =
    items.find((item) => item.isActive(editorState)) ?? items[0]!;

  return (
    <Menu>
      <MenuTrigger>
        <Button
          appearance="subtle"
          style={{
            margin: 0,
            paddingRight: "0",
            paddingLeft: "0",
          }}
        >
          <activeItem.icon className="size-4 me-2" strokeWidth={2.5} />
          <ChevronDownIcon className="size-3" />
        </Button>
      </MenuTrigger>
      <MenuPopover>
        {items.map((item, i) => {
          return (
            <MenuItem
              key={i}
              icon={<item.icon className="size-4" />}
              onClick={() => item.onClick(editor)}
              disabled={item.isActive(editorState)}
            >
              <Text size={200} weight="medium">{item.title}</Text>
            </MenuItem>
          );
        })}
      </MenuPopover>
    </Menu>
  );
};
