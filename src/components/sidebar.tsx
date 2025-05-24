import * as React from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem
} from "@fluentui/react-nav-preview";

import {
  Label,
  makeStyles,
  tokens,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  Add20Filled,
  Add20Regular,
  bundleIcon,
  RibbonStar20Regular,
  RibbonStar20Filled,
  Document20Filled,
  Document20Regular,
  AppsListDetail20Filled,
  AppsListDetail20Regular,
  MailAllRead20Filled,
  Prompt20Filled,
  MailAllRead20Regular,
  Prompt20Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100vh",
  },
  navItem: {
    marginTop: tokens.spacingVerticalXS,
    backgroundColor: 'transparent', //tokens.colorNeutralBackground1,
  },
  labelHidden: {
    display: "none",
  },
   navCollapsed: {
    backgroundColor: 'transparent',
    width: "50px",
    transition: "width 0.5s ease",
  },
  navExpanded: {
    backgroundColor: 'transparent',
    width: "250px",
    transition: "width 0.5s ease",
  },
  navBody: {
    display: "flex",
    flexDirection: "column",
    padding: "0 8px 0 8px",
    overflowY: "auto",
    height: "100%",
  },
  navHeader: {
    display: 'flex',
    //gap: '5px',
    marginBottom: tokens.spacingVerticalSNudge,
    alignItems: 'center'
  },
    content: {
    padding: "16px",
    marginTop: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",  
    flexGrow: 1,
    borderLeftStyle: "solid",
    borderTopStyle: "solid",
    borderLeftWidth: tokens.strokeWidthThin,
    borderTopWidth: tokens.strokeWidthThin,
    borderLeftColor:tokens.colorNeutralStroke2,
    borderTopLeftRadius: tokens.borderRadiusXLarge,
    borderTopColor:tokens.colorNeutralStroke2,
  },
    // flex: "1",
    // padding: "16px",
    // display: "grid",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Star = bundleIcon(RibbonStar20Filled, RibbonStar20Regular);
const Add = bundleIcon(Add20Filled, Add20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Document = bundleIcon(Document20Filled, Document20Regular);
const MailAllRead = bundleIcon(
  MailAllRead20Filled,
  MailAllRead20Regular
);
const Prompt = bundleIcon(Prompt20Filled, Prompt20Regular);
const AppListDetails = bundleIcon(
  AppsListDetail20Filled,
  AppsListDetail20Regular
);


const Basic = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);
   const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleDrawer = () => setIsExpanded(prev => !prev);
  // Tabster prop used to restore focus to the navigation trigger for overlay nav drawers
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const linkDestination = "";

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="1"
        open={isOpen}
        type="inline"
        data-expanded={isExpanded}
       // density="medium"
         className={isExpanded ? styles.navExpanded : styles.navCollapsed}
      >
        <NavDrawerHeader>
          <div className={styles.navHeader}>
            
            <Hamburger appearance="subtle" onClick={toggleDrawer} />
       
          <Label weight="semibold" size="large"  className={!isExpanded ? styles.labelHidden : ""} >Tous</Label>
          </div>
        </NavDrawerHeader>

        <NavDrawerBody className={styles.navBody}>
          <NavItem href={linkDestination} icon={<Dashboard />} className={styles.navItem} value="1">
            
            {isExpanded && "Mes notes"}
          </NavItem>
          <NavItem href={linkDestination} icon={<MailAllRead />} className={styles.navItem} value="2">
           {isExpanded && "Travail"}
          </NavItem>
          <NavItem
            href={linkDestination}
            icon={<Star />}
            value="3"
            className={styles.navItem}
          >
            
            {isExpanded && "Favoris"}
          </NavItem>
          <NavItem icon={<AppListDetails />} className={styles.navItem} href={linkDestination} value="4">
            
            {isExpanded && "Recettes"}

          </NavItem>
          <NavItem
            icon={<Document />}
            href={linkDestination}
            value="5"
            className={styles.navItem}
          >
            {isExpanded && "Mes documents"}

          </NavItem>
          <NavItem icon={<Prompt />} className={styles.navItem} value="6">
            {isExpanded && "School"}
          </NavItem>
          <NavItem icon={<Add />} className={styles.navItem} value="7">
            
            {isExpanded && "Nouveau dossier"}
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
        
        {/* Main content area */}
      <div className={styles.content}>
       
        {!isOpen &&  <Hamburger
          appearance="subtle"
            onClick={() => setIsOpen(!isOpen)}
            {...restoreFocusTargetAttributes}
          />}
        
      </div>
    </div>
  );
};

export default Basic;