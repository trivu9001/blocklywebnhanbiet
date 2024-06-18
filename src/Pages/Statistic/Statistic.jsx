import React from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./statistic.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Statistic = () => {
  const [timeFrame, setTimeFrame] = useState("week");

  const data = {
    week: {
      labels: [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ nhật",
      ],
      hours: [5, 6, 7, 5, 6, 3, 4],
      lessons: [1, 2, 1, 1, 2, 1, 1],
    },
    month: {
      labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
      hours: [20, 25, 22, 18],
      lessons: [5, 6, 5, 4],
    },
    year: {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      hours: [80, 85, 78, 80, 82, 85, 90, 88, 85, 80, 75, 80],
      lessons: [20, 21, 19, 20, 21, 22, 23, 22, 21, 20, 19, 20],
    },
  };

  const handleClick = (frame) => {
    setTimeFrame(frame);
  };

  const chartData = {
    labels: data[timeFrame].labels,
    datasets: [
      {
        label: "Số giờ học",
        data: data[timeFrame].hours,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Số bài học",
        data: data[timeFrame].lessons,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };
  return (
    <section className="statistic">
      <h1>Thống kê số giờ học</h1>
      <div className="buttons">
        <button
          className={timeFrame === "week" ? "active" : ""}
          onClick={() => handleClick("week")}
        >
          Theo tuần
        </button>
        <button
          className={timeFrame === "month" ? "active" : ""}
          onClick={() => handleClick("month")}
        >
          Theo tháng
        </button>
        <button
          className={timeFrame === "year" ? "active" : ""}
          onClick={() => handleClick("year")}
        >
          Theo năm
        </button>
      </div>
      <div className="stats">
        <p>
          Tổng số giờ học: {data[timeFrame].hours.reduce((a, b) => a + b, 0)}
        </p>
        <p>
          Tổng số bài học: {data[timeFrame].lessons.reduce((a, b) => a + b, 0)}
        </p>
      </div>
      <Line data={chartData} />
    </section>
  );
};

export default Statistic;
