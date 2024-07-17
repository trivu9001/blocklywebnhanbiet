import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StartPractice } from "../../Api/lesson";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BlockQuizz = (props) => {
  const { question, index, id, isComplete } = props;
  // const { id, content, exNo, isCompleted } = props;
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await StartPractice(id);
      if (res.resultCode === 0) {
        if (sessionStorage.key("currentQuizz") == null) {
          sessionStorage.setItem("currentQuizz", res.data);
        } else {
          sessionStorage.removeItem("currentQuizz");
          sessionStorage.setItem("currentQuizz", res.data);
        }
        navigate(`/QuizContainer/${id}`);
        toast.success("Bắt đầu làm bài");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="box">
      <div className="image">
        <img src={require("../../images/blog-1.jpg")} alt="" />
      </div>

      <div className="content">
        <div className="icons">
          <p>
            <i className="fas fa-clock" /> Ngày 12 tháng 5 năm 2024
          </p>
          <p>
            <i className="fas fa-user" /> bởi admin
          </p>
        </div>
        <h3>
          Đề {index}: {question}
        </h3>
        <p>learning is what makes you perfect</p>
        {/* {isComplete === true ? (
          <p>Đã làm</p>
        ) : (
          // <Link className="btn" onClick={handleClick}>
          //   Làm quiz
          // </Link>
          <button onClick={handleClick}>Làm quiz</button>
        )} */}
        <button onClick={handleClick}>Làm quiz</button>
        {/* <Link className="btn" onClick={handleClick}>
          Làm đề
        </Link> */}
      </div>
    </div>
  );
};

export default BlockQuizz;
