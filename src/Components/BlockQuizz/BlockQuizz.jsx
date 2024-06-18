import React from "react";

const BlockQuizz = (props) => {
  const {} = props;
  return (
    <div className="box">
      <div className="image">
        <img src={require("../../images/blog-1.jpg")} alt="" />
      </div>
      <div className="content">
        <div className="icons">
          <p>
            <i className="fas fa-clock" /> Ngày 12 tháng 5 năm 2024
          </p>
          <p>
            <i className="fas fa-user" /> bởi admin
          </p>
        </div>
        <h3>Đề 1</h3>
        <p>learning is what makes you perfect</p>
        <a href="#" className="btn">
          Làm ngay
        </a>
      </div>
    </div>
  );
};

export default BlockQuizz;
