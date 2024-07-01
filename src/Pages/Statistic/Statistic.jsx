import React from "react";
import { GetStatistic } from "../../Api/statistic";
import { useEffect, useState } from "react";
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
  const [timeFrame, setTimeFrame] = useState("dataWeek");
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const initalPage = async () => {
    try {
      const res = await GetStatistic();
      // console.log(res);
      if (res.resultCode === 0) {
        setData(res.data);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (frame) => {
    setTimeFrame(frame);
  };

  useEffect(() => {
    initalPage();
  }, []);

  useEffect(() => {
    if (data) {
      const chartData = {
        labels: data[timeFrame].labels,
        datasets: [
          {
            label: "Số phút học",
            data: data[timeFrame].minutes,
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
      setChartData(chartData);
    }
  }, [data, timeFrame]);

  return (
    <section className="statistic">
      <h1>Thống kê số giờ học</h1>
      <div className="buttons">
        <button
          className={timeFrame === "dataWeek" ? "active" : ""}
          onClick={() => handleClick("dataWeek")}
        >
          Theo tuần
        </button>
        <button
          className={timeFrame === "dataMonth" ? "active" : ""}
          onClick={() => handleClick("dataMonth")}
        >
          Theo tháng
        </button>
        <button
          className={timeFrame === "dataYear" ? "active" : ""}
          onClick={() => handleClick("dataYear")}
        >
          Theo năm
        </button>
      </div>
      {data && (
        <div className="stats">
          <p>
            Tổng số phút học:{" "}
            {data[timeFrame].minutes.reduce((a, b) => a + b, 0)}
          </p>
          <p>
            Tổng số bài học:{" "}
            {data[timeFrame].lessons.reduce((a, b) => a + b, 0)}
          </p>
        </div>
      )}
      {chartData && <Line data={chartData} />}
    </section>
  );
};

export default Statistic;
