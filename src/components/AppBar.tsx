import {
  MoreHorizontal24Filled,
  Settings20Regular,
  SearchRegular,
  CloudArrowDown20Regular,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Input,
  Button,
  tokens,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";

export const AppBar = (props: Partial<ToolbarProps>) => (
  <Toolbar aria-label="Default" {...props} style={{
    width: '87%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: tokens.spacingVerticalM,
  }}>
    <ToolbarButton
      aria-label="App logo"
      appearance='transparent'
      style={{
        marginRight: '10px',
        
      }}
      icon={<img src="/logo_icon.png" alt="App Logo" style={{ width: "100%", height: "100%", scale: "1.05", borderRadius: '25%' }} />}
    />
      <Input size="medium" type='text'  placeholder="Rechercher une note" autoFocus contentAfter={<SearchRegular/>} style={{
        width: '65%',
        marginRight: '10px',
      }} />
      <Button appearance="subtle" style={{
        backgroundColor: tokens.colorNeutralBackground1,
      }} aria-label="Importer une note" icon={<CloudArrowDown20Regular />}>
        Import
      </Button>
      <Button appearance="subtle" icon={<Settings20Regular />}>
      </Button>
    <ToolbarDivider />
    <Menu>
      <MenuTrigger>
        <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
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
);

export default AppBar;