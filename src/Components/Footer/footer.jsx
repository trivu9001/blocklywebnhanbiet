import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>Chủ đề</h3>
            <a>
              <i className="fas fa-arrow-right" /> Động vật
            </a>
            <a>
              <i className="fas fa-arrow-right" /> Thực vật
            </a>
            <a>
              <i className="fas fa-arrow-right" /> Con người
            </a>
          </div>
          <div className="box">
            <h3>Lịch sử học</h3>
            <a>
              <i className="fas fa-arrow-right" /> Lịch sử học
            </a>
            <a>
              <i className="fas fa-arrow-right" /> Lịch sử giải đố
            </a>
          </div>
          <div className="box">
            <h3>Thống kê</h3>
            <a>
              <i className="fas fa-arrow-right" /> Theo tuần
            </a>
            <a>
              <i className="fas fa-arrow-right" /> Theo tháng
            </a>
            <a>
              <i className="fas fa-arrow-right" /> Theo năm
            </a>
          </div>
          <div className="box">
            <h3>Thông tin liên hệ</h3>
            <a>
              <i className="fab fa-facebook-f" /> facebook
            </a>
            <a>
              <i className="fab fa-github" /> github
            </a>
            <a>
              <i className="fa fa-address-book" /> Về chúng tôi
            </a>
            <a>
              <Link to={"/contact"}>
                <i className="fa fa-address-book" /> Liên hệ{" "}
              </Link>
            </a>
          </div>
        </div>
        <div className="credit">
          created by <span>Web nhận biết</span> | all right reserved!
        </div>
      </section>
    </>
  );
};

export default Footer;
