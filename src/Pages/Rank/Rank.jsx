import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./history.css";
import { GetRankByTimeAndLesson } from "../../Api/rank";
// import moment from "moment";
import Pagination from "../../Components/Pagination/Pagination";

const Rank = () => {
  const [rank, setRank] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const initial = async () => {
    try {
      const res = await GetRankByTimeAndLesson(currentPage, 5);
      if (res.resultCode === 0) {
        setLoading(false);
        setRank(res.data.items);
        setTotalPage(res.data.totalPages);
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
  return (
    <>
      <section className="heading">
        <h3>Xếp hạng</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          Xếp hạng theo số bài học và giờ học
        </p>
      </section>
      <section className="history">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Hạng</th>
                  <th>Họ Tên</th>
                  <th>Tổng thời gian làm bài tính theo phút</th>
                  <th>Tổng số bài đã làm</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rank ? (
                  rank.map((record, index) => (
                    <tr key={index}>
                      <td>{record.count}</td>
                      <td>{record.userName}</td>
                      <td>{record.totalTime}</td>
                      <td>{record.totalLesson}</td>
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
        )}
      </section>
    </>
  );
};

export default Rank;
