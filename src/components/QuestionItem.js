import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [updatedCorrectIndex, setUpdatedCorrectIndex] = useState(correctIndex);

  const handleUpdateCorrectIndex = () => {

    setUpdatedCorrectIndex(updatedCorrectIndex);

    // Make the PATCH request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: updatedCorrectIndex,
      }),
    })
      .then(() => {

        onUpdateCorrectIndex(id, updatedCorrectIndex);
      })
      .catch((error) => {

        console.error("Error updating correct answer:", error);
        setUpdatedCorrectIndex(correctIndex);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={updatedCorrectIndex}
          onChange={(e) => setUpdatedCorrectIndex(parseInt(e.target.value, 10))}
          onBlur={handleUpdateCorrectIndex}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
