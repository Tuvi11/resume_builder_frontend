import React, { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import GlobalApi from './../../../../../../../service/GlobalApi';
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { AIChatSession } from "./../../../../../../../service/AIModal";

/* ================= AI PROMPT ================= */
const experiencePrompt =
  "Role: {title}{company}. Generate 3 to 5 strong resume bullet points in HTML <ul><li> format focusing on impact, skills, and results.";

/* ================= EMPTY FORM ================= */
const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experinceList, setExperinceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  /* ===== LOAD EXPERIENCE WHEN COMING BACK ===== */
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperinceList(resumeInfo.experience);
    }
  }, []);

  /* ===== HANDLE INPUT CHANGE ===== */
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updated = [...experinceList];
    updated[index][name] = value;

    setExperinceList(updated);
    setResumeInfo(prev => ({
      ...prev,
      experience: updated,
    }));
  };

  /* ===== HANDLE RICH TEXT CHANGE ===== */
  const handleRichTextEditor = (value, name, index) => {
    const updated = [...experinceList];
    updated[index][name] = value;

    setExperinceList(updated);
    setResumeInfo(prev => ({
      ...prev,
      experience: updated,
    }));
  };

  /* ===== ADD / REMOVE EXPERIENCE ===== */
  const AddNewExperience = () => {
    setExperinceList([...experinceList, { ...formField }]);
  };

  const RemoveExperience = () => {
    if (experinceList.length > 1) {
      setExperinceList(list => list.slice(0, -1));
    }
  };

  /* ===== SAVE TO BACKEND ===== */
  const onSave = () => {
    setLoading(true);

    const formattedExperience = experinceList.map(item => ({
      title: item.title?.trim() || "",
      companyName: item.companyName?.trim() || "",
      city: item.city?.trim() || "",
      state: item.state?.trim() || "",
      startDate: item.startDate || null,
      endDate: item.endDate || null,
      workSummery: item.workSummery || "",
    }));

    GlobalApi.UpdateResumeDetail(params.resumeId, {
      data: { experience: formattedExperience },
    })
      .then(() => toast("Experience details updated!"))
      .catch(() => toast("Server Error"))
      .finally(() => setLoading(false));
  };

  /* ===== AI GENERATE EXPERIENCE ===== */
  const generateExperienceFromAI = async (index) => {
    const exp = experinceList[index];

    if (!exp.title?.trim()) {
      toast("Please enter Position Title first");
      return;
    }

    setLoading(true);

    try {
      const companyPart = exp.companyName
        ? ` at ${exp.companyName}`
        : "";

      const PROMPT = experiencePrompt
        .replace("{title}", exp.title)
        .replace("{company}", companyPart);

      const result = await AIChatSession.sendMessage(PROMPT);

      const updated = [...experinceList];
      updated[index].workSummery = result.response.text();

      setExperinceList(updated);
      setResumeInfo(prev => ({
        ...prev,
        experience: updated,
      }));
    } catch (error) {
      console.error(error);
      toast("Failed to generate experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      {experinceList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
        >
          <div>
            <label>Position Title</label>
            <Input
              name="title"
              value={item.title}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div>
            <label>Company Name</label>
            <Input
              name="companyName"
              value={item.companyName}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div>
            <label>City</label>
            <Input
              name="city"
              value={item.city}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div>
            <label>State</label>
            <Input
              name="state"
              value={item.state}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div>
            <label>Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={item.startDate}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div>
            <label>End Date</label>
            <Input
              type="date"
              name="endDate"
              value={item.endDate}
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div className="col-span-2">
            <RichTextEditor
  defaultValue={item.workSummery}
  positionTitle={item.title}   // ✅ pass title directly
  onRichTextEditorChange={(value) =>
    handleRichTextEditor(value, "workSummery", index)
  }
/>

          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewExperience}>
            + Add More Experience
          </Button>
          <Button variant="outline" onClick={RemoveExperience}>
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
