"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardTitle } from "@/components/ui/card";
import DeleteMessage from "@/actions/deletemessage";
import UpdateMessage from "@/actions/updatemessage";

export default function EditMessageMenu(props: {
  messageid: number;
  messagetext: string;
}) {
  const [editInput, showInput] = useState<boolean>();
  const [inputText, EditText] = useState<string>();
  const [error, setError] = useState<string>();
  const extensions = [StarterKit];

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      EditText(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "bg-white text-black",
      },
    },
    content: props.messagetext,
  });

  return (
    <div>
      {editInput && (
        <div className="flex justify-center">
          <Card>
            <CardTitle>Edit Your Message</CardTitle>
            <form
              action={(data) => {
                UpdateMessage(data).then((res) => {
                  if (res.errror) {
                    setError("Unexpected Error!");
                  } else {
                    window.location.reload();
                  }
                });
              }}
            >
              <Input type="hidden" value={inputText} name="messagetext" />
              <Input type="hidden" value={props.messageid} name="messageid" />

              <EditorContent editor={editor} />

              <Input type="submit" value="Edit" />
            </form>
          </Card>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 h-48">
          <DropdownMenuLabel>Message Details</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    showInput(!editInput);
                  }}
                >
                  Edit Message
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() =>
                  DeleteMessage({ messageid: props.messageid }).then((res) => {
                    if (res.error) {
                      setError("Unexpected Error");
                    } else {
                      window.location.reload();
                    }
                  })
                }
              >
                Delete Message
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {error && <h1>{error}</h1>}
    </div>
  );
}
