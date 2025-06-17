import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  tokens,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
} from "@fluentui/react-components";
import {
  AlignCenterVertical20Regular,
  AlignLeft20Regular,
  AlignRight20Regular,
  AlignStretchHorizontal20Regular,
  ArrowRedoRegular,
  ArrowUndoRegular,
  Code20Regular,
  CommentQuote20Regular,
  HighlightRegular,
  ImageAdd20Regular,
  LinkDismiss20Regular,
  TaskListLtr20Regular,
  TextBoldRegular,
  TextBulletListLtr20Regular,
  TextItalicRegular,
  TextNumberListLtr20Regular,
  TextStrikethrough20Regular,
  TextSubscript20Regular,
  TextSuperscript20Regular,
  TextUnderlineRegular,
} from "@fluentui/react-icons";
import { Editor } from "@tiptap/core";
import {
  Heading,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
} from "lucide-react";
import { useRef } from "react";

const useStyle = makeStyles({
  rootTool: {
    width: "71vw",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  item: {
    margin: "0 0.3rem",
  },
  itemSelected: {
    margin: "0 0.3rem",
    color: tokens.colorNeutralForeground2BrandHover,
    backgroundColor: tokens.colorSubtleBackgroundHover,
  },
  colorSelected: {
    margin: "0 0.3rem",
    backgroundColor: tokens.colorSubtleBackgroundHover,
    boxShadow: tokens.shadow2,
  },

  itemDestructive: {
    margin: "0 0.3rem",
    color: tokens.colorStatusDangerBackground3,
    backgroundColor: tokens.colorStatusDangerBackground1,
  },
});

interface EditorProps {
  editor: Editor;
}

function ToolbarApp({ editor }: EditorProps) {
  const styles = useStyle();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      insertImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleColor = (colorValue: string) => {
    const current = editor?.getAttributes("textStyle").color;
    const newColor = current === colorValue ? null : colorValue;
    editor?.chain().focus().setColor(newColor).run();
  };

  return (
    <>
      <Toolbar size="small" className={styles.rootTool}>
        <ToolbarButton
          aria-label="Undo"
          appearance="subtle"
          key="undo"
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().undo()}
          icon={<ArrowUndoRegular />}
        />
        <ToolbarButton
          aria-label="Redo"
          key="redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={<ArrowRedoRegular />}
        />
        <ToolbarDivider />
        <Menu openOnHover>
          <MenuTrigger>
            {editor.isActive("heading", { level: 1 }) ? (
              <ToolbarButton
                aria-label="Header 1"
                className={styles.itemSelected}
                icon={<Heading1Icon size={16} />}
              />
            ) : editor.isActive("heading", { level: 2 }) ? (
              <ToolbarButton
                aria-label="Header 2"
                className={styles.itemSelected}
                icon={<Heading2Icon size={16} />}
              />
            ) : editor.isActive("heading", { level: 3 }) ? (
              <ToolbarButton
                aria-label="Header 3 "
                className={styles.itemSelected}
                icon={<Heading3Icon size={16} />}
              />
            ) : (
              <ToolbarButton
                name="headers"
                className={styles.itemSelected}
                appearance="subtle"
                icon={<Heading size={16} />}
              />
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                icon={<Heading1Icon size={16} />}
              >
                Header 1
              </MenuItem>
              <MenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                icon={<Heading2Icon size={16} />}
              >
                Header 2
              </MenuItem>
              <MenuItem
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                icon={<Heading3Icon size={16} />}
              >
                Header 3
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu openOnHover>
          <MenuTrigger>
            <ToolbarButton
              aria-label="Bullet list"
              className={styles.item}
              icon={<TextBulletListLtr20Regular />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={
                  editor?.isActive("bulletList")
                    ? styles.itemSelected
                    : styles.item
                }
                icon={<TextBulletListLtr20Regular />}
              >
                Bullet List
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={
                  editor?.isActive("orderedList")
                    ? styles.itemSelected
                    : styles.item
                }
                icon={<TextNumberListLtr20Regular />}
              >
                Ordered List
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleTaskList().run();
                }}
                className={
                  editor?.isActive("taskList")
                    ? styles.itemSelected
                    : styles.item
                }
                icon={<TaskListLtr20Regular />}
              >
                Task List
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <ToolbarButton
          aria-label="blockquote"
          className={
            editor?.isActive("blockquote") ? styles.itemSelected : styles.item
          }
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          icon={<CommentQuote20Regular />}
        />
        <ToolbarButton
          aria-label="code"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock") ? styles.itemSelected : styles.item
          }
          icon={<Code20Regular />}
        />
        <ToolbarDivider />
        <Tooltip content="Gras" relationship="description">
          <ToolbarButton
            aria-label="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? styles.itemSelected : styles.item
            }
            icon={<TextBoldRegular />}
            name="textOptions"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip content="Italique" relationship="description" withArrow>
          <ToolbarButton
            aria-label="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? styles.itemSelected : styles.item
            }
            icon={<TextItalicRegular />}
            name="textOptions2"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip content="Barré" relationship="description" withArrow>
          <ToolbarButton
            aria-label="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? styles.itemSelected : styles.item
            }
            icon={<TextStrikethrough20Regular />}
            name="textOptions"
            value="strike"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip content="Souligné" relationship="description" withArrow>
          <ToolbarButton
            aria-label="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<TextUnderlineRegular />}
            name="textOptions"
            className={
              editor.isActive("underline") ? styles.itemSelected : styles.item
            }
            value="underline"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip content="Surbrillance" relationship="description" withArrow>
          <ToolbarButton
            aria-label="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={
              editor.isActive("highlight") ? styles.itemSelected : styles.item
            }
            icon={<HighlightRegular />}
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip content="Lien" relationship="description" withArrow>
          <ToolbarButton
            aria-label="Link"
            icon={<LinkDismiss20Regular />}
            appearance="subtle"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
            className={
              editor.isActive("link") ? styles.itemDestructive : styles.item
            }
          />
        </Tooltip>
        <ToolbarDivider />
        <ToolbarButton
          aria-label="superscript"
          icon={<TextSuperscript20Regular />}
          appearance="subtle"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={
            editor.isActive("superscript") ? styles.itemSelected : styles.item
          }
        />{" "}
        <ToolbarButton
          aria-label="subscript"
          icon={<TextSubscript20Regular />}
          appearance="subtle"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={
            editor.isActive("subscript") ? styles.itemSelected : styles.item
          }
        />
        <ToolbarDivider />
        <ToolbarButton
          aria-label="align left"
          icon={<AlignLeft20Regular />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? styles.itemSelected
              : styles.item
          }
        />{" "}
        <ToolbarButton
          aria-label="align center"
          icon={<AlignCenterVertical20Regular />}
          appearance="subtle"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? styles.itemSelected
              : styles.item
          }
        />{" "}
        <ToolbarButton
          aria-label="align right"
          icon={<AlignRight20Regular />}
          appearance="subtle"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? styles.itemSelected
              : styles.item
          }
        />
        <ToolbarButton
          aria-label="align strectch"
          icon={<AlignStretchHorizontal20Regular />}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          appearance="subtle"
          className={
            editor.isActive({ textAlign: "justify" })
              ? styles.itemSelected
              : styles.item
          }
        />
        <ToolbarDivider />
        <ToolbarButton
          aria-label="image add"
          icon={<ImageAdd20Regular />}
          appearance="subtle"
          onClick={() => fileInputRef.current?.click()}
          className={styles.item}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <ToolbarButton
          aria-label="color gray"
          icon={<SquareBlock color="bg-gray-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(44.6% 0.03 256.802)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(44.6% 0.03 256.802)");
          }}
        />
        <ToolbarButton
          aria-label="color blue 400"
          icon={<SquareBlock color="bg-blue-400" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(70.7% 0.165 254.624)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(70.7% 0.165 254.624)");
          }}
        />
        <ToolbarButton
          aria-label="color red 600"
          icon={<SquareBlock color="bg-red-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(57.7% 0.245 27.325)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(57.7% 0.245 27.325)");
          }}
        />
        <ToolbarButton
          aria-label="color grren"
          icon={<SquareBlock color="bg-green-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(62.7% 0.194 149.214)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(62.7% 0.194 149.214)");
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-blue-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(54.6% 0.245 262.881)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(54.6% 0.245 262.881)");
          }}
        />
        <ToolbarButton
          aria-label="color yello 400"
          icon={<SquareBlock color="bg-yellow-400" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(85.2% 0.199 91.936)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(85.2% 0.199 91.936)");
          }}
        />
        <ToolbarButton
          aria-label="color purple"
          icon={<SquareBlock color="bg-purple-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(54.1% 0.281 293.009)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(54.1% 0.281 293.009)");
          }}
        />
        <ToolbarButton
          aria-label="color pink 600"
          icon={<SquareBlock color="bg-pink-600" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(59.2% 0.249 0.584)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(59.2% 0.249 0.584)");
          }}
        />
        <ToolbarButton
          aria-label="color orange 400"
          icon={<SquareBlock color="bg-orange-400" />}
          appearance="subtle"
          className={
            editor?.getAttributes("textStyle").color ==
            "oklch(75% 0.183 55.934)"
              ? styles.colorSelected
              : styles.item
          }
          onClick={() => {
            toggleColor("oklch(75% 0.183 55.934)");
          }}
        />
      </Toolbar>
    </>
  );
}

function SquareBlock({ color = "bg-blue-700" }: { color: string }) {
  return <div className={`h-4 w-4 ${color} px-2 rounded-xs`}></div>;
}

export default ToolbarApp;
