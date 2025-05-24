import * as React from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem
} from "@fluentui/react-nav-preview";

import {
  makeStyles,
  tokens,
  useRestoreFocusTarget,
  Text,
  Input
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
  Prompt20Regular,
  Folder48Regular,
  Search16Regular
} from "@fluentui/react-icons";
import { Content } from './Content';

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
    width: "200px",
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
  noteContainer : {
    width: "250px",
    display: "flex",
    borderRadius: tokens.borderRadiusMedium,
    borderRightStyle: "solid",
    borderRightWidth: tokens.strokeWidthThin,
    borderRightColor: tokens.colorNeutralStroke2,
    flexDirection: "column",
    padding: tokens.spacingVerticalXL,
  },
  editorContainer: {
    padding: tokens.spacingVerticalM
  },
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


const items = [
  { icon: <Board20Filled />, label: "Mes notes" },
  { icon: <Board20Filled />, label: "Mes notes" },
  { icon: <MailAllRead20Filled />, label: "Travail" },
  { icon: <RibbonStar20Filled />, label: "Favoris" },
  { icon: <AppsListDetail20Filled />, label: "Recettes" },
  { icon: <Document20Filled />, label: "Mes documents" },
  { icon: <Prompt20Filled />, label: "School" },
  { icon: <Add20Filled />, label: "Nouveau dossier" },
];


const Basic = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);
   const [isExpanded, setIsExpanded] = React.useState(false);
   const [selectedNavitem, setSelectedNavItem]=React.useState('1')

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
        onNavItemSelect={(event,data)=>setSelectedNavItem(data.value)}
       density="medium"
       selectedValue={selectedNavitem}
         className={isExpanded ? styles.navExpanded : styles.navCollapsed}
      >
        <NavDrawerHeader>
          <div className={styles.navHeader}>
            
            <Hamburger appearance="subtle" onClick={toggleDrawer} />
       
          <Text weight="bold" size={400} align="start" block={false}  className={!isExpanded ? styles.labelHidden : ""} >Tous</Text>
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

          <div className={styles.noteContainer}>
            <Text align="start" block={true} weight="semibold" size={500} style={{
              marginBottom: tokens.spacingVerticalXL,
            }} >{items[selectedNavitem].label} </Text>
            <Input type="text" placeholder="Rechercher dans le dossier" style={{
              marginBottom: tokens.spacingVerticalL,
            }} appearance="filled-darker" contentAfter={<Search16Regular></Search16Regular>} />
          <Text align="start" block={true} truncate={true} style={{
            color: tokens.colorNeutralBackgroundStatic
,
          }} size={300}>
            Utilisez la recherche pour trouver vos notes rapidement...
          </Text>
          <div style={{
            display: "flex",
            height: '80%',
            width:'100%',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            color: tokens.colorNeutralForegroundDisabled,
            }}>
              <Folder48Regular style={{
                scale: '1.2',
                marginBottom: tokens.spacingVerticalM
              }}/>
<Text block={true}>Ce dossier est vide pour le moment.</Text>
          </div>
          </div>
          <div className={styles.editorContainer}>
            <div>
               <Content />

            </div>

          </div>
        
      </div>
    </div>
  );
};

export default Basic;