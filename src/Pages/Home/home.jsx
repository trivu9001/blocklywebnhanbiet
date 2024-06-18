import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h3>Trang chủ</h3>
      </section>
      {/* about section starts */}
      <section className="about">
        <div className="image">
          <img src={require("../../images/about-img.png")} alt="About" />
        </div>
        <div className="content">
          <h3>
            Chào mừng bạn đến với Web nhận biết, nơi trí tò mò gặp gỡ thiên
            nhiên theo cách mê hoặc nhất!
          </h3>
          <p>
            Chúng tôi tin rằng việc tìm hiểu về động vật và thực vật tại Web
            nhận biết cũng thú vị như đi tàu lượn siêu tốc xuyên rừng.
          </p>
          <Link className="btn" to={"/about"}>
            Tìm hiểu thêm
          </Link>
        </div>
      </section>
      {/* about section ends */}
      {/* home section starts */}
      <section className="home">
        <div className="image">
          <img src={require("../../images/animals-nature.jpg")} alt="" />
        </div>
        <div className="content">
          <h3>Tham gia cuộc phiêu lưu</h3>
          <p>
            Bắt tay vào một cuộc phiêu lưu khám phá bí mật của vương quốc động
            vật và thực vật!
          </p>
          <Link className="btn" to={"/topics"}>
            Bắt đầu học
          </Link>
        </div>
      </section>
      {/* home section ends */}
      {/* categories section starts */}
      <section className="category">
        <a className="box">
          <img src={require("../../images/animals.png")} alt="Animals" />
          <h3>Động vật</h3>
        </a>

        <a className="box">
          <img src={require("../../images/plants.jpg")} alt="Plants" />
          <h3>Thực vật</h3>
        </a>

        <a className="box">
          <img src={require("../../images/human.png")} alt="Human" />
          <h3>Con người</h3>
        </a>
      </section>
      {/* categories section endss */}
    </>
  );
};

export default Home;
