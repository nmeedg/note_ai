import { cn } from "@/lib/utils";
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import { Editor, FloatingMenu } from "@tiptap/react";
import {
  Columns,
  MoreHorizontal,
  RectangleHorizontal,
  Rows,
} from "lucide-react";

export const TableOptionsMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const menuItemClass = cn("px-2 py-1.5 text-sm hover:bg-accent rounded-md");

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        placement: "top-end",
        appendTo: "parent",
        duration: 100,
        zIndex: 0,
        offset: [0, 8],
        getReferenceClientRect: () => {
          const { ranges } = editor.state.selection;
          const from = Math.min(...ranges.map((range) => range.$from.pos));
          const to = Math.max(...ranges.map((range) => range.$to.pos));

          let nodePos: number | undefined = undefined;

          editor.state.doc.nodesBetween(from, to, (_node, p) => {
            nodePos = p;
            return false;
          });

          if (nodePos !== undefined) {
            const node = editor.view.nodeDOM(nodePos) as HTMLElement;

            if (node) {
              return node.getBoundingClientRect();
            }
          }

          return editor.view.dom.getBoundingClientRect();
        },
      }}
      shouldShow={({ editor }) => {
        return editor.isActive("table");
      }}
    >
      <>
        <Menu>
          <Tooltip
            appearance="inverted"
            content="Column"
            relationship="description"
            withArrow
          >
            <MenuTrigger>
              <Button
                style={{
                  margin: "0 0.3rem",
                  boxShadow: tokens.shadow4,
                  border: "none",
                }}
                icon={<Columns className="size-5" />}
              ></Button>
            </MenuTrigger>
          </Tooltip>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().addColumnBefore().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Add column before
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().addColumnAfter().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Add column after
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().deleteColumn().run();
                }}
                style={{
                  color: "red",
                }}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Delete column
                </Text>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <Tooltip
            appearance="inverted"
            content="Row"
            relationship="description"
            withArrow
          >
            <MenuTrigger>
              <Button
                style={{
                  margin: "0 0.3rem",
                  boxShadow: tokens.shadow4,
                  border: "none",
                }}
                icon={<Rows className="size-5" />}
              ></Button>
            </MenuTrigger>
          </Tooltip>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().addRowBefore().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Add row before
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().addRowAfter().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Add row after
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().deleteRow().run();
                }}
                style={{
                  color: "red",
                }}
                role="button"
              >
                <Text weight="medium" size={300}>
                  Delete row
                </Text>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <Tooltip
            appearance="inverted"
            content="Cell"
            relationship="description"
            withArrow
          >
            <MenuTrigger>
              <Button
                style={{
                  margin: "0 0.3rem",
                  boxShadow: tokens.shadow4,
                  border: "none",
                }}
                icon={<RectangleHorizontal className="size-5" />}
              ></Button>
            </MenuTrigger>
          </Tooltip>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().mergeCells().run();
                }}
                className={menuItemClass}
                role="button"
              >
                
                <Text weight="medium" size={300}>
                  Merge cells
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().splitCell().run();
                }}
                className={menuItemClass}
                role="button"
              >
               
                <Text weight="medium" size={300}>
                   Split cell
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeaderCell().run();
                }}
                style={{
                  color: "red",
                }}
                role="button"
              >
                
                <Text weight="medium" size={300}>
                  Toggle header cell
                </Text>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <Tooltip
            appearance="inverted"
            content="Options"
            relationship="description"
            withArrow
          >
            <MenuTrigger>
              <Button
                style={{
                  margin: "0 0.3rem",
                  boxShadow: tokens.shadow4,
                  border: "none",
                }}
                icon={<MoreHorizontal className="size-5" />}
              ></Button>
            </MenuTrigger>
          </Tooltip>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeaderRow().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                   Toggle header row
                </Text>
               
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeaderColumn().run();
                }}
                className={menuItemClass}
                role="button"
              >
                <Text weight="medium" size={300}>
                Toggle header col
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().deleteTable().run();
                }}
                style={{
                  color: "red",
                }}
                role="button"
              >
                <Text weight="medium" size={300}>
                Delete table
                </Text>
                
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </>
    </FloatingMenu>
  );
};
