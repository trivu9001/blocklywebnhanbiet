import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
const Header = () => {
  const { user, LogoutContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(false);

  const handleMenuClick = () => {
    setNavbarActive(!navbarActive);
  };

  const handleScroll = () => {
    setNavbarActive(false);
  };
  const handleLogout = () => {
    LogoutContext();
    navigate("/login");
    
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []);

  return (
    <>
      <session className="header">
        <Link className="logo" to={"/home"}>
          <i className="fa-solid fa-graduation-cap" /> Web nhận biết
        </Link>
        <div id="menu-btn" className="fas fa-bars" onClick={handleMenuClick}/>
        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          {user ? (
            <ul>
              <li>
                <Link to={"/home"}>Trang chủ</Link>
              </li>
              <li>
                <Link to={"/topics"}>Chủ đề</Link>
              </li>
              <li>
                <Link to={"/excercises"}>Bài học</Link>
              </li>
              <li>
                <Link to={"/quizess"}>Câu đố</Link>
              </li>
              <li>
                <Link to={"/history"}>Lịch sử học</Link>
              </li>
              <li>
                <Link to={"/statistic"}>Thống kê</Link>
              </li>
              <li>
                {user ? (
                  <>
                    <Link>Xin chào, {user.fullname} </Link>
                    <ul>
                      <li>
                        <Link to={"/profile"}>Thông tin cá nhân</Link>
                      </li>
                      <li>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link to={"/login"}>Đăng nhập</Link>
                )}
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/login"}>Đăng nhập</Link>
              </li>
            </ul>
          )}
        </nav>
      </session>
    </>
  );
};

export default Header;
