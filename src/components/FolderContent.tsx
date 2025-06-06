import {
  tokens,
  Text,
  Input,
  ToolbarButton,
  Label,
  Combobox,
  Option,
  useId
} from "@fluentui/react-components";
import {
  Document48Regular,
  FolderAdd20Regular,
  SearchRegular,
} from "@fluentui/react-icons";

function FolderContent({ currentFolder }: { currentFolder: string }) {
  const itemList = [
    "Mes notes",
    "Travail",
    "Favoris",
    "Ecoles",
    "Les documents",
    "Autres",
    "Nouveau dossier",
  ];

  const comboId = useId("combo-default");
  const options = ["Cat", "Dog", "Ferret", "Fish", "Hamster", "Snake"];

  return (
    <div
      style={{
        width: "25vw",
        position: "fixed",
        // maxWidth: "350px",
        marginLeft: "4vw",
        height: "100%",
        backgroundColor: tokens.colorNeutralBackground2,
        padding: tokens.spacingHorizontalL,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRightStyle: "solid",
        borderRightWidth: tokens.strokeWidthThin,
        borderRightColor: tokens.colorNeutralStroke3
      }}
    >
      {currentFolder == "7" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div id="titlebar"
              style={{
                height: "2.5rem",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text size={500} weight="bold">
                {itemList[parseInt(currentFolder) - 1]}
              </Text>

              <span>
                <ToolbarButton
                  aria-label="Add folder"
                  icon={<FolderAdd20Regular />}
                />
              </span>
            </div>

            <Text
              block
              style={{
                color: "gray",
                padding: "1.5rem 0",
              }}
            >
              Il n'est pas recommander d'utiliser les noms de dossier longs...
            </Text>

            <div
              style={{
                height: "1rem",
              }}
            ></div>
            <Label>Nom de dossier</Label>
            <Input
              autoFocus
              style={{
                margin: "0.5rem 0",
                display: "block",
              }}
              size="medium"
              appearance="filled-darker"
            />
            <div
              style={{
                height: "1rem",
              }}
            ></div>
            <Label style={{
                paddingBottom: "0.5rem"
            }}>Icone</Label>
            <Combobox
              aria-labelledby={comboId}
              placeholder="Select an animal"
              appearance="filled-darker"
              
            >
              {options.map((option) => (
                <Option key={option} disabled={option === "Ferret"}>
                  {option}
                </Option>
              ))}
            </Combobox>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "2.5rem",
              }}
            ></div>
            <Text size={500} weight="bold">
              {itemList[parseInt(currentFolder) - 1]}
            </Text>
            <Input
              width={"100%"}
              style={{
                margin: "1.5rem 0",
              }}
              size="medium"
              contentAfter={<SearchRegular />}
              placeholder="Rechercher des notes"
              appearance="filled-darker"
            />
            <Text
              block
              style={{
                color: "gray",
              }}
            >
              Utilisez la recherche pour afficher plus de notes...
            </Text>
          </div>

          <div
            style={{
              alignSelf: "center",
              alignItems: "flex-end",
              justifySelf: "center",
              height: "75%",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Document48Regular
              style={{
                scale: "2",
                color: tokens.colorNeutralStroke1,
                margin: tokens.spacingHorizontalXXL,
              }}
            ></Document48Regular>
            <Text
              align="center"
              style={{
                color: tokens.colorNeutralStroke1,
              }}
            >
              Ce dossier est vide....
            </Text>
          </div>
        </>
      )}
    </div>
  );
}

export default FolderContent;
