import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./history.css";
import { GetHistory } from "../../Api/history";

const History = () => {
  const [histories, setHistories] = useState();
  const initial = async () => {
    try {
      const res = await GetHistory();
      if (res.resultCode === 0) {
        setHistories(res.data);
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
      <section className="heading">
        <h3>Lịch sử học</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          Lịch sử học
        </p>
      </section>
      <section className="history">
        <table>
          <thead>
            <tr>
              <th>Chủ đề</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th>Số câu hoàn thành</th>
            </tr>
          </thead>
          <tbody>
            {histories ? (
              histories.map((record, index) => (
                <tr key={index}>
                  <td>{record.excerciseName}</td>
                  <td>{record.startdate}</td>
                  <td>{record.enddate}</td>
                  <td>{record.count}</td>
                </tr>
              ))
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default History;
