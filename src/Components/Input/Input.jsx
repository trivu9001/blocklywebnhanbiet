import React from "react";

const Input = (props) => {
  const {
    inputType,
    data,
    setData,
    classStyle,
    placeholder,
    isReadOnly = false,
  } = props;
  return (
    <>
      <input
        type={inputType}
        value={data}
        className={classStyle}
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
        readOnly={isReadOnly}
      />
    </>
  );
};

export default Input;
