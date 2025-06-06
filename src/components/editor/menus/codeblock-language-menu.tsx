import { Combobox, makeStyles, Option } from "@fluentui/react-components";
import { Editor } from "@tiptap/core";
import { FloatingMenu, useEditorState } from "@tiptap/react";
import { common } from "lowlight";
import { useMemo, useState } from "react";

const useStyles = makeStyles({
  root: {
  },
});

export const CodeBlockLanguageMenu = ({
  editor,
}: {
  editor: Editor | null;
}) => {
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([""]);
  const [value, setValue] = useState("");

  const editorState = useEditorState({
    editor,
    selector: (instance) => ({
      getLanguage: instance.editor?.getAttributes("codeBlock").language,
    }),
  });

  const languages = useMemo(() => {
    const list: string[] = [];
    for (const l in common) {
      list.push(l);
    }
    return list;
  }, []);

  if (!editor || !editorState) {
    return null;
  }
  interface OptionSelectData {
    selectedOptions: string[];
    optionText?: string;
  }

  const onOptionSelect = (
    ev: React.SyntheticEvent<HTMLElement, Event>,
    data: OptionSelectData
  ) => {
    console.log(ev);
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? "");
  };

  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        placement: "top-end",
        appendTo: "parent",
        duration: 200,
        zIndex: 1,
        // offset: [0, 8],
        getReferenceClientRect: () => {
          const { ranges } = editor.state.selection;
          const from = Math.min(...ranges.map((range) => range.$from.pos));
          const to = Math.max(...ranges.map((range) => range.$to.pos));

          let nodePos: number | undefined = undefined;

          editor.state.doc.nodesBetween(from, to, (node, p) => {
            if (node.type.name !== "codeBlock") {
              return;
            }

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
        return editor.isActive("codeBlock");
      }}
    >
      <div className={styles.root}>
        {editorState.getLanguage && (
          <Combobox
            key={Math.random()}
            defaultValue={editorState.getLanguage}
            selectedOptions={selectedOptions}
            onInput={onInput}
            appearance="filled-darker"
            onOptionSelect={onOptionSelect}
          >
            {languages.map((l, i) => {
              return (
                <Option
                  key={i}
                  value={l}
                  disabled={l === value}
                  onClick={() => {
                    editor
                      .chain()
                      .focus(undefined, { scrollIntoView: true })
                      .toggleCodeBlock({ language: l })
                      .run();
                  }}
                >
                  {l}
                </Option>
              );
            })}
          </Combobox>
        )}
      </div>
    </FloatingMenu>
  );
};
