import React from "react";
import "./blockexcercise.css";
import { StartPractice } from "../../Api/lesson";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BlockExcercise = (props) => {
  const { id, content, exNo } = props;
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await StartPractice(id);
      if (res.resultCode === 0) {
        if (sessionStorage.key("currentPractice") == null) {
          sessionStorage.setItem("currentPractice", res.data);
        } else {
          sessionStorage.removeItem("currentPractice");
          sessionStorage.setItem("currentPractice", res.data);
        }
        navigate(`/lessons/${id}`);
        toast.success("Bắt đầu làm bài");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="block-excercise">
      <h1>
        Bài {exNo}: {content}
      </h1>
      <a onClick={handleClick} className="arrow-right">
        &gt;
      </a>
    </div>
  );
};

export default BlockExcercise;
