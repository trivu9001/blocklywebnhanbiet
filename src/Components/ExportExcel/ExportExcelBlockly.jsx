import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportExcelBlockly = ({ fileName, title, fetchData }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async (fileName) => {
    const apiData = await fetchData();
    const ws = XLSX.utils.json_to_sheet(apiData.data);
    XLSX.utils.sheet_add_aoa(ws, [["Id", "Type", "Blockly"]], { origin: "A1" });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return <button onClick={(e) => exportToCSV(fileName)}>{title}</button>;
};
