// src/components/common/ScoreChart.tsx
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number; // 0–100
}

export default function ScoreChart({ score }: Props) {
  const percentage = Math.min(Math.max(score, 0), 100);

  return (
    <div className="w-24 h-24 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#1f2937", // text-gray-800
          pathColor: "#3b82f6", // blue-500
          trailColor: "#e5e7eb", // gray-200
          textSize: "24px",
        })}
      />
    </div>
  );
}
