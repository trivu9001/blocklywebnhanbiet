import React, { useEffect, useState, useRef } from "react";
import Question from "../Question/Question";
import "./questioncontainer.css";
import BlocklyContainer from "../BlocklyContainer/BlocklyContainer";
import { CheckAnswer, EndPractice } from "../../Api/lesson";
import toast from "react-hot-toast";
import { save } from "../../BlocklyJS/serialization";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const QuizQuestContainer = (props) => {
  const { quizzes } = props;
  const [number, setNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [completed, setCompleted] = useState([]);
  const workspaceRef = useRef(null);

  const navigate = useNavigate();
  const handleCheckAnswer = () => {
    if (currentQuestion.typeCheck === 1) {
      if (workspaceRef.current) {
        var blocks = workspaceRef.current.getAllBlocks();
        var answerData = null;
        blocks.forEach(async (block) => {
          var answerBlock = block.getInputTargetBlock("ANSWER");
          if (answerBlock) {
            var answerValue = answerBlock.getFieldValue("check");

            var currentQuizz = sessionStorage.getItem("currentQuizz");
            answerData = {
              blockQuestId: currentQuestion.id,
              ans: answerValue.toString(),
              blockAns: answerBlock.type,
              hisId: currentQuizz,
              state: save(workspaceRef.current),
            };
            fetchSubmitAnswer(answerData);
          } else {
            //toast.error("Sai rồi");
          }
        });
      }
    }
    if (currentQuestion.typeCheck == 3) {
      console.log("Type check:", currentQuestion.typeCheck);
      if (workspaceRef.current) {
        var blocks = workspaceRef.current.getAllBlocks();
        var answerData = null;
        console.log("Blockquest_Name:", currentQuestion.blockQuestType);
        blocks.forEach(async (block) => {
          if (block.type == currentQuestion.blockQuestType) {
            var answerBlock = block.getInputTargetBlock("Answer");
            console.log("Type check:", answerBlock);
            if (answerBlock) {
              var answerType = answerBlock.type;
              var currentQuizz = sessionStorage.getItem("currentQuizz");
              answerData = {
                blockQuestId: currentQuestion.id,
                ans: answerType,
                blockAns: answerBlock.type,
                hisId: currentQuizz,
                state: save(workspaceRef.current),
              };
              fetchSubmitAnswer(answerData);
            } else {
              //toast.error("Sai rồi");
            }
          }
        });
      }
    }
    if (currentQuestion.typeCheck === 2) {
      if (workspaceRef.current) {
        var blocks = workspaceRef.current.getAllBlocks();
        var answerData = null;
        blocks.forEach(async (block) => {
          if (block.type == currentQuestion.Blockquest_Name) {
            var answerBlock = block.getInputTargetBlock("ANSWER");
            if (answerBlock) {
              var answerType = answerBlock.type;
              var currentQuizz = sessionStorage.getItem("currentQuizz");
              answerData = {
                blockQuestId: currentQuestion.id,
                ans: answerType,
                blockAns: answerBlock.type,
                hisId: currentQuizz,
                state: save(workspaceRef.current),
              };
              fetchSubmitAnswer(answerData);
            } else {
              //toast.error("Sai rồi");
            }
          }
        });
      }
    }
  };
  const handleClickQuestion = (index, id) => {
    if (completed.includes(index - 1) || index === 1) {
      setNumber(index);
      const quizz = quizzes.find((q) => {
        return q.id === id;
      });
      setCurrentQuestion(quizz);
    } else {
      alert("Vui lòng hoàn thành câu hiện tại");
    }
  };
  const fetchSubmitAnswer = async (answer) => {
    try {
      var res = await CheckAnswer(answer);
      if (res.data === true) {
        localStorage.setItem(`workspace_${currentQuestion.id}`, answer.state);
        setCompleted([...completed, number]);
        toast.success("Chính xác!!!");
        if (number < quizzes.length) {
          setNumber(number + 1);
          setCurrentQuestion(quizzes[number]);
        } else {
          toast.success("Hoàn thành hết câu hỏi");
          submitPractice(quizzes.length);
        }
      } else {
        toast.error("Sai rồi!!!");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const submitPractice = async (completedQuestion, type = null) => {
    if (type === "autoSubmit") {
      completedQuestion = completed.length;
    }
    try {
      var hisId = sessionStorage.getItem("currentQuizz");
      const res = await EndPractice(hisId, completedQuestion);
      if (res.resultCode === 0) {
        toast.success("Nộp bài thành công");
        quizzes.forEach((question) => {
          localStorage.removeItem(`workspace_${question.id}`);
        });
        sessionStorage.removeItem("currentQuizz");
        navigate("/historyQuizz");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const autoSubmit = async () => {
    try {
      handleCheckAnswer();
      var hisId = sessionStorage.getItem("currentQuizz");
      const res = await EndPractice(hisId, completed.length);
      if (res.resultCode === 0) {
        toast.success("Nộp bài thành công");
        quizzes.forEach((question) => {
          localStorage.removeItem(`workspace_${question.id}`);
        });
        sessionStorage.removeItem("currentQuizz");
        navigate("/historyQuizz");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (quizzes !== null) {
      setCurrentQuestion(quizzes[0]);
    }
  }, [quizzes]);
  useEffect(() => {
    if (completed.includes(number)) {
      const workspaceAnswer = localStorage.getItem(
        `workspace_${currentQuestion.id}`
      );
      setCurrentQuestion((prev) => ({
        ...prev,
        workspaceQuestion: workspaceAnswer,
      }));
    }
  }, [number]);
  return (
    <div className="question-container">
      <div className="col-left">
        {currentQuestion && (
          <BlocklyContainer
            toolbox={currentQuestion ? currentQuestion.toolbox : null}
            workspace={
              currentQuestion ? currentQuestion.workspaceQuestion : null
            }
            setWorkspaceReady={(workspace) => {
              workspaceRef.current = workspace;
            }}
            answerType={currentQuestion ? currentQuestion.blockQuestType : null}
          />
        )}
      </div>
      <div className="col-right">
        <div>
          <CountdownTimer
            initialHours={0}
            initialMinutes={2}
            initialSeconds={0}
            callback={() => autoSubmit()}
          />
          {/* Example: 5 minutes countdown */}
        </div>
        <div className="number-container">
          {quizzes &&
            quizzes.map((question, index) => {
              const i = ++index;
              return (
                <button
                  key={index}
                  className={`btn-number ${number === i ? "active" : ""} ${
                    i !== 1 && !completed.includes(i - 1) ? "disable" : ""
                  }`}
                  onClick={() => handleClickQuestion(i, question.id)}
                  disabled={i !== 1 && !completed.includes(i - 1)}
                >
                  {i}
                </button>
              );
            })}
        </div>
        {!completed.includes(number) && (
          <button onClick={handleCheckAnswer} className="check-answer">
            Kiểm tra kết quả
          </button>
        )}

        {/* <button onClick={handleCheckAnswer} className="check-answer">
          Kiểm tra kết quả
        </button> */}
        {currentQuestion && <Question question={currentQuestion} />}
      </div>
    </div>
  );
};

export default QuizQuestContainer;
