import React, { useEffect, useState, useRef } from "react";
import Question from "../Question/Question";
import "./questioncontainer.css";
import BlocklyContainer from "../BlocklyContainer/BlocklyContainer";
import { CheckAnswer, EndPractice, GetAnswer } from "../../Api/lesson";
import toast from "react-hot-toast";
import { checkAnswer, save } from "../../BlocklyJS/serialization";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionContainer = (props) => {
  const { questions } = props;
  const [number, setNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [completed, setCompleted] = useState([]);
  // const [showanswer, setShowAnswer] = useState([]);
  const workspaceRef = useRef(null);

  const navigate = useNavigate();
  const handleCheckAnswer = () => {
    if (currentQuestion.typeCheck == 1) {
      console.log("Type check:", currentQuestion.typeCheck);
      if (workspaceRef.current) {
        var blocks = workspaceRef.current.getAllBlocks();
        var answerData = null;
        blocks.forEach(async (block) => {
          var answerBlock = block.getInputTargetBlock("ANSWER");
          if (answerBlock) {
            var answerValue = answerBlock.getFieldValue("check").toString();
            var dataType = typeof answerValue;
            console.log("Data type of answerValue:", dataType);
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
    }
    if (currentQuestion.typeCheck == 2) {
      console.log("Type check:", currentQuestion.typeCheck);
      if (workspaceRef.current) {
        var blocks = workspaceRef.current.getAllBlocks();
        var answerData = null;
        console.log("Blockquest_Name:", currentQuestion.blockQuestType);
        blocks.forEach(async (block) => {
          if (block.type == currentQuestion.blockQuestType) {
            var answerBlock = block.getInputTargetBlock("ANSWER");
            console.log("Type check:", answerBlock);
            if (answerBlock) {
              var answerType = answerBlock.type;
              var currentPractice = sessionStorage.getItem("currentPractice");
              answerData = {
                blockQuestId: currentQuestion.id,
                ans: answerType,
                blockAns: answerBlock.type,
                hisId: currentPractice,
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
  const handleGetAnswer = () => {
    var currentPractice = sessionStorage.getItem("currentPractice");
    // setShowAnswer([...showanswer, number]);
    var answerData = null;
    answerData = {
      blockQuestId: currentQuestion.id,
      hisId: currentPractice,
      state: save(workspaceRef.current),
    };
    fetchGetAnswer(answerData);
  };

  const fetchGetAnswer = async (answer) => {
    try {
      var res = await GetAnswer(answer.blockQuestId, answer.hisId);
      var state = res.data.fullAnsBlock;
      setCurrentQuestion((prev) => ({
        ...prev,
        workspaceQuestion: state,
      }));

      if (res.resultCode === 0) {
        toast.success("Đã show đáp án");
      } else {
        toast.error("Không có đáp án để hiển thị!!!");
      }
    } catch (error) {
      toast.error(error);
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
        localStorage.setItem(`workspace_${currentQuestion.id}`, answer.state);
        setCompleted([...completed, number]);
        toast.success("Chính xác!!!");
        if (number < questions.length) {
          setNumber(number + 1);
          setCurrentQuestion(questions[number]);
        } else {
          toast.success("Hoàn thành hết câu hỏi");
          submitPractice(5);
        }
      } else {
        toast.error("Sai rồi!!!");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const submitPractice = async (completedQuestion) => {
    try {
      var hisId = sessionStorage.getItem("currentPractice");
      const res = await EndPractice(hisId, completedQuestion);
      if (res.resultCode === 0) {
        toast.success("Nộp bài thành công");
        questions.forEach((question) => {
          localStorage.removeItem(`workspace_${question.id}`);
        });
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
  }, [questions]);
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
  // useEffect(() => {
  //   alert("Bạn thay đổi route");
  // }, [location]);
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
        {!completed.includes(number) && (
          <button onClick={handleCheckAnswer} className="check-answer">
            Kiểm tra kết quả
          </button>
        )}
        {/* {!completed.includes(number) && (
          <button onClick={handleGetAnswer} className="check-answer">
            Xem đáp án
          </button>
        )} */}
        {/* <button onClick={handleCheckAnswer} className="check-answer">
          Kiểm tra kết quả
        </button> */}
        {currentQuestion && <Question question={currentQuestion} />}
      </div>
    </div>
  );
};

export default QuestionContainer;
