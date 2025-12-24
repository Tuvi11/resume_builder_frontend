import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [skillsList, setSkillsList] = useState([
    { name: "", rating: 0 },
  ]);

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (resumeInfo?.skills?.length) {
      setSkillsList(
        resumeInfo.skills.map((skill) => ({
          name: skill.name || "",
          rating: typeof skill.rating === "number" ? skill.rating : 0,
        }))
      );
    }
  }, []);

  const updatePreview = (updatedSkills) => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  
  const handleChange = (index, field, value) => {
    const updated = [...skillsList];
    updated[index][field] = value;
    setSkillsList(updated);
    updatePreview(updated);
  };

  const AddNewSkills = () => {
    const updated = [...skillsList, { name: "", rating: 0 }];
    setSkillsList(updated);
    updatePreview(updated);
  };

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      const updated = skillsList.slice(0, -1);
      setSkillsList(updated);
      updatePreview(updated);
    }
  };

  
  const onSave = () => {
    setLoading(true);

    const cleanSkills = skillsList.map(({ id, ...rest }) => rest);

    const data = {
      data: {
        skills: cleanSkills,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(() => {
        toast("Skills updated successfully!");
      })
      .catch(() => {
        toast("Server Error, Try again!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

 return (
  <div className="p-6 shadow-md rounded-xl border-t-4 border-primary mt-10 bg-white">
    <div className="mb-4">
      <h2 className="font-semibold text-xl">Skills</h2>
      <p className="text-sm text-gray-500">
        Add your professional skills and proficiency
      </p>
    </div>

    <div className="space-y-3">
      {skillsList.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
        >
          
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
            {index + 1}
          </div>

          
          <div className="flex-1">
            <label className="text-xs text-gray-500">Skill</label>
            <Input
              value={item.name}
              placeholder="e.g. React, Python, SQL"
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
            />
          </div>

          
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">Level</span>
            <Rating
              style={{ maxWidth: 110 }}
              value={item.rating ?? 0}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-between items-center mt-6">
      <div className="flex gap-2">
        <Button variant="outline" onClick={AddNewSkills}>
          + Add Skill
        </Button>
        <Button variant="outline" onClick={RemoveSkills}>
          − Remove
        </Button>
      </div>

      <Button onClick={onSave} disabled={loading}>
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Save Skills"
        )}
      </Button>
    </div>
  </div>
);

}

export default Skills;
