import React from "react";

function SkillsPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#1a3d63";

  
  const skills =
    resumeInfo?.skills?.filter(
      (skill) => skill?.name && skill.name.trim() !== ""
    ) || [];

  
  if (!skills.length) return null;

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Skills
      </h2>

      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4"
          >
            
            <h2 className="text-sm font-bold w-32 truncate">
              {skill.name}
            </h2>

      
            {skill.rating > 0 && (
              <div className="h-2 bg-gray-200 w-[120px] rounded overflow-hidden">
                <div
                  className="h-2 rounded"
                  style={{
                    backgroundColor: themeColor,
                    width: `${(skill.rating / 5) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
