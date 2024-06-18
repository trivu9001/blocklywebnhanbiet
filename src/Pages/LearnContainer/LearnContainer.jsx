import React, { useEffect, useState } from "react";
import QuestionContainer from "../../Components/QuestionContainer/QuestionContainer";
import { useParams } from "react-router-dom";
import { GetExcerciseById } from "../../Api/lesson";
const LearnContainer = () => {
  const [questions, setQuestions] = useState(null);
  const { lessonId } = useParams();
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
    initial();
  }, []);
  return (
    <div className="learn-container">
      {questions && <QuestionContainer questions={questions} />}
    </div>
  );
};

export default LearnContainer;
