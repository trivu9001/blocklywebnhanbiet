import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Về chúng tôi</title>
      {/* font awesome cdn link */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />
      <section className="heading">
        <h3>Về chúng tôi</h3>
        <p>
          <Link to={"/home"}>
            <a>Trang chủ &gt;&gt;</a> Về chúng tôi
          </Link>
        </p>
      </section>
      {/* about section starts  */}
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
        </div>
      </section>
      {/* about section ends */}
    </>
  );
};

export default About;
