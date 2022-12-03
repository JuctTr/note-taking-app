import * as xlsx from "xlsx";

type TExcel = Record<string, any>;

export function importExcel(file: File, th: TExcel, tr: TExcel): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e && e.target && e.target.result;
      const result = xlsx.read(data, {
        type: "binary",
        cellDates: false,
      });
      // result.SheetNames[0]是获取Sheets中第一个Sheet的名字
      // result.Sheets[Sheet名]获取第一个Sheet的数据
      const excelJson = xlsx.utils.sheet_to_json(
        result.Sheets[result.SheetNames[0]]
      ) as TExcel[];
      console.warn("excel读取: ", excelJson);
      const excelData = excelJson.map((row) => {
        const data: TExcel = {};
        Object.keys(th).forEach((key) => {
          if (key && row[key] && th[key]) {
            const thKey = th[key];
            let trValue = row[key];
            if (typeof tr[thKey] === "function") {
              trValue = tr[thKey](trValue);
            }
            data[th[key]] = trValue;
          }
        });
        return data;
      });
      console.warn("excel解析: ", excelData);
      resolve(excelData);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsBinaryString(file);
  });
}
