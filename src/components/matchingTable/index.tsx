import React, { useState } from "react";
import styles from "./styles.module.less";
import { CheckOutlined } from "@ant-design/icons";

interface tableProps {
  optionList: any[];
  questionList: any[];
}
const MatchingTable: React.FC<tableProps> = ({ optionList, questionList }) => {
  // 创建一个状态来保存每个单元格的勾选状态
  const [checkedOptions, setCheckedOptions] = useState<any[]>(questionList);

  // 处理复选框点击事件
  const handleCheckboxChange = (question: any, option: any, i: number) => {
    console.log(question, option, i);
    checkedOptions[i] = {
      ...question,
      answer: option.label,
    };
    setCheckedOptions([...checkedOptions]);
    console.log(checkedOptions, "checkedOptions");
  };

  // 生成表头
  const renderHeader = () => {
    return optionList.map((header, index) => (
      <th key={index} className={styles.table_th}>
        {header.label}
      </th>
    ));
  };

  return (
    <table className={styles.table_container}>
      <thead className={styles.table_head}>
        <tr>
          <th className={styles.table_th}></th>
          {renderHeader()}
        </tr>
      </thead>
      <tbody>
        {questionList.map((qusetion: any, idx: number) => (
          <tr key={idx}>
            <td className={styles.table_td}>
              {qusetion.no}.{qusetion.content}
            </td>
            {optionList.map((option: any, index: number) => (
              <td
                key={index}
                className={`${styles.table_td} ${styles.checkable}`}
                onClick={() => handleCheckboxChange(qusetion, option, idx)}
              >
                {checkedOptions[idx].answer === option.label && (
                  <CheckOutlined />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchingTable;
