import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
} from "@fluentui/react-components";
import { ChevronDown12Regular, Sparkle20Regular } from "@fluentui/react-icons";
import { Editor } from "@tiptap/core";
import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  EraserIcon,
  PencilLineIcon,
  RefreshCcwDotIcon,
} from "lucide-react";

const items = [
  {
    group: "Edit or review selection",
    commands: [
      {
        title: "Improve writing",
        command: "improve",
        icon: RefreshCcwDotIcon,
      },
      {
        title: "Fix grammar",
        command: "fix grammar",
        icon: EraserIcon,
      },
      {
        title: "Make shorter",
        command: "make shorter",
        icon: ArrowDownNarrowWideIcon,
      },
      {
        title: "Make longer",
        command: "make longer",
        icon: ArrowUpNarrowWideIcon,
      },
    ],
  },
  {
    group: "Use AI to do more",
    commands: [
      {
        title: "Continue writing",
        command: "continue writing",
        icon: PencilLineIcon,
      },
    ],
  },
];

export const AiSelector = ({ editor }: { editor: Editor }) => {
  const handleCommandClick = (command: string) => {
    editor.chain().focus().aiCompletion({ command }).run();
  };

  return (
    <Menu>
      <MenuTrigger>
        <MenuButton
          appearance="subtle"
          style={{
            color: "var(--primary)",
            paddingRight: 0,
          }}
          icon={<Sparkle20Regular />}
          menuIcon={<span></span>}
        >
          AI Tools
          <ChevronDown12Regular
            style={{
              marginLeft: "0.6rem",
            }}
          />
        </MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {items.map((item, i) => {
            return (
              <MenuGroup key={i}>
                <MenuGroupHeader>{item.group}</MenuGroupHeader>
                {item.commands.map((c, j) => {
                  return (
                    <MenuItem
                      key={j}
                      onClick={() => {
                        handleCommandClick(c.command);
                      }}
                      icon={
                        <c.icon
                          size={16}
                          style={{
                            color: "var(--primary)",
                          }}
                        />
                      }
                    >
                      <Text size={200} weight="medium">
                        {c.title}
                      </Text>
                    </MenuItem>
                  );
                })}
              </MenuGroup>
            );
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
