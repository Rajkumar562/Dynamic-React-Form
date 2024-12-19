import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions, addQuestion, deleteQuestion, updateQuestion }) => {
  const renderQuestions = (items, numbering = "") => {
    return items.map((item, index) => (
      <QuestionItem
        key={item.id}
        question={{ ...item, index: index + 1 }}
        numbering={numbering}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
        updateQuestion={updateQuestion}
        renderQuestions={renderQuestions}
      />
    ));
  };

  return <div>{renderQuestions(questions)}</div>;
};

export default QuestionList;
