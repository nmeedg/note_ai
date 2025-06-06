import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  Tooltip,
} from "@fluentui/react-components";
import {
  AlignCenterVertical20Regular,
  AlignLeft20Regular,
  AlignRight20Regular,
  AlignStretchHorizontal20Regular,
  ArrowReply20Regular,
  Code20Regular,
  CodeBlockEdit20Regular,
  CommentQuote20Regular,
  HighlightRegular,
  ImageAdd20Regular,
  LinkMultiple20Regular,
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
import { Heading, Heading1Icon, Heading2Icon, Heading3Icon } from "lucide-react";

const useStyle = makeStyles({
  rootTool: {
    width: "71vw",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

interface EditorProps {
  editor?: Editor;
}

function ToolbarApp({ editor }: EditorProps) {
  const styles = useStyle();
  // console.log(editor);


  return (
    <>
      <Toolbar size="small" className={styles.rootTool}>
        <ToolbarButton
          aria-label="Undo"
          appearance="subtle"
          disabled={!editor?.can().undo()}
          onClick={()=>{
            editor?.commands.undo()
          }}
          icon={<ArrowReply20Regular />}
        />
        <ToolbarButton
          aria-label="Redo"
          style={{
            transform: "scaleX(-1)",
          }}
          disabled={!editor?.can().redo()}
          onClick={()=>{
            editor?.commands.redo()
          }}
          icon={<ArrowReply20Regular />}
        />
        <ToolbarDivider />
        <Menu>
          <MenuTrigger>
            <ToolbarButton
              aria-label="Headers"
              style={{
                margin: "0 0.3rem",
              }}
              icon={<Heading size={16} />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<Heading1Icon size={16} />}>Header 1</MenuItem>
              <MenuItem icon={<Heading2Icon size={16} />}>Header 2</MenuItem>
              <MenuItem icon={<Heading3Icon size={16} />}>Header 3</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger>
            <ToolbarButton
              aria-label="Headers"
              style={{
                margin: "0 0.3rem",
              }}
              icon={<TextBulletListLtr20Regular />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<TextBulletListLtr20Regular />}>
                Bullet List
              </MenuItem>
              <MenuItem icon={<TextNumberListLtr20Regular />}>
                Ordered List
              </MenuItem>
              <MenuItem icon={<TaskListLtr20Regular />}>Task List</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <ToolbarButton
          aria-label="code block"
          style={{
            margin: "0 0.3rem",
          }}
          icon={<CommentQuote20Regular />}
        />
        <ToolbarButton
          aria-label="code block"
          style={{
            margin: "0 0.3rem",
          }}
          icon={<CodeBlockEdit20Regular />}
        />
        <ToolbarDivider />
        <Tooltip
          content="Makes selected text Bold"
          relationship="description"
          appearance="inverted"
        >
          <ToolbarToggleButton
            aria-label="Bold"
            style={{
              margin: "0 0.3rem",
            }}
            icon={<TextBoldRegular />}
            name="textOptions"
            appearance="subtle"
            value="bold"
          />
        </Tooltip>
        <Tooltip
          content="Makes selected text Italic"
          relationship="description"
          withArrow
        >
          <ToolbarToggleButton
            aria-label="Italic"
            style={{
              margin: "0 0.3rem",
            }}
            icon={<TextItalicRegular />}
            name="textOptions"
            value="italic"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip
          content="Makes selected text strike"
          relationship="description"
          withArrow
        >
          <ToolbarToggleButton
            aria-label="Italic"
            icon={<TextStrikethrough20Regular />}
            name="textOptions"
            style={{
              margin: "0 0.3rem",
            }}
            value="strike"
            appearance="subtle"
          />
        </Tooltip>
        <ToolbarToggleButton
          aria-label="Underline"
          icon={<Code20Regular />}
          name="textOptions"
          value="code"
          style={{
            margin: "0 0.3rem",
          }}
          appearance="subtle"
        />
        <Tooltip
          content="Makes selected text Underline"
          relationship="description"
          withArrow
        >
          <ToolbarToggleButton
            aria-label="Underline"
            icon={<TextUnderlineRegular />}
            name="textOptions"
            style={{
              margin: "0 0.3rem",
            }}
            value="underline"
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip
          content="Highlights the selected text"
          relationship="description"
          withArrow
        >
          <ToolbarButton
            aria-label="Highlight"
            icon={<HighlightRegular />}
            appearance="subtle"
          />
        </Tooltip>
        <Tooltip
          content="Link the selected text"
          relationship="description"
          withArrow
        >
          <ToolbarButton
            aria-label="Link"
            icon={<LinkMultiple20Regular />}
            appearance="subtle"
            style={{
              margin: "0 0.3rem",
            }}
          />
        </Tooltip>
        <ToolbarDivider />
        <ToolbarButton
          aria-label="superscript"
          icon={<TextSuperscript20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />{" "}
        <ToolbarButton
          aria-label="subscript"
          icon={<TextSubscript20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarDivider />
        <ToolbarButton
          aria-label="align left"
          icon={<AlignLeft20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />{" "}
        <ToolbarButton
          aria-label="align center"
          icon={<AlignCenterVertical20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />{" "}
        <ToolbarButton
          aria-label="align right"
          icon={<AlignRight20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="align strectch"
          icon={<AlignStretchHorizontal20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarDivider />
        <ToolbarButton
          aria-label="image add"
          icon={<ImageAdd20Regular />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-gray-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-blue-400" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-red-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-green-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-blue-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-yellow-400" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-purple-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-pink-600" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
          }}
        />
        <ToolbarButton
          aria-label="color blovk red"
          icon={<SquareBlock color="bg-orange-400" />}
          appearance="subtle"
          style={{
            margin: "0 0.3rem",
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
