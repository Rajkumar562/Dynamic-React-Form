import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";

const DynamicForm = () => {
  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("questions")) || []);
  const [submittedQuestions, setSubmittedQuestions] = useState(null);

  // Updates local storage when questions change
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  // Adds a new question or a child question
  const addQuestion = (parentId = null) => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "Short Answer",
      answer: "",
      children: [],
    };

    if (parentId === null) {
      setQuestions((prev) => [...prev, newQuestion]); // Add new parent question
    } else {
      const addNestedQuestion = (items) => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newQuestion] }; // Add child question
          }
          return { ...item, children: addNestedQuestion(item.children) }; // Recurse for nested questions
        });
      };
      setQuestions((prev) => addNestedQuestion(prev));
    }
  };

  // Deletes a question and its children recursively
  const deleteQuestion = (id) => {
    const deleteRecursively = (items) => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: deleteRecursively(item.children),
        }));
    };
    setQuestions((prev) => deleteRecursively(prev));
  };

  // Updates a question's property
  const updateQuestion = (id, key, value) => {
    const updateRecursively = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, [key]: value };
        }
        return { ...item, children: updateRecursively(item.children) };
      });
    };
    setQuestions((prev) => updateRecursively(prev));
  };

  // Handles form submission to generate a hierarchical view of questions
  const handleSubmit = () => {
    const renderHierarchy = (items, numbering = "") => {
      return items.map((item, index) => {
        const questionNumber = numbering ? `${numbering}.${index + 1}` : `Q${index + 1}`;
        return {
          questionNumber,
          text: item.text,
          children: renderHierarchy(item.children, questionNumber), // Recurse for child questions
        };
      });
    };

    setSubmittedQuestions(renderHierarchy(questions));
  };

  // Renders the submitted questions in a hierarchical list
  const renderSubmittedQuestions = (items) => {
    return (
      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item.questionNumber}>
            {item.questionNumber}: {item.text}
            {item.children && renderSubmittedQuestions(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-5">
      <h1 className="mb-5 text-3xl font-bold">Dynamic Form</h1>
      <button className="mb-5 bg-green-500 text-white p-2 rounded" onClick={() => addQuestion()}>
        Add New Question
      </button>
      <QuestionList
        questions={questions}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
        updateQuestion={updateQuestion}
      />
      <button className="mt-5 bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
        Submit
      </button>
      {submittedQuestions && (
        <div id="review-section" className="mt-10">
          <h2 className="text-lg font-semibold">Review Questions</h2>
          {renderSubmittedQuestions(submittedQuestions)}
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
