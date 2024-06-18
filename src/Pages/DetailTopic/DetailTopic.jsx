import { Link, useLocation, useParams } from "react-router-dom";
import BlockLesson from "../../Components/BlockLesson/BlockLesson";
import { useEffect, useState } from "react";
import { GetDetailTopic } from "../../Api/topic";
//set hook useState và lấy ra detail topic từ api
const DetailTopic = () => {
  const [detail, setDetail] = useState(null);
  const { topicId } = useParams();
  const location = useLocation();
  const topicName = location.state;
  const initial = async () => {
    try {
      const res = await GetDetailTopic(topicId);
      if (res.resultCode === 0) {
        setDetail(res.data);
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
        <h3>{topicName}</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          {topicName}
        </p>
      </section>
      {/* Animals section starts */}
      <section className="lessons">
        {detail &&
          detail.map((item) => {
            return (
              <BlockLesson
                key={item.id}
                id={item.id}
                tag={item.class}
                title={item.title}
                content={item.content}
                imageDetailTopic={item.imageDetailTopic}
                topicName={topicName}
              />
            );
          })}
      </section>
      {/* Animals section ends */}
    </>
  );
};

export default DetailTopic;
