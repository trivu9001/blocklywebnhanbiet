import React from "react";

import { Link } from "react-router-dom";
const BlockTopic = (props) => {
  const { id, name, description, image } = props;
  return (
    <div>
      <div className="box">
        <img src={require(`../../images/${image}`)} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <Link className="btn" to={`/topics/${id}`} state={name}>
          Học ngay
        </Link>
      </div>
    </div>
  );
};

export default BlockTopic;
