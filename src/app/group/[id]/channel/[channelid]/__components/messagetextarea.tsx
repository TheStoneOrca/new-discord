"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function MessageFormTextArea(props: { setContent: any }) {
  const extensions = [StarterKit];

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
  });

  return (
    <EditorContent editor={editor} className="w-[1450px] border-gray-500" />
  );
}
