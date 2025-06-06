import * as React from "react";
import { getTheme } from "@/App";
import {
  DrawerHeaderTitle,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  Text,
  ToggleButton,
  Theme,
  webDarkTheme,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  OnNavItemSelectData,
} from "@fluentui/react-nav-preview";

import {
  Board20Filled,
  Board20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  bundleIcon,
  Toolbox20Filled,
  Toolbox20Regular,
  Bookmark20Filled,
  Bookmark20Regular,
  Add20Filled,
  Add20Regular,
  DocumentSparkle20Filled,
  DocumentSparkle20Regular,
  FolderOpen20Filled,
  FolderOpen16Regular,
} from "@fluentui/react-icons";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const useStyles = makeStyles({
  mydrawer: {
    width: "22.5%",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  navitem: {
    backgroundColor: "transparent",
    marginBottom: "0.5rem",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3Selected,
    },
  },

  mininavitem: {
    marginBottom: "1rem",
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const TravailIcon = bundleIcon(Toolbox20Filled, Toolbox20Regular);
const FavIcon = bundleIcon(Bookmark20Filled, Bookmark20Regular);
const AddIcon = bundleIcon(Add20Filled, Add20Regular);
const DocumentIcon = bundleIcon(
  DocumentSparkle20Filled,
  DocumentSparkle20Regular
);
const OtherIcon = bundleIcon(FolderOpen20Filled, FolderOpen16Regular);

interface SidebarProps {
  changeFolder: (folderId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ changeFolder }) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = React.useState<string>("1");

  const [isOpen, setIsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>(getTheme());
  React.useEffect(() => {
    window.ipcRenderer.on("nativeThemeChanged", () => setTheme(getTheme()));
  }, []);
  const handleItemSelect = (
    ev: Event | React.SyntheticEvent<Element, Event>,
    data: OnNavItemSelectData
  ) => {
    setSelectedValue(data.value as string);
    changeFolder(data.value as string);
    setIsOpen(false);
  };

  const restoreFocusSourceAttributes = useRestoreFocusSource();
  return (
    <div
      style={{
        height: "100%",
        width: "4vw",
        position: "fixed",
        top: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: tokens.colorNeutralStroke3,
        borderRightStyle: "solid",
        background: tokens.colorNeutralBackground3Pressed,
        gap: 10,
        padding: tokens.spacingHorizontalM,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div>
        <NavDrawer
          {...restoreFocusSourceAttributes}
          type="overlay"
          density="medium"
          separator
          open={isOpen}
          className={styles.mydrawer}
          tabbable={true}
          selectedValue={selectedValue}
          onNavItemSelect={handleItemSelect}
        >
          <NavDrawerHeader
            style={{
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                height: "2rem",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DrawerHeaderTitle>
                <Hamburger onClick={() => setIsOpen(false)} />{" "}
                <Text size={400} weight="bold">
                  Tous
                </Text>
              </DrawerHeaderTitle>
              <div className=" translate-x-5">
                {theme == webDarkTheme ? (
                  <ToolbarButton
                    aria-label="sun"
                    icon={
                      <DarkModeSwitch
                        checked={theme == webDarkTheme ? true : false}
                        onChange={() => {}}
                        size={20}
                      />
                    }
                    onClick={() => {
                      window.ipcRenderer.invoke("dark-mode:toggle");
                    }}
                    appearance="subtle"
                  />
                ) : (
                  <ToolbarButton
                    aria-label="moon"
                    icon={
                      <DarkModeSwitch
                        checked={theme == webDarkTheme ? true : false}
                        onChange={() => {}}
                        size={20}
                      />
                    }
                    appearance="subtle"
                    onClick={() => {
                      window.ipcRenderer.invoke("dark-mode:toggle");
                    }}
                  />
                )}
              </div>
            </div>
          </NavDrawerHeader>
          <NavDrawerBody>
            <NavItem
              className={styles.navitem}
              icon={<Dashboard />}
              style={
                selectedValue == "1"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              value="1"
            >
              Mes notes
            </NavItem>
            <NavItem
              className={styles.navitem}
              icon={<TravailIcon />}
              style={
                selectedValue == "2"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              value="2"
            >
              Travail
            </NavItem>
            <NavItem
              className={styles.navitem}
              style={
                selectedValue == "3"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              icon={<FavIcon />}
              value="3"
            >
              Favoris
            </NavItem>
            <NavItem
              className={styles.navitem}
              style={
                selectedValue == "4"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              icon={<Search />}
              value="4"
            >
              Ecoles
            </NavItem>
            <NavItem
              className={styles.navitem}
              icon={<DocumentIcon />}
              style={
                selectedValue == "5"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              value="5"
            >
              Les documents
            </NavItem>
            <NavItem
              className={styles.navitem}
              style={
                selectedValue == "6"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              icon={<OtherIcon />}
              value="6"
            >
              Autres
            </NavItem>
            <NavItem
              className={styles.navitem}
              style={
                selectedValue == "7"
                  ? {
                      backgroundColor: tokens.colorNeutralBackground1Selected,
                      color: tokens.colorNeutralForeground2BrandHover,
                    }
                  : {}
              }
              icon={<AddIcon />}
              value="7"
            >
              Nouveau dossier
            </NavItem>
          </NavDrawerBody>
        </NavDrawer>
        <div>
          <div
            id="titlebar"
            style={{
              height: "2.5rem",
            }}
          ></div>
          <Hamburger
            style={{
              marginBottom: "1rem",
            }}
            onClick={() => setIsOpen(true)}
          />

          <ToggleButton
            checked={selectedValue == "1"}
            onClick={() => {
              setSelectedValue("1");
              changeFolder("1");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<Dashboard />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "2"}
            onClick={() => {
              setSelectedValue("2");
              changeFolder("2");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<TravailIcon />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "3"}
            onClick={() => {
              setSelectedValue("3");
              changeFolder("3");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<FavIcon />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "4"}
            onClick={() => {
              setSelectedValue("4");
              changeFolder("4");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<Search />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "5"}
            onClick={() => {
              setSelectedValue("5");
              changeFolder("5");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<DocumentIcon />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "6"}
            onClick={() => {
              setSelectedValue("6");
              changeFolder("6");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<OtherIcon />}
          ></ToggleButton>
          <ToggleButton
            checked={selectedValue == "7"}
            onClick={() => {
              setSelectedValue("7");
              changeFolder("7");
            }}
            className={styles.mininavitem}
            appearance="transparent"
            icon={<AddIcon />}
          ></ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
