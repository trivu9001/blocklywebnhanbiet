import React from "react";
import { Link } from "react-router-dom";
const BlockLesson = (props) => {
  const { id, content, title, imageDetailTopic, tag, topicName } = props;
  const currentState = {
    detailTopicId: id,
    topicName: topicName,
  };
  return (
    <div className="box">
      <div className="image">
        <img src={require(`../../images/${imageDetailTopic}`)} alt="Pets" />
      </div>
      <div className="content">
        <span>{tag}</span>
        <h3>{content}</h3>
        <p>{title}</p>
        <Link to="lessons" state={currentState} className="btn">
          Học ngay
        </Link>
        <div className="icons">
          <a>
            <i className="fas fa-book" /> 12 bài
          </a>
          <a>
            <i className="fas fa-clock" /> 8 giờ
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlockLesson;
