interface Props {
  score: number; // giá trị từ 0–100
}

export default function ScoreChart({ score }: Props) {
  const percentage = Math.min(Math.max(score, 0), 100); // giới hạn trong 0–100

  return (
    <div className="w-32 h-32">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          className="text-gray-200"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="text-blue-500"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text x="18" y="20.35" className="text-center text-sm fill-gray-800" textAnchor="middle">
          {percentage}%
        </text>
      </svg>
    </div>
  );
}
