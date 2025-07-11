import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table, { createColGroup } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { DOMOutputSpec } from "@tiptap/pm/model";
import StarterKit from "@tiptap/starter-kit";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import { Markdown } from "tiptap-markdown";
import { AiPlaceholder } from "./extensions/ai-placeholder";
import { AiWriter } from "./extensions/ai-writer";
import { CustomCodeBlock } from "./extensions/code-block";
import { Mathematics } from "./extensions/mathematics";
import { common, createLowlight } from "lowlight";
import Color from '@tiptap/extension-color'


const TiptapStarterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn("border-l-4 border-gray-600"),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cn(
        "rounded-lg bg-muted text-red-700 dark:bg-muted/90 dark:text-red-400 px-1.5 py-1 font-mono font-medium before:content-none after:content-none"
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: cn("my-4 bg-border border-border"),
    },
  },
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  history: {
    depth: 10,
    newGroupDelay: 1000
  },
  // gapcursor: false,
  heading: false,
});

const TiptapHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    if (node.textContent) {
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          id: node.textContent.replaceAll(/\s+/g, "-").toLowerCase(),
        }),
        0,
      ];
    }
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cn("text-foreground rounded p-1 hover:bg-accent cursor-pointer"),
  },
});

const lowlight = createLowlight(common);
const codeBlock = CustomCodeBlock.configure({
  HTMLAttributes: {
    class: cn(
      "rounded-lg !bg-gray-800 dark:!bg-gray-900 text-gray-200 border p-5 font-mono font-medium"
    ),
    spellcheck: false,
  },
  defaultLanguage: "xml",
  lowlight: lowlight
});

const TiptapTextAlign = TextAlign.configure({
  types: ["heading", "paragraph", "math"],
});

const TiptapTable = Table.extend({
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(
      node,
      this.options.cellMinWidth
    );

    const table: DOMOutputSpec = [
      "div",
      {
        class: "table-wrapper overflow-y-auto my-[1em] not-draggable",
      },
      [
        "table",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: tableWidth
            ? `width: ${tableWidth}`
            : `minWidth: ${tableMinWidth}`,
        }),
        colgroup,
        ["tbody", 0],
      ],
    ];

    return table;
  },
}).configure({
  HTMLAttributes: {
    class: cn("not-prose table-auto border-collapse w-full"),
  },
  lastColumnResizable: false,
  allowTableNodeSelection: true,
});

const TiptapTableHeader = TableHeader.configure({
  HTMLAttributes: {
    class: cn(
      "bg-muted dark:bg-gray-900 border border-default p-2 text-start min-w-[150px] font-semibold"
    ),
  },
});

const TiptapTableCell = TableCell.configure({
  HTMLAttributes: {
    class: cn("border border-default p-2 min-w-[150px] align-middle"),
  },
});

const TiptapLink = Link.configure({
  HTMLAttributes: {
    class: cn(
      "relative text-blue-600 transition duration-300 before:absolute before:inset-x-0 before:-bottom-1 before:h-0.5 before:origin-left before:scale-x-0 before:bg-blue-600 hover:before:scale-x-100 before:transition-transform"
    ),
  },
  openOnClick: false,
  autolink: true,
  defaultProtocol: 'https',
  protocols: ['ftp', 'mailto', 'http','https'],
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false
      }

      // disallowed protocols
      const disallowedProtocols = ['file']
      const protocol = parsedUrl.protocol.replace(':', '')

      if (disallowedProtocols.includes(protocol)) {
        return false
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

      if (!allowedProtocols.includes(protocol)) {
        return false
      }

      // disallowed domains
      const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
      const domain = parsedUrl.hostname

      if (disallowedDomains.includes(domain)) {
        return false
      }

      // all checks have passed
      return true
    } catch {
      return false
    }
  },
  shouldAutoLink: url => {
    try {
      // construct URL
      const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

      // only auto-link if the domain is not in the disallowed list
      const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
      const domain = parsedUrl.hostname

      return !disallowedDomains.includes(domain)
    } catch {
      return false
    }
  }
});

const TiptapImage = Image.configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cn("rounded border mx-auto"),
  },
});

const DragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 25,
  excludedTags: ["table"],
});

const aiPlaceholder = AiPlaceholder.configure({
  HTMLAttributes: {
    class: cn("!text-muted-foreground not-draggable"),
  },
});

const aiWriter = AiWriter.configure({
  HTMLAttributes: {
    class: cn("py-3 px-1 select-none"),
  },
});

const markdown = Markdown.configure({
  html: true,
});

const TiptapYoutube = Youtube.configure({
  HTMLAttributes: {
    class: cn("border border-muted"),
  },
  nocookie: true,
});

const TiptapCharacterCount = CharacterCount;

// const selection = Selection.configure({
//   HTMLAttributes: {
//     class: "selection",
//   },
// });

export const defaultExtensions = [
  TiptapStarterKit,
  TiptapHeading,
  TiptapTextAlign,
  TiptapTable,
  TiptapTableHeader,
  TableRow,
  TiptapTableCell,
  TiptapLink,
  TiptapYoutube,
  TiptapCharacterCount,
  TiptapImage,
  Underline,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
  Color,
  mathematics,
  codeBlock,
  DragHandle,
  aiPlaceholder,
  aiWriter,
  markdown,
];
