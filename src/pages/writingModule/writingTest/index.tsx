import React, { useEffect, useState, useRef, useMemo } from "react";
import styles from "./styles.module.less";
import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card, Input } from "antd";
import MarkDialog from "../../../components/markDialog";
import mapIcon from "../../../assets/map.png";
const questionModule: any[] = [
  {
    part: "Part 1",
    title:
      "The graph below gives information about the percentage of the population in four Asian countries living in cities from 1970 to 2020, with predictions for 2030 and 2040.",
    subTitle:
      "Summarise the information by selecting and reporting the main features",
    img: mapIcon,
  },
  {
    part: "Part 2",
    title:
      "Some university students want to learn about other subjects in addition totheir main subjects. Others believe it is more important to give all their time and attention to studying for a qualification.Discuss both these views and give your own opinion.",
    subTitle:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
  },
];
const writingQuestionNumber: any[] = [
  {
    title: "Part1",
    children: [{ idx: 1, isReview: false, checked: true }],
  },
  {
    title: "Part2",
    children: [{ idx: 2, isReview: false, checked: false }],
  },
];
const WritingTest: React.FC = () => {
  // const location = useLocation();
  const [part, setPart] = useState(0);
  const [questionType, setQuestionType] = useState(questionModule);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [showMark, setShowMark] = useState(false);
  const [highlighter, setHighlighter] = useState<any>(null);
  const [selectionRange, setSelectionRange] = useState<any>(null);
  const [selection, setSelection] = useState<any>(null);
  const [currentFocus, setCurrentFocus] = useState({
    type: "writing",
    partIndex: 0,
    typeIndex: 0,
    questionIndex: 0,
  });

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

  // 切换底部bar题号
  const chooseQuestion = (part: number, question: number) => {
    setPart(part);
    // 找出是哪个type
    const targetPart = questionType[part];
    // const typeIndex = findTypeIndex(targetPart, question);
    console.log(part, question, "change");

    // 聚焦题目
    setCurrentFocus({
      type: "writing",
      partIndex: part,
      typeIndex: 0,
      questionIndex: question,
    });
  };

  // 选中内容
  const handleSelect = (e: any) => {
    try {
      setShowMark(false);
      const sel = rangy.getSelection();
      const _selectionRange = sel.getRangeAt(0);
      const text = _selectionRange.toString();

      if (text) {
        setSelection(sel);
        setSelectionRange(_selectionRange);
        setShowMark(true);
        setMousePosition([e.clientX, e.clientY]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 操作笔记或者高亮等
  const handleMark = () => {
    setShowMark(false);
  };

  return (
    <div className={styles.step_content}>
      <TestHeader type="reading" seconds={3600} />
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
        </Card>
        <Card className={`${styles.test_card}`}>
          <div className="flex-jcb" onMouseUp={handleSelect}>
            {/* 题目内容 start*/}
            <div
              id="article-content"
              className={`overflow_auto ${styles.article_style}`}
            >
              {part === 1 && (
                <p className="font-1rem lh-2rem mb-20">
                  Write about the following topic:
                </p>
              )}
              <p className="fwb font-1rem lh-2rem mb-20">
                {questionType[part].title}
              </p>
              <p className="font-1rem lh-2rem">{questionType[part].subTitle}</p>
              <p className="mb-20">
                {part === 0
                  ? "Write at least 150 words."
                  : "Write at least 250 words."}
              </p>
              {questionType[part].img && (
                <img
                  src={questionType[part].img}
                  alt=""
                  className={styles.charts_img}
                />
              )}
            </div>
            {/* 题目内容 end*/}
            {/* 答题框 start */}
            <div
              style={{
                width: "40%",
                height: "calc(100vh - 310px)",
                padding: "10px",
              }}
              className="overflow_auto"
            >
              <Input.TextArea
                showCount
                maxLength={part === 0 ? 150 : 250}
                style={{ height: 320 }}
              />
            </div>
            {/* 答题框 end */}
          </div>
        </Card>
        <TestBar
          chooseQuestion={chooseQuestion}
          questionList={writingQuestionNumber}
          currentFocus={currentFocus}
        />
      </div>
    </div>
  );
};

export default WritingTest;
