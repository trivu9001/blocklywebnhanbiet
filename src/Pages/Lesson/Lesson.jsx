import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlockExcercise from "../../Components/BlockExcercise/BlockExcercise";
import { GetLessons } from "../../Api/lesson";
import "./lesson.css";
const Lesson = () => {
  const [lessons, setLessons] = useState();
  const location = useLocation();
  const { topicId } = useParams();
  const detailTopicId = location.state.detailTopicId;
  const topicName = location.state.topicName;

  const initial = async () => {
    try {
      const res = await GetLessons(detailTopicId);
      if (res.resultCode === 0) {
        setLessons(res.data);
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
    <>
      <section className="heading">
        <h3>Bài học</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          <Link to={`/topics/${topicId}`} state={topicName}>
            {topicName} &gt;&gt;
          </Link>
          Bài học
        </p>
      </section>
      {/* Animals section starts */}
      <section className="lesson-container">
        {lessons &&
          lessons.map((item, index) => {
            return (
              <BlockExcercise
                key={index}
                id={item.id}
                content={item.content}
                exNo={item.exNo}
              />
            );
          })}
      </section>
      {/* Animals section ends */}
    </>
  );
};

export default Lesson;
