import React, { useEffect, useState } from "react";
import { GetMe, UpdateMe } from "../../Api/user";
import { formatDate } from "../../Extensions/formatDate";
import toast from "react-hot-toast";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const initial = async () => {
    try {
      const res = await GetMe();
      if (res.resultCode === 0) {
        const birthDate = formatDate(res.data.birth);
        setUser({
          ...res.data,
          birth: birthDate,
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      birth: user.birth,
    };
    setLoading(true);
    const res = await UpdateMe(userData);
    if (res.resultCode === 0) {
      toast.success("Cập nhật thành công");
      setLoading(false);
    } else {
      toast.error("Có lỗi: " + res.message);
    }
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <section className="profile-page">
      {user && (
        <>
          <div className="picture">
            <img
              src={require(`../../images/avatar.jpg`)}
              alt="Profile Picture"
            />
          </div>
          <div className="profile-info">
            <h1>Thông tin cá nhân</h1>
            <form className="user-info" onSubmit={handleSubmit}>
              <input name="id" value={user.id} type="hidden" readOnly />
              <label>Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                placeholder="Họ và tên"
                onChange={handleChange}
              ></input>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
              ></input>
              <input
                type="text"
                name="phone"
                value={user.phone}
                placeholder="Số điện thoại"
                onChange={handleChange}
              ></input>
              <input
                type="date"
                name="birth"
                value={user.birth}
                onChange={handleChange}
              ></input>
              {loading ? (
                <span className="text-loading">Đang cập nhật...</span>
              ) : (
                <button type="submit">Lưu</button>
              )}
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
