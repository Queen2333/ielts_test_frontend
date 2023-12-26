import React, { useEffect, useState } from "react";
import styles from "./styles.module.less";
import { Checkbox, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
interface PartProps {
  chooseQuestion: (part: number, question: number) => void;
  questionList: any[];
  currentFocus: {
    partIndex: number;
    questionIndex: number;
  };
}

const TestBar: React.FC<PartProps> = ({
  chooseQuestion,
  questionList,
  currentFocus,
}) => {
  const [partList, setPartList] = useState(questionList);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reviewCheck, setReviewCheck] = useState(false);

  useEffect(() => {
    setReviewCheck(partList[currentPart].children[currentQuestion].isReview);
  }, [partList[currentPart].children[currentQuestion].isReview]);

  useEffect(() => {
    chooseQuestion(currentPart, currentQuestion);
  }, [currentPart, currentQuestion]);

  useEffect(() => {
    // console.log(currentFocus, "currentFocus");
    selectQuestion(currentFocus.partIndex, currentFocus.questionIndex);
  }, [currentFocus.partIndex, currentFocus.questionIndex]);

  const onChange = (e: CheckboxChangeEvent) => {
    partList[currentPart].children[currentQuestion].isReview = e.target.checked;
    setReviewCheck(partList[currentPart].children[currentQuestion].isReview);
    setPartList(partList);
  };

  const selectQuestion = (index: number, idx: number) => {
    setCurrentPart(index);
    setCurrentQuestion(idx);
    const updatedPartList = partList.map((item) => {
      return {
        ...item,
        children: item.children.map((child: any) => ({
          ...child,
          checked: false,
        })),
      };
    });
    updatedPartList[index].children[idx].checked = true;
    setPartList(updatedPartList);
  };

  const changeQuestion = (type: string) => {
    console.log(type, "type");
    if (type === "prev") {
      if (currentPart === 0 && currentQuestion === 0) return; // part1 question1
      if (currentQuestion === 0) {
        // question1 非part1
        selectQuestion(currentPart - 1, 9);
        return;
      }
      selectQuestion(currentPart, currentQuestion - 1);
    } else {
      if (currentPart === 3 && currentQuestion === 9) return;
      if (currentQuestion === 9) {
        // question10 非part4
        selectQuestion(currentPart + 1, 0);
        return;
      }
      selectQuestion(currentPart, currentQuestion + 1);
    }
  };

  return (
    <div className={`${styles.bar_box} flex-alc-jcs`}>
      <Checkbox onChange={onChange} checked={reviewCheck}>
        Review
      </Checkbox>
      <Card style={{ flex: 1, minWidth: "500px", overflowX: "auto" }}>
        <div className="flex-alc">
          {partList.map((item, index) => (
            <div key={index} className="flex-alc">
              <div className={`${styles.part_title} fwb`}>{item.title}:</div>
              <div className="flex-alc">
                {item.children.map((i: any, idx: number) => (
                  <div
                    key={i.idx}
                    className={
                      i.checked
                        ? `${styles.question_number} ${styles.checked_question}`
                        : styles.question_number
                    }
                    style={{ borderRadius: i.isReview ? "50%" : "" }}
                    onClick={() => selectQuestion(index, idx)}
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
        <p
          className={
            currentPart === 0 && currentQuestion === 0
              ? `${styles.disabled} ${styles.page_btn}`
              : styles.page_btn
          }
          onClick={() => changeQuestion("prev")}
        >
          <ArrowLeftOutlined />
        </p>
        <p
          className={
            currentPart === 3 && currentQuestion === 9
              ? `${styles.disabled} ${styles.page_btn}`
              : styles.page_btn
          }
          onClick={() => changeQuestion("next")}
        >
          <ArrowRightOutlined />
        </p>
      </div>
    </div>
  );
};

export default TestBar;
