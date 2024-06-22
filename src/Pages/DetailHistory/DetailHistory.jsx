import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./detailhistory.css";
import toast from "react-hot-toast/headless";
import { GetDetailHistoryById } from "../../Api/history";
import { GetExcerciseById } from "../../Api/lesson";
import BlocklyComponent from "../../Components/Blockly/Blockly";
import Question from "../../Components/Question/Question";
const DetailHistory = () => {
  const [histories, setHistories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentHisQuestion, setCurrentHisQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [number, setNumber] = useState(1);
  const location = useLocation();
  const { hisId, exId } = location.state;

  const initial = async () => {
    try {
      const historyRes = await GetDetailHistoryById(hisId);
      const exerciseRes = await GetExcerciseById(exId);
      if (historyRes.resultCode === 0 && exerciseRes.resultCode === 0) {
        setHistories(historyRes.data);
        setQuestions(exerciseRes.data);
      } else {
        toast.error(historyRes.message || exerciseRes.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickQuestion = (number, questionId) => {
    const selectedQuestion = questions.find((q) => q.id === questionId);
    const currentHistory = histories.find(
      (history) => history.iD_DetailExQuest === questionId
    );
    setCurrentQuestion(selectedQuestion);
    setCurrentHisQuestion(currentHistory);
    setNumber(number);
  };

  useEffect(() => {
    initial();
  }, []);
  useEffect(() => {
    // Chỉ gọi handleClickQuestion sau khi dữ liệu đã được tải
    if (histories.length > 0 && questions.length > 0) {
      handleClickQuestion(1, questions[0].id);
    }
  }, [histories, questions]);
  return (
    <div className="detail-history-container">
      {histories ? (
        <>
          <div className="col-left">
            <div className="blockly-container">
              {currentHisQuestion && currentQuestion && (
                <BlocklyComponent
                  toolbox={currentQuestion.toolbox}
                  workspace={currentHisQuestion.answerHistory}
                  setWorkspaceReady={() => {}}
                />
              )}
            </div>
          </div>
          <div className="col-right">
            <div className="number-container">
              {questions.map((question, index) => {
                const isCompleted = histories.some(
                  (history) => history.iD_DetailExQuest === question.id
                );
                return (
                  <button
                    key={index}
                    className={`btn-number ${
                      number === index + 1 ? "active" : ""
                    } ${!isCompleted ? "disable" : ""}`}
                    onClick={() => handleClickQuestion(index + 1, question.id)}
                    disabled={!isCompleted}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            {currentQuestion && <Question question={currentQuestion} />}
          </div>
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
};

export default DetailHistory;
