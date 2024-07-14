import React from "react";
import "./question.css";
const Question = (props) => {
  const { question, checkanswer = false } = props;
  return (
    <div className="question">
      <div className="question-tags">
        {/* <span className="tag">{question.questionTags}</span> */}
        <span className="label">Mức độ : </span>
        <span
          className={`level ${
            question.typeof === "Green"
              ? "level-easy"
              : question.typeof === "Blue"
              ? "level-normal"
              : "level-hard"
          }`}
        >
          {question.typeof === "Green"
            ? "Dễ"
            : question.typeof === "Blue"
            ? "Bình thường"
            : "Khó"}
        </span>
        {checkanswer &&
          (checkanswer === true ? (
            <span className="label-checkanswer">Đã xem đáp án</span>
          ) : (
            <></>
          ))}
      </div>
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
