import React, { useEffect, useState } from "react";
import QuestionContainer from "../../Components/QuestionContainer/QuestionContainer";
import { useNavigate, useParams } from "react-router-dom";
import { GetExcerciseById } from "../../Api/lesson";
const LearnContainer = () => {
  const [questions, setQuestions] = useState(null);
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const initial = async () => {
    try {
      var res = await GetExcerciseById(lessonId);
      if (res.resultCode === 0) {
        setQuestions(res.data);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!sessionStorage.getItem("currentPractice")) {
      navigate("/home");
    } else {
      initial();
    }
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "Bạn đang làm bài, bạn có chắc chắn muốn rời khỏi trang?";
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="learn-container">
      {questions && <QuestionContainer questions={questions} />}
    </div>
  );
};

export default LearnContainer;
