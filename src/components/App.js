import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setPage("List");
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== questionId);
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectIndex = (questionId, updatedCorrectIndex) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            correctIndex: updatedCorrectIndex,
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectIndex={handleUpdateCorrectIndex}
        />
      )}
    </main>
  );
}

export default App;
