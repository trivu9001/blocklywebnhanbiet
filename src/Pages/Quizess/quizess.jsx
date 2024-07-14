import { Link } from "react-router-dom";
import BlockQuizz from "../../Components/BlockQuizz/BlockQuizz";
import toast from "react-hot-toast";
import { GetAllQuiz } from "../../Api/quiz";
import React, { useState, useEffect } from "react";

const Quizess = () => {
  const [quizess, setQuizess] = useState();
  const initial = async () => {
    try {
      var res = await GetAllQuiz();
      if (res.resultCode === 0) {
        setQuizess(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <>
      <section className="heading">
        <h3>Câu đố</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          Câu đố
        </p>
      </section>
      <section className="quizess">
        <section className="lesson-container">
          {quizess &&
            quizess.map((item, index) => {
              return (
                <BlockQuizz
                  question={item.content}
                  index={++index}
                  id={item.id}
                  isComplete={item.isCompleted}
                />
              );
            })}
        </section>
      </section>
      {/* blog section ends */}
    </>
  );
};

export default Quizess;
