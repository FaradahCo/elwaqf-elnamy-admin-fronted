import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "أدخل المحتوى...",
  minHeight = "300px",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
        dir: "rtl",
      },
    },
  });

  React.useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const Toolbar = () => (
    <div
      className="border-b border-gray-200 p-2 flex flex-wrap gap-2"
      dir="rtl"
    >
      {/* Headings */}
      <select
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level === 0) {
            editor.chain().focus().clearNodes().run();
          } else {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
              .run();
          }
        }}
        className="border border-gray-300 rounded px-2 py-1"
        value={
          editor.isActive("heading", { level: 1 })
            ? 1
            : editor.isActive("heading", { level: 2 })
            ? 2
            : editor.isActive("heading", { level: 3 })
            ? 3
            : editor.isActive("heading", { level: 4 })
            ? 4
            : editor.isActive("heading", { level: 5 })
            ? 5
            : editor.isActive("heading", { level: 6 })
            ? 6
            : 0
        }
      >
        <option value={0}>عادي</option>
        <option value={1}>عنوان 1</option>
        <option value={2}>عنوان 2</option>
        <option value={3}>عنوان 3</option>
        <option value={4}>عنوان 4</option>
        <option value={5}>عنوان 5</option>
        <option value={6}>عنوان 6</option>
      </select>

      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("strike") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        <s>S</s>
      </button>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        • قائمة
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        1. قائمة
      </button>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        ←
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        ↔
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        →
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt("أدخل الرابط:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`px-3 py-1 border border-gray-300 rounded ${
          editor.isActive("link") ? "bg-gray-200" : ""
        }`}
        type="button"
      >
        🔗 رابط
      </button>

      {/* Image */}
      <button
        onClick={() => {
          const url = window.prompt("أدخل رابط الصورة:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="px-3 py-1 border border-gray-300 rounded"
        type="button"
      >
        🖼️ صورة
      </button>

      {/* Clear Formatting */}
      <button
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        className="px-3 py-1 border border-gray-300 rounded"
        type="button"
      >
        🧹 تنظيف
      </button>
    </div>
  );

  return (
    <div
      className="border border-gray-300 rounded"
      style={{ minHeight, marginBottom: "50px" }}
      dir="rtl"
    >
      <Toolbar />
      <EditorContent editor={editor} />
      <style>{`
        .ProseMirror {
          outline: none;
          min-height: 300px;
          padding: 1rem;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: right;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
