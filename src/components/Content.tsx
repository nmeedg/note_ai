import { Divider, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, tokens, Toolbar, ToolbarButton, ToolbarDivider } from "@fluentui/react-components";
import { FontDecrease24Regular, FontIncrease24Regular, MoreHorizontal24Filled, TextFont24Regular } from "@fluentui/react-icons";

function Content() {
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: tokens.colorNeutralBackground1,
      }}
    >
      <div>
        <div
          style={{
            height: "2.5rem",
          }}
        ></div>
        <Toolbar aria-label="Default">
          <ToolbarButton
            aria-label="Increase Font Size"
            appearance="primary"
            icon={<FontIncrease24Regular />}
          />
          <ToolbarButton
            aria-label="Decrease Font Size"
            icon={<FontDecrease24Regular />}
          />
          <ToolbarButton
            aria-label="Reset Font Size"
            icon={<TextFont24Regular />}
          />
          <ToolbarDivider />
          <Menu>
            <MenuTrigger>
              <ToolbarButton
                aria-label="More"
                icon={<MoreHorizontal24Filled />}
              />
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem>New </MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuItem disabled>Open File</MenuItem>
                <MenuItem>Open Folder</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </Toolbar>
        <Divider></Divider>
      </div>
      <div style={{
        paddingTop: "1rem"
      }}>vContent of note</div>
    </div>
  );
}

export default Content;
