const QuestionItem = ({ question, numbering, addQuestion, deleteQuestion, updateQuestion, renderQuestions }) => {
  const questionNumber = numbering ? `${numbering}.${question.index}` : `Q${question.index}`; // Question numbering

  return (
    <div className={`ml-${numbering ? "5" : "0"} mb-5 p-4 border rounded`}>
      <div className="flex gap-4 items-center mb-3">
        <span>{questionNumber}</span>
        <input
          type="text"
          placeholder="Enter question"
          value={question.text}
          className="border p-2 flex-grow"
          onChange={(e) => updateQuestion(question.id, "text", e.target.value)} // Updates question text
        />
        <select
          value={question.type}
          className="border p-2"
          onChange={(e) => updateQuestion(question.id, "type", e.target.value)} // Updates question type
        >
          <option value="Short Answer">Short Answer</option>
          <option value="True/False">True/False</option>
        </select>
        {/* Displays 2 options(True or False) for True/False questions */}
        {question.type === "True/False" && (
          <select
            value={question.answer}
            className="border p-2"
            onChange={(e) => updateQuestion(question.id, "answer", e.target.value)}
          >
            <option value="">Select Answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        )}
        {/* Displays Add Child button only for True/False questions with True as the answer */}
        {question.type === "True/False" && question.answer === "True" && (
          <button className="bg-blue-500 text-white p-2 rounded" onClick={() => addQuestion(question.id)}>
            Add Child
          </button>
        )}
        <button className="bg-red-500 text-white p-2 rounded" onClick={() => deleteQuestion(question.id)}>
          Delete
        </button>
      </div>
      {/* Recursive rendering of child questions */}
      {question.children && renderQuestions(question.children, questionNumber)}
    </div>
  );
};

export default QuestionItem;
