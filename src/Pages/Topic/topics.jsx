import { Link, useNavigate } from "react-router-dom";
import BlockTopic from "../../Components/BlockTopic/BlockTopic";
import { useEffect, useState } from "react";
import { GetAllTopic } from "../../Api/topic";
import "./topic.css";
const Topics = () => {
  const [topics, setTopics] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const initalPage = async () => {
    try {
      const res = await GetAllTopic();
      setTopics(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/excercise?search=${search}`);
  };
  useEffect(() => {
    initalPage();
  }, []);

  return (
    <>
      <section className="heading">
        <h3>Chủ đề</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          Chủ đề
        </p>
      </section>
      <section className="topics">
        {topics &&
          topics.map((topic, index) => {
            return (
              <BlockTopic
                key={index}
                id={topic.id}
                name={topic.nameTopic}
                description={topic.content}
                image={topic.imageTopic}
              />
            );
          })}
      </section>
    </>
  );
};

export default Topics;
