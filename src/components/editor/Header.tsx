import {
  FontIncrease24Regular,
  FontDecrease24Regular,
  TextFont24Regular,
  MoreHorizontal24Filled,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  makeStyles,
  MenuItem,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1rem',
    }
})


export const HeaderEditor = (props: Partial<ToolbarProps>) =>{
    const styles = useStyles()
    
    return (

  <Toolbar aria-label="Default" {...props} className={styles.toolbar} >
    <ToolbarButton
      aria-label="Increase Font Size"
      appearance="primary"
      icon={<FontIncrease24Regular />}
    />
    <ToolbarButton
      aria-label="Decrease Font Size"
      icon={<FontDecrease24Regular />}
    />
    <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
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
);}