import React from "react";

function QuestionItem({ question, onDeleteQuestion, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    onDeleteQuestion(id)
  }

  function handleChangeAnswer(e,id) {
    console.log(e.target.value, id)
    let newIndex = e.target.value
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex:newIndex
      })
    })
    .then(res => res.json())
    .then(data => onChangeAnswer(data.id, data.correctIndex))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => handleChangeAnswer(e,id)} >{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;