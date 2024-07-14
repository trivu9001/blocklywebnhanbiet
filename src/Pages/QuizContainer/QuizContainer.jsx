import React, { useEffect, useState } from "react";
import QuizQuestionContainer from "../../Components/QuizQuestionContainer/QuizQuestionContainer";
import { useNavigate, useParams } from "react-router-dom";
import { GetExcerciseById } from "../../Api/lesson";
const QuizContainer = () => {
  const [quizzes, setQuizzes] = useState(null);
  const { quizzId } = useParams();
  const navigate = useNavigate();

  const initial = async () => {
    try {
      var res = await GetExcerciseById(quizzId);
      if (res.resultCode === 0) {
        console.log(res);
        setQuizzes(res.data);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!sessionStorage.getItem("currentQuizz")) {
      navigate("/home");
    } else {
      initial();
    }
  }, []);

  return (
    <div className="learn-container">
      {quizzes && <QuizQuestionContainer quizzes={quizzes} />}
    </div>
  );
};

export default QuizContainer;
