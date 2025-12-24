import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT =
  "position title: {positionTitle}, Depending on position title give me 5-7 bullet points for my resume experience. Please do not add experience level and do not return JSON. Return valid HTML only.";

function RichTextEditor({
  defaultValue,
  onRichTextEditorChange,
  positionTitle,   // ✅ receive title directly
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    if (!positionTitle?.trim()) {
      toast("Please add Position Title first");
      return;
    }

    try {
      setLoading(true);

      const prompt = PROMPT.replace("{positionTitle}", positionTitle);

      const result = await AIChatSession.sendMessage(prompt);

      const html = result.response.text();

      setValue(html);
      onRichTextEditorChange(html);
    } catch (error) {
      console.error(error);
      toast("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs font-medium">Summary</label>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            const html = e.target.value;
            setValue(html);
            onRichTextEditorChange(html);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
