import React, { useState } from "react";
import styles from "./styles.module.less";

const MatchingTable: React.FC = ({}) => {
  const numRows = 3;
  const numCols = 3;

  // 表头和第一列的数据
  const headers = ["Header 1", "Header 2", "Header 3"];
  const firstColumnData = ["Row 1", "Row 2", "Row 3"];

  // 创建一个状态来保存每个单元格的勾选状态
  const [checkboxes, setCheckboxes] = useState(
    Array(numRows).fill(Array(numCols).fill(false))
  );

  // 处理复选框点击事件
  const handleCheckboxChange = (rowIndex: number, colIndex: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[rowIndex][colIndex] = !newCheckboxes[rowIndex][colIndex];
    setCheckboxes(newCheckboxes);
  };

  // 生成表格内容
  const renderTable = () => {
    const table = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        if (j === 0) {
          // 第一列添加选项
          row.push(<td key={`${i}-${j}`}>{firstColumnData[i]}</td>);
        } else {
          // 其他列添加复选框
          row.push(
            <td key={`${i}-${j}`}>
              <input
                type="checkbox"
                checked={checkboxes[i][j - 1]}
                onChange={() => handleCheckboxChange(i, j - 1)}
              />
            </td>
          );
        }
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  // 生成表头
  const renderHeader = () => {
    return headers.map((header, index) => <th key={index}>{header}</th>);
  };

  return (
    <table className={styles.table_container}>
      <thead>
        <tr>
          <th></th>
          {renderHeader()}
        </tr>
      </thead>
      <tbody>{renderTable()}</tbody>
    </table>
  );
};

export default MatchingTable;
