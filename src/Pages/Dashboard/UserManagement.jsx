import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetUserList } from "../../Api/admin";
import './userManagement.css';

const UserManagement = () => {
  const [userLists, setUserLists] = useState();
  const initial = async () => {
    try {
      const res = await GetUserList();
      if (res.resultCode === 0) {
        setUserLists(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <>
        <main className='main-container'>
        <div className='main-title'>
            <h1>Quản lý người dùng</h1>
        </div>
        <div className="user-management">
          <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Giới tính</th>
            </tr>
          </thead>
          <tbody>
            {userLists ? (
              userLists.map((record, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{record.fullName}</td>
                  <td>{record.birth?(record.birth):('')}</td>
                  <td>{record.phone?(record.phone):('')}</td>
                  <td>{record.email?(record.email):('')}</td>
                  <td>{record.sex?(record.sex):('')}</td>
                </tr>
              ))
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </tbody>
        </table>
        </div>
        
        </main>
        
    </>
  );
};

export default UserManagement;