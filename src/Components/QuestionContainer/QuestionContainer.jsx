import React, { useEffect, useState, useRef } from "react";
import Question from "../Question/Question";
import "./questioncontainer.css";
import BlocklyContainer from "../BlocklyContainer/BlocklyContainer";
import { CheckAnswer, EndPractice } from "../../Api/lesson";
import toast from "react-hot-toast";
import { save } from "../../BlocklyJS/serialization";
import { useNavigate } from "react-router-dom";

const QuestionContainer = (props) => {
  const { questions } = props;
  const [number, setNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [completed, setCompleted] = useState([]);
  const workspaceRef = useRef(null);

  const navigate = useNavigate();
  const handleCheckAnswer = () => {
    if (workspaceRef.current) {
      var blocks = workspaceRef.current.getAllBlocks();
      var answerData = null;
      blocks.forEach(async (block) => {
        var answerBlock = block.getInputTargetBlock("ANSWER");
        if (answerBlock) {
          var answerValue = answerBlock.getFieldValue("check");
          var currentPractice = sessionStorage.getItem("currentPractice");
          answerData = {
            blockQuestId: currentQuestion.id,
            ans: answerValue,
            blockAns: answerBlock.type,
            hisId: currentPractice,
            state: save(workspaceRef.current),
          };
          fetchSubmitAnswer(answerData);
        } else {
          //toast.error("Sai rồi");
        }
      });
    }
  };
  const handleClickQuestion = (index, id) => {
    if (completed.includes(index - 1) || index === 1) {
      setNumber(index);
      const question = questions.find((q) => {
        return q.id === id;
      });
      setCurrentQuestion(question);
    } else {
      alert("Vui lòng hoàn thành câu hiện tại");
    }
  };
  const fetchSubmitAnswer = async (answer) => {
    try {
      var res = await CheckAnswer(answer);
      if (res.data === true) {
        setCompleted([...completed, number]);
        toast.success("Chính xác!!!");
        if (number < questions.length) {
          setNumber(number + 1);
          setCurrentQuestion(questions[number]);
        } else {
          alert("Hoàn thành hết câu hỏi");
        }
      } else {
        toast.error("Sai rồi!!!");
      }
    } catch (error) {
      alert(error);
    }
  };
  const submitPractice = async () => {
    try {
      var hisId = sessionStorage.getItem("currentPractice");
      const res = await EndPractice(hisId, 5);
      if (res.resultCode === 0) {
        toast.success("Nộp bài thành công");
        sessionStorage.removeItem("currentPractice");
        navigate("/history");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (questions !== null) {
      setCurrentQuestion(questions[0]);
    }

    const handleBeforeUnload = (e) => {
      if (completed.length !== questions.length) {
        const message =
          "Bạn đang làm bài, bạn có chắc chắn muốn rời khỏi trang?";
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [questions]);
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
          />
        )}
      </div>
      <div className="col-right">
        <div className="number-container">
          {questions &&
            questions.map((question, index) => {
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
        {completed.length < questions.length ? (
          <button onClick={handleCheckAnswer} className="check-answer">
            Kiểm tra kết quả
          </button>
        ) : (
          <button onClick={submitPractice} className="check-answer">
            Nộp bài
          </button>
        )}

        {currentQuestion && <Question question={currentQuestion} />}
      </div>
    </div>
  );
};

export default QuestionContainer;
