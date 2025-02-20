import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectIndex }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}
            onUpdateCorrectIndex={onUpdateCorrectIndex}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
