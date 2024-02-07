"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function MessageFormTextArea(props: { setContent: any }) {
  const extensions = [StarterKit];

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
  });

  return (
    <EditorContent editor={editor} className="w-[1450px] border-gray-500" />
  );
}
