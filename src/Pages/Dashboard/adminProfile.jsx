import React, { useEffect, useState } from "react";
import { GetMe, UpdateMe } from "../../Api/user";
import { formatDate } from "../../Extensions/formatDate";
import "./adminProfile.css";

const AdminProfile = () => {
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
        alert(res.message);
      }
    } catch (error) {
      alert(error);
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
      alert("Cập nhật thành công");
      setLoading(false);
    } else {
      alert("Có lỗi: " + res.message);
    }
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <main className='main-container'>
      <h1> Trang cá nhân</h1>
      <div className="profile-page">
      {user && (
        <>
          <div className="picture">
            <img
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocKms9K2DAGiS1-6KJRP8DyGOAQ0hS-zolWCZmgT-qldomNz9XeB=s96-c"
              }
              alt="Profile Picture"
            />
          </div>
          <div className="profile-info">
            <h1>Thông tin cá nhân</h1>
            <form className="user-info" onSubmit={handleSubmit}>
              <input name="id" value={user.id} type="hidden" readOnly />
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                placeholder="Tên"
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
                <button>Lưu</button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
    </main>
    
  );
};

export default AdminProfile;
