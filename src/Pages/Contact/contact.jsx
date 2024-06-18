import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Liên hệ</title>
      {/* font awesome cdn link */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />
      <section className="heading">
        <h3>Liên hệ</h3>
        <p>
          <Link to={"/home"}>
            <a>Trang chủ &gt;&gt;</a> Liên hệ
          </Link>
        </p>
      </section>
      <section className="contact">
        <div className="icons-container">
          <div className="icons">
            <i className="fas fa-phone" />
            <h3>Số điện thoại</h3>
            <p>+84 123-457-790</p>
            <p>+84 354-111-444</p>
          </div>
          <div className="icons">
            <i className="fas fa-envelope" />
            <h3>Email</h3>
            <p>dangnildo@gmail.com</p>
            <p>vuminhtri@gmail.com</p>
          </div>
          <div className="icons">
            <i className="fas fa-map-marked-alt" />
            <h3>
              Địa chỉ <address />
            </h3>
            <p>Quận 7, Thành phố Hồ Chí Minh</p>
          </div>
        </div>
        <div className="row">
          <form action="">
            <h3>Phản hồi</h3>
            <input type="text" placeholder="Your name" className="box" />
            <input type="number" placeholder="Your number" className="box" />
            <input type="email" placeholder="Your email" className="box" />
            <textarea
              name=""
              placeholder="Your message"
              id=""
              cols={30}
              rows={10}
              defaultValue={""}
            />
            <input type="submit" defaultValue="Send message" className="btn" />
          </form>
          {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15680.095651552987!2d106.68946355581285!3d10.732638957879681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b2747a81a3%3A0x33c1813055acb613!2zxJDhuqFpIGjhu41jIFTDtG4gxJDhu6ljIFRo4bqvbmc!5e0!3m2!1svi!2s!4v1715268115172!5m2!1svi!2s"
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      /> */}
        </div>
      </section>
    </>
  );
};

export default Contact;
