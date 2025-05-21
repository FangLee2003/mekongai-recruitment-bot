interface Props {
  onAccept: () => void;
}

export default function Invitation({ onAccept }: Props) {
  const isInvited = localStorage.getItem("question_set_ready") === "true";

  if (!isInvited) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-1">
        🎉 Chúc mừng bạn đã vượt qua vòng 1!
      </h3>
      <p className="text-sm text-yellow-700 mb-2">
        Hệ thống AI đã đánh giá CV của bạn phù hợp với yêu cầu tuyển dụng. Vui lòng tham gia bài test hỏi đáp để đánh giá sâu hơn.
      </p>
      <button
        onClick={onAccept}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Bắt đầu bài test
      </button>
    </div>
  );
}
