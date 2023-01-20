import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function onAddQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
  }

  function onDeleteQuestion(id) {
    const filterQuestions = questions.filter((question) => question.id !== id);
    setQuestions(filterQuestions);
  }

  function onChangeAnswer(id, correctIndex) {
    const updatedAnswer = questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex };
      } else {
        return question;
      }
    });
    setQuestions(updatedAnswer)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleAddQuestion={onAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={onDeleteQuestion}
          onChangeAnswer={onChangeAnswer}
        />
      )}
    </main>
  );
}

export default App;