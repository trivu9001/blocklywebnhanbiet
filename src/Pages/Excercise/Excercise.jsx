import React, { useEffect, useState } from "react";
import BlockExcercise from "../../Components/BlockExcercise/BlockExcercise";
import {
  GetAllDetailExcercise,
  GetAllExcercise,
  GetExcerciseBySearch,
} from "../../Api/excercise";
import "./excercise.css";
import toast from "react-hot-toast";
import useThrottle from "../../hooks/useThrottle";
import { ExportExcelExcercise } from "../../Components/ExportExcel/ExportExcelExcercise";
import { ExportExcelBlockly } from "../../Components/ExportExcel/ExportExcelBlockly";
import { GetAllDefineBlock } from "../../Api/block";
const Excercise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [excercises, setExcercises] = useState();
  const initial = async () => {
    try {
      var res = await GetAllExcercise();

      if (res.resultCode === 0) {
        setExcercises(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    fetchData(searchValue);
  };
  const fetchData = useThrottle(async (keyword) => {
    if (keyword === "") {
      initial();
    } else {
      try {
        var res = await GetExcerciseBySearch(keyword);
        if (res.resultCode === 0) {
          setExcercises(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  }, 300);
  useEffect(() => {
    initial();
  }, []);

  return (
    <>
      <div className="seach-container">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Tìm kiếm bài học..."
            onChange={handleSearch}
            value={searchTerm}
          />
          <div className="export-container">
            <ExportExcelExcercise
              fileName="DanhSachBaiTap"
              title="Xuất excel bài tập"
              fetchData={GetAllDetailExcercise}
            />
            <ExportExcelBlockly
              fileName="DanhSachBlockly"
              title="Xuất excel blockly"
              fetchData={GetAllDefineBlock}
            />
          </div>
        </div>
      </div>
      <section className="lesson-container">
        {excercises &&
          excercises.map((item, index) => {
            return (
              <BlockExcercise
                key={index}
                id={item.id}
                content={item.content}
                exNo={++index}
                isCompleted={item.isCompleted}
              />
            );
          })}
      </section>
      {/* Animals section ends */}
    </>
  );
};

export default Excercise;
