import { Link } from "react-router-dom";
import BlockQuizz from "../../Components/BlockQuizz/BlockQuizz";
const Quizess = () => {
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
        <BlockQuizz />
        <BlockQuizz />
        <BlockQuizz />
      </section>
      {/* blog section ends */}
    </>
  );
};

export default Quizess;
