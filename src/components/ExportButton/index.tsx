import React, { useState } from "react";
import Excel from "exceljs";

interface IProps {
  tableColumns: any[];
  tableRows: any[];
  excelName: string;
  defaultText: string;
}

function ExportButton({
  tableColumns,
  tableRows,
  excelName = "表格默认名称",
  defaultText,
}: IProps) {
  const [isLoading, setLoading] = useState(false);

  // 执行下载表格
  const exportExcel = () => {
    setLoading(true);
    // 初始化 创建工作簿
    const workbook = new Excel.Workbook();
    // 设置工作簿属性
    workbook.creator = "admin";
    workbook.lastModifiedBy = "admin";
    workbook.created = new Date();
    workbook.modified = new Date();

    // 添加工作表
    let sheet = workbook.addWorksheet("sheet");

    // 添加表头
    sheet.columns = tableColumns;

    // 添加表格数据
    sheet.addRows(tableRows);

    // 设置每一列样式 居中
    const row = sheet.getRow(1);
    row.eachCell((cell, rowNumber) => {
      sheet.getColumn(rowNumber).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // 将表格数据转为二进制
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        writeFile(`${excelName}.xlsx`, buffer);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        alert("下载失败");
        setLoading(false);
      });
  };

  // 将二进制转为Excel并下载
  const writeFile = (fileName: string, content: ArrayBuffer) => {
    let a = document.createElement("a");
    let blob = new Blob([content], { type: "text/plain" });

    a.download = fileName;
    a.href = URL.createObjectURL(blob);

    a.click();
  };

  return (
    <div>
      <button onClick={exportExcel}>
        {isLoading ? "正在导出" : defaultText}
      </button>
    </div>
  );
}

export default ExportButton;
