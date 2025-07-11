import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Text } from "@fluentui/react-components";
import { ChevronDown12Regular } from "@fluentui/react-icons";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  LetterTextIcon,
  List,
  ListOrdered,
  LucideIcon,
  QuoteIcon,
} from "lucide-react";

interface SelectorResult {
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isBlockquote: boolean;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  onClick: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const items: MenuItem[] = [
  {
    name: "Text",
    icon: LetterTextIcon,
    onClick: (editor) =>
      editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
    isActive: (state) =>
      state.isParagraph && !state.isBulletList && !state.isOrderedList,
  },
  {
    name: "Heading 1",
    icon: Heading1,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (state) => state.isHeading1,
  },
  {
    name: "Heading 2",
    icon: Heading2,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (state) => state.isHeading2,
  },
  {
    name: "Heading 3",
    icon: Heading3,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (state) => state.isHeading3,
  },
  // {
  //   name: "To-do List",
  //   icon: CheckSquare,
  //   onClick: (editor) => editor!.chain().focus().toggleTaskList().run(),
  //   isActive: (editor) => editor!.isActive("taskItem"),
  // },
  {
    name: "Bullet List",
    icon: List,
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (state) => state.isBulletList,
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (state) => state.isOrderedList,
  },
  {
    name: "Quote",
    icon: QuoteIcon,
    onClick: (editor) =>
      editor
        .chain()
        .focus()
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
    isActive: (state) => state.isBlockquote,
  },
  // {
  //   name: "Code",
  //   icon: Code,
  //   onClick: (editor) => editor.chain().focus().toggleCode().run(),
  //   isActive: (state) => state.isCode,
  // },
];

export const NodeSelector = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState<SelectorResult>({
    editor,
    selector: (instance) => ({
      isParagraph: instance.editor.isActive("paragraph"),
      isHeading1: instance.editor.isActive("heading", { level: 1 }),
      isHeading2: instance.editor.isActive("heading", { level: 2 }),
      isHeading3: instance.editor.isActive("heading", { level: 3 }),
      isBulletList: instance.editor.isActive("bulletList"),
      isOrderedList: instance.editor.isActive("orderedList"),
      isBlockquote: instance.editor.isActive("blockquote"),
    }),
  });

  const activeItems = items.filter((item) => item.isActive(editorState));

  const name =
    activeItems.length > 1 ? "Multiple" : activeItems.pop()?.name ?? "Text";

  return (
    <Menu>
      <MenuTrigger>
        <Button appearance="subtle" style={{
          paddingRight:0
        }}>
          <span className="whitespace-nowrap text-sm me-2">{name}</span>
          <ChevronDown12Regular style={{
            marginLeft: "0.3rem"
          }} />
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        {items.map((item, i) => {
          return (
            <MenuItem
              key={i}
              disabled={item.isActive(editorState)}
              onClick={() => item.onClick(editor)}
              icon={<item.icon size={16} style={{
                
              }} />}
            >
              <Text size={200} weight="medium" align="center">{item.name}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
      </MenuPopover>
    </Menu>
  );
};
