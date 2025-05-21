// src/components/JDViewer.tsx
import { useState } from "react";
import { mockJD } from "../../mockData";

export default function JDViewer() {
  const [jd, setJD] = useState(mockJD);

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...jd.requirements];
    updatedRequirements[index] = value;
    setJD({ ...jd, requirements: updatedRequirements });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">{jd.title}</h2>
      <ul className="list-disc pl-5">
        {jd.requirements.map((req, idx) => (
          <li key={idx}>
            <input
              type="text"
              value={req}
              onChange={(e) => handleRequirementChange(idx, e.target.value)}
              className="border-b border-gray-300 focus:outline-none"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
