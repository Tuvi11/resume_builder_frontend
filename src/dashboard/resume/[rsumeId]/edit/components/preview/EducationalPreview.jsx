import React from "react";

function EducationalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#1a3d63";

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Education
      </h2>

      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">
            {education?.universityName}
          </h2>

          <h2 className="text-xs flex justify-between">
            <span>
              {education?.degree} in {education?.major}
            </span>
            <span>{education?.startDate}</span>
          </h2>

          <p className="text-xs my-2">
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
