"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RulesForm({ setRules }: any) {
  const extensions = [StarterKit];
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      setRules(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
}
