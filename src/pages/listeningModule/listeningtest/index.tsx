import React, { useEffect, useState } from "react";
import styles from "./styles.module.less";
import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card, Input, Radio, Space, Button } from "antd";
import type { RadioChangeEvent } from "antd";
import { listeningQuestionNumber } from "../../common/listeningData";
import MarkDialog from "../../../components/markDialog";

const questionModule: any[] = [
  {
    part: "Part 1",
    partNumber: "1-10",
    type_list: [
      {
        type: "fill_in_blanks",
        title: "Complete the notes below. Write ONE WORD ONLY for each answer.",
        question: "Name: Anna [blank1]",
        answer: "",
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
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: 66,
            no: 6,
            question: "The overseas consultants deal mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Asia." },
              { label: "B", text: "North America." },
              { label: "C", text: "Europe." },
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
            answer: "",
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
            answer: "",
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
            answer: "",
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
    type_list: [],
  },
  {
    part: "Part 3",
    partNumber: "21-30",
    type_list: [],
  },
  {
    part: "Part 4",
    partNumber: "31-40",
    type_list: [],
  },
];
const ListeningTest: React.FC = () => {
  // const location = useLocation();
  const [part, setPart] = useState(0);
  const [questionType, setQuestionType] = useState(questionModule);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [showMark, setShowMark] = useState(false);
  const [highlighter, setHighlighter] = useState<any>(null);
  const [selectionRange, setSelectionRange] = useState<any>(null);
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    rangy.init();

    // 检查是否已创建 highlighter
    if (!highlighter) {
      let h = highlighter;
      h = rangy.createHighlighter();
      h.addClassApplier(rangy.createClassApplier("highlight"));
      setHighlighter(h);
    }
  }, []);

  const chooseQuestion = (part: number, question: number) => {
    console.log(part, question);
    setPart(part);
  };

  const changeChoice = (e: RadioChangeEvent, index: number, idx: number) => {
    console.log(e, index, idx, "change");
    questionType[part].type_list[index].question_list[idx].answer =
      e.target.value;
    setQuestionType([...questionType]);
  };

  const handleSelect = (e: any) => {
    setShowMark(false);
    const sel = rangy.getSelection();
    setSelection(sel);
    let _selectionRange = selectionRange;
    _selectionRange = sel.getRangeAt(0);
    setSelectionRange(_selectionRange);
    const text = _selectionRange.toString();
    if (text) {
      setShowMark(true);
      setMousePosition([e.clientX, e.clientY]);
    }
  };

  const handleMark = (type: any) => {
    setShowMark(false);
  };
  return (
    <div className={styles.step_content} onMouseUp={handleSelect}>
      <TestHeader />
      <MarkDialog
        mousePosition={mousePosition}
        isShow={showMark}
        handleMark={handleMark}
        selectionRange={selectionRange}
        selection={selection}
      />
      <div className={styles.test_content}>
        <Card>
          <p className={`${styles.part_title} font-28 fwb`}>
            {questionType[part].part}
          </p>
          <p className={`${styles.part_desc} font-16`}>
            Listen and answer questions {questionType[part].partNumber}.
          </p>
        </Card>
        <Card className={`${styles.test_card} overflow_auto`}>
          {questionType[part].type_list.map((item: any, index: number) => (
            <div key={index}>
              <p>{item.title}</p>
              {item.type === "choice" &&
                item.question_list.map((i: any, idx: number) => (
                  <div key={idx}>
                    <p>{`${i.no} ${i.question}`}</p>
                    <Radio.Group
                      value={i.answer}
                      onChange={(e) => changeChoice(e, index, idx)}
                    >
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

export default ListeningTest;
