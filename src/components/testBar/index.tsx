import React, { useState } from "react";
import styles from "./styles.module.less";
import { Checkbox, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const part_list: any[] = [
  {
    title: "Part1",
    children: [
      { idx: 1, isReview: false, checked: false },
      { idx: 2, isReview: false, checked: false },
      { idx: 3, isReview: false, checked: false },
      { idx: 4, isReview: false, checked: false },
      { idx: 5, isReview: false, checked: false },
      { idx: 6, isReview: false, checked: false },
      { idx: 7, isReview: false, checked: false },
      { idx: 8, isReview: false, checked: false },
      { idx: 9, isReview: false, checked: false },
      { idx: 10, isReview: false, checked: false },
    ],
  },
  {
    title: "Part2",
    children: [
      { idx: 1, isReview: false, checked: false },
      { idx: 2, isReview: false, checked: false },
      { idx: 3, isReview: false, checked: false },
      { idx: 4, isReview: false, checked: false },
      { idx: 5, isReview: false, checked: false },
      { idx: 6, isReview: false, checked: false },
      { idx: 7, isReview: false, checked: false },
      { idx: 8, isReview: false, checked: false },
      { idx: 9, isReview: false, checked: false },
      { idx: 10, isReview: false, checked: false },
    ],
  },
  {
    title: "Part3",
    children: [
      { idx: 1, isReview: false, checked: false },
      { idx: 2, isReview: false, checked: false },
      { idx: 3, isReview: false, checked: false },
      { idx: 4, isReview: false, checked: false },
      { idx: 5, isReview: false, checked: false },
      { idx: 6, isReview: false, checked: false },
      { idx: 7, isReview: false, checked: false },
      { idx: 8, isReview: false, checked: false },
      { idx: 9, isReview: false, checked: false },
      { idx: 10, isReview: false, checked: false },
    ],
  },
  {
    title: "Part4",
    children: [
      { idx: 1, isReview: false, checked: false },
      { idx: 2, isReview: false, checked: false },
      { idx: 3, isReview: false, checked: false },
      { idx: 4, isReview: false, checked: false },
      { idx: 5, isReview: false, checked: false },
      { idx: 6, isReview: false, checked: false },
      { idx: 7, isReview: false, checked: false },
      { idx: 8, isReview: false, checked: false },
      { idx: 9, isReview: false, checked: false },
      { idx: 10, isReview: false, checked: false },
    ],
  },
];

const TestBar: React.FC = () => {
  const [partList, setPartList] = useState(part_list);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const selectQuestion = (index: number, i: any) => {
    part_list.map((item) => {
      item.children.map((i: any) => {
        i.checked = false;
      });
    });
    console.log(part_list[index], "i");

    part_list[index].children[i.idx - 1].checked = true;
    setPartList(part_list);
  };

  return (
    <div className={`${styles.bar_box} flex-alc-jcs`}>
      <Checkbox onChange={onChange}>Review</Checkbox>
      <Card style={{ flex: 1, minWidth: "500px", overflowX: "auto" }}>
        <div className="flex-alc">
          {partList.map((item, index) => (
            <div key={index} className="flex-alc">
              <div className={`${styles.part_title} fwb`}>{item.title}:</div>
              <div className="flex-alc">
                {item.children.map((i: any) => (
                  <div
                    key={i.idx}
                    className={
                      i.checked
                        ? `${styles.question_number} ${styles.checked_question}`
                        : styles.question_number
                    }
                    onClick={() => selectQuestion(index, i)}
                  >
                    {i.idx}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className={styles.page_btn_group}>
        <p className={styles.page_btn}>
          <ArrowLeftOutlined />
        </p>
        <p className={styles.page_btn}>
          <ArrowRightOutlined />
        </p>
      </div>
    </div>
  );
};

export default TestBar;
