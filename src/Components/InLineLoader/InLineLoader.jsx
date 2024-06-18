import React, { useEffect } from "react";
import NProgress from "nprogress";
const InLineLoader = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return <></>;
};

export default InLineLoader;
