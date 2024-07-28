import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetUserList, DeleteUser } from "../../Api/admin";
import "./userManagement.css";
import Pagination from "../../Components/Pagination/Pagination";

const UserManagement = () => {
  const [userLists, setUserLists] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const initial = async () => {
    try {
      const res = await GetUserList(currentPage, 5);
      if (res.resultCode === 0) {
        setUserLists(res.data.items);
        setTotalPage(res.data.totalPages);
        setLoading(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    initial();
  }, [currentPage]);

  const handleUpdate = (index) => {
    console.log(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này không?")) {
      try {
        const res = await DeleteUser(index);
        if (res.resultCode === 0) {
          toast.success("Xóa thành công");
          window.location.reload();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <main className="main-container">
        <div className="main-title">
          <h1>Quản lý người dùng</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="user-management">
            <>
              <table>
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userLists ? (
                    userLists.map((record, index) => (
                      <tr key={index}>
                        <td>{record.fullName}</td>
                        <td>{record.birth ? record.birth : ""}</td>
                        <td>{record.phone ? record.phone : ""}</td>
                        <td>{record.email ? record.email : ""}</td>
                        <td>{record.sex ? record.sex : ""}</td>
                        <td>
                          <button onClick={() => handleDelete(record.id)}>
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                          <button onClick={() => handleUpdate(record.id)}>
                            <i className="fa-solid fa-square-pen"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Chưa có dữ liệu</p>
                  )}
                </tbody>
              </table>
              <Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              ></Pagination>
            </>
          </div>
        )}
      </main>
    </>
  );
};

export default UserManagement;
