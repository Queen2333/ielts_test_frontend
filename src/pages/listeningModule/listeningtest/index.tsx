import React, { useEffect, useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card, Input, Radio, Space } from "antd";
import { listeningQuestionNumber } from "../../common/listeningData";

const questionModule: any[] = [
  {
    part: "Part 1",
    partNumber: "1-10",
    type_list: [
      {
        type: "fill_in_blanks",
        title: "Complete the notes below. Write ONE WORD ONLY for each answer.",
        question: "Name: Anna [blank1]",
        question_list: [
          {
            id: 1,
            no: 1,
            position: 10,
          },
          {
            id: 2,
            no: 2,
            position: 25,
          },
          {
            id: 3,
            no: 3,
            position: 40,
          },
          {
            id: 4,
            no: 4,
            position: 50,
          },
        ],
      },
      {
        type: "choice",
        title: "Choose One letters, A-D.",
        question_list: [
          {
            id: 55,
            no: 5,
            question: "The company deals mostly with:",
            options: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
            ],
          },
          {
            id: 66,
            no: 6,
            question: "The overseas consultants deal mostly with:",
            options: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
            ],
          },
        ],
      },
      {
        type: "multi_choice",
        title: "Choose TWO letters, A-E.",
        question_list: [
          {
            id: 77,
            no: 7,
            question: "",
            options: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
              { label: "E", text: "" },
            ],
          },
          {
            id: 88,
            no: 8,
            question: "",
            options: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
              { label: "E", text: "" },
            ],
          },
        ],
      },
      {
        type: "matching",
        title: "",
        question_list: [
          {
            id: 88,
            no: 9,
            descriptions: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
              { label: "E", text: "" },
            ],
            options: [
              { label: "A", text: "" },
              { label: "B", text: "" },
              { label: "C", text: "" },
              { label: "D", text: "" },
              { label: "E", text: "" },
              { label: "F", text: "" },
              { label: "G", text: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    part: "Part 2",
    partNumber: "11-20",
  },
  {
    part: "Part 3",
    partNumber: "21-30",
  },
  {
    part: "Part 4",
    partNumber: "31-40",
  },
];
const ListeningStep3: React.FC = () => {
  const location = useLocation();
  const [part, setPart] = useState(0);

  const chooseQuestion = (part: number, question: number) => {
    console.log(part, question);
    setPart(part);
  };
  return (
    <div className={styles.step_content}>
      <TestHeader />
      <div className={styles.test_content}>
        <Card>
          <p className={`${styles.part_title} font-28 fwb`}>
            {questionModule[part].part}
          </p>
          <p className={`${styles.part_desc} font-16`}>
            Listen and answer questions {questionModule[part].partNumber}.
          </p>
        </Card>
        <Card className={`${styles.test_card} overflow_auto`}>
          {questionModule[part].type_list.map((item: any, index: number) => (
            <div key={index}>
              <p>{item.title}</p>
              {item.type === "choice" &&
                item.question_list.map((i: any, idx: number) => (
                  <div key={idx}>
                    <p>{`${i.no} ${i.question}`}</p>
                    <Radio.Group value={"A"}>
                      <Space direction="vertical">
                        {i.options.map((value: any, id: number) => (
                          <Radio value={value.label} key={id}>
                            {value.label}. {value.text}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </div>
                ))}
            </div>
          ))}
        </Card>
        <TestBar
          chooseQuestion={chooseQuestion}
          questionList={listeningQuestionNumber}
        />
      </div>
    </div>
  );
};

export default ListeningStep3;
