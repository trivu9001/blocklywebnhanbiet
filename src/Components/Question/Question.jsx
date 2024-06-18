import React from "react";
import "./question.css";
const Question = (props) => {
  const { question } = props;
  return (
    <div className="question">
      <div className="question-body">
        <span className="label">Câu hỏi : </span>
        <span className="question-title">{question.questionName}</span>
      </div>
      <div className="question-image-container">
        <p>Hình ảnh minh họa:</p>
        <img src={require(`../../images/${question.imageEx}`)} alt="" />
      </div>
    </div>
  );
};

export default Question;
