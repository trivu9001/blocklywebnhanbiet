import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../History/history.css";
import { GetHistoryQuizz } from "../../Api/history";
import moment from "moment";
import Pagination from "../../Components/Pagination/Pagination";

const HistoryQuizz = () => {
  const [histories, setHistories] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const initial = async () => {
    try {
      const res = await GetHistoryQuizz(currentPage, 5);
      if (res.resultCode === 0) {
        setHistories(res.data.items);
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
  return (
    <>
      <section className="heading">
        <h3>Lịch sử giải đố</h3>
        <p>
          <Link to={"/home"}>Trang chủ &gt;&gt;</Link>
          Lịch sử giải đố
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
                  <th>Chủ đề</th>
                  <th>Thời gian bắt đầu</th>
                  <th>Thời gian kết thúc</th>
                  <th>Thời gian làm bài</th>
                  <th>Số câu hoàn thành</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {histories ? (
                  histories.map((record, index) => (
                    <tr key={index}>
                      <td>{record.excerciseName}</td>
                      <td>
                        {moment(record.startdate).format("DD/MM/yyyy HH:mm:ss")}
                      </td>
                      <td>
                        {record.enddate &&
                          moment(record.enddate).format("DD/MM/yyyy HH:mm:ss")}
                      </td>
                      <td>{record.totalMinutes}</td>
                      <td>{record.count}</td>
                      <td>
                        {record.count > 0 ? (
                          <Link
                            to="/detailhistory"
                            state={{
                              hisId: record.id,
                              exId: record.excerciseId,
                            }}
                          >
                            Chi tiết
                          </Link>
                        ) : (
                          <></>
                        )}
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
        )}
      </section>
    </>
  );
};

export default HistoryQuizz;
