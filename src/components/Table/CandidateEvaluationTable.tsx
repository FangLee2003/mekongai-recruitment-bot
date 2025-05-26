interface EvaluationCriterion {
    criterion: string;
    description: string;
    weight: number;
    score: number;
    analysis: string;
}

interface Props {
    evaluate: EvaluationCriterion[];
}

export default function CandidateEvaluationTable({ evaluate }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-700 text-white select-none">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold">Tiêu chí</th>
                        <th className="px-6 py-3 text-left font-semibold">Mô tả tiêu chí</th>
                        <th className="px-6 py-3 text-center font-semibold">Điểm tối đa</th>
                        <th className="px-6 py-3 text-center font-semibold">Điểm</th>
                        <th className="px-6 py-3 text-left font-semibold">Đánh giá ứng viên</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluate.map((item, idx) => (
                        <tr
                            key={idx}
                            className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100`}
                        >
                            <td className="px-6 py-4 font-semibold text-blue-700 align-top whitespace-normal">
                                {item.criterion}
                            </td>
                            <td className="px-6 py-4 align-top whitespace-pre-wrap">{item.description}</td>
                            <td className="px-6 py-4 text-center align-top">{item.weight}</td>
                            <td className="px-6 py-4 text-center align-top">{item.score}</td>
                            <td className="px-6 py-4 align-top whitespace-pre-wrap">{item.analysis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
