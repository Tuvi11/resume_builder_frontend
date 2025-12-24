import React, { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#E63946", "#FF006E", "#D62828",
    "#F77F00", "#FFBE0B", "#F4A261",
    "#2A9D8F", "#06D6A0", "#4CAF50",
    "#1D3557", "#0077B6", "#4D96FF",
    "#6A4C93", "#8338EC", "#9B5DE5",
    "#495057", "#212529", "#8D99AE",
    "#FFD166", "#EF476F",
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  const { resumeId } = useParams();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(() => {
      toast("Theme Color Updated");
      setOpen(false);
    });
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        className="flex gap-2"
        onClick={() => setOpen(!open)}
      >
        <LayoutGrid /> Theme
      </Button>

      {/* Popover */}
      {open && (
        <div className="absolute  right-[-40px] mt-2 z-50 w-56 rounded-md border bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>

          <div className="grid grid-cols-5 gap-3">
            {colors.map((item, index) => (
              <div
                key={index}
                onClick={() => onColorSelect(item)}
                className={`h-5 w-5 rounded-full cursor-pointer border
                  hover:border-black
                  ${selectedColor === item ? "border-black" : "border-gray-300"}
                `}
                style={{ background: item }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeColor;
