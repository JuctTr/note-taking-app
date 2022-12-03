import React, { useState } from "react";
// import xlsx from "xlsx";
import "./index.css";
import { importExcel } from "../../common/utils";
import { INoteItem } from "../../model";

export default function XmlButton({
  onUpdateNote,
}: {
  onUpdateNote: (item?: INoteItem) => void;
}): React.ReactElement | null {
  const onChange = async (event: React.BaseSyntheticEvent) => {
    const files = event.target.files;
    console.log(files);
    const firstFile = files[0];
    const excelTH = {
      笔记ID: "id",
      笔记标题: "title",
      笔记内容: "body",
      修改时间: "updated",
    };
    const excelTR = {
      id: (v: number) => v,
      __rowNum__: (v: number) => v + 1,
    };
    const noteList = await importExcel(firstFile, excelTH, excelTR);
    noteList.length > 0 &&
      noteList.forEach((item: INoteItem) => {
        onUpdateNote(item);
      });
  };

  return (
    <div className="xml_button">
      <input
        type="file"
        accept=".csv,.xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        onChange={onChange}
      />
    </div>
  );
}
