import React from "react";

function ExperiencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#1a3d63";

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Professional Experience
      </h2>

      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">
            {experience?.title}
          </h2>

          <h2 className="text-xs flex justify-between">
            <span>
              {[experience?.companyName, experience?.city, experience?.state]
                .filter(Boolean)
                .join(", ")}
            </span>

            <span>
              {experience?.startDate} - {experience?.endDate}
            </span>
          </h2>

          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{
              __html: experience?.workSummery || "",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
