import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.less";
import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card, Input, Radio, Space, Button, Checkbox } from "antd";
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
        article_content: `The total rent: Peter £ 110 & Jim £ &#8203;【blank】&#8203;<br/>
          Car parking: in the &#8203;【blank】&#8203;<br/>
          A place to buy things: &#8203;【blank】&#8203;, because Jim works there.<br/>
          The fees they should share: &#8203;【blank】&#8203; fees<br/>`,
        question_list: [
          {
            id: 1,
            no: "1",
            position: 10,
            answer: "",
          },
          {
            id: 2,
            no: "2",
            position: 25,
            answer: "",
          },
          {
            id: 3,
            no: "3",
            position: 40,
            answer: "",
          },
          {
            id: 4,
            no: "4",
            position: 50,
            answer: "",
          },
        ],
      },
      {
        type: "choice",
        title: "Choose One letters, A-D.",
        question_list: [
          {
            id: 5,
            no: "5",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: 6,
            no: "6",
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
            id: 7,
            no: "7-8",
            answer_count: 2,
            question:
              "Which THREE things do Phil and Stella still have to decide on?",
            answer: [],
            options: [
              { label: "A", text: "how to analyse their results" },
              { label: "B", text: "their methods of presentation" },
              { label: "C", text: "the design of their questionnaire" },
              { label: "D", text: "the location of their survey" },
              { label: "E", text: "weather variables to be measured" },
            ],
          },
          {
            id: 9,
            no: "9-10",
            answer_count: 2,
            question:
              "Which THREE things do Phil and Stella still have to decide on?",
            answer: [],
            options: [
              { label: "A", text: "how to analyse their results" },
              { label: "B", text: "their methods of presentation" },
              { label: "C", text: "the design of their questionnaire" },
              { label: "D", text: "the location of their survey" },
              { label: "E", text: "weather variables to be measured" },
            ],
          },
        ],
      },
    ],
  },
  {
    part: "Part 2",
    partNumber: "11-20",
    type_list: [
      {
        type: "matching",
        title:
          "What can you find at each of the places below?Choose the correct answer and move it into the gap.",
        options: [
          { label: "A", text: "flower", id: 1223 },
          { label: "B", text: "grass", id: 1244 },
          { label: "C", text: "glass", id: 1255 },
          { label: "D", text: "tree", id: 1266 },
          { label: "E", text: "leave", id: 1277 },
        ],
        question_list: [
          {
            id: 88,
            no: "11",
            answer: "",
            question: "Anna",
          },
          {
            id: 99,
            no: "12",
            answer: "",
            question: "Benny",
          },
          {
            id: 100,
            no: "13",
            answer: "",
            question: "John",
          },
          {
            id: 111,
            no: "14",
            answer: "",
            question: "James",
          },
        ],
      },
      {
        type: "map",
        title: "",
        question_list: [
          {
            id: 120,
            no: "15-18",
            answer: [],
            answer_count: 4,
            descriptions: [
              { label: "15", text: "" },
              { label: "16", text: "" },
              { label: "17", text: "" },
              { label: "18", text: "" },
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
  const [currentFocus, setCurrentFocus] = useState({
    type: "choice",
    partIndex: 0,
    typeIndex: 0,
    questionIndex: 0,
  });
  const [inputRefs, setInputRefs] = useState(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 10 }, () =>
        useRef({
          focus: () => {},
        })
      )
    )
  );

  useEffect(() => {
    rangy.init();

    // 检查是否已创建 highlighter
    if (!highlighter) {
      let h = highlighter;
      h = rangy.createHighlighter();
      h.addClassApplier(rangy.createClassApplier("highlight"));
      setHighlighter(h);
    }
    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   // 在这里可以添加你的逻辑，比如确认用户是否要离开页面
    //   const message = "您确定要离开吗？";
    //   event.returnValue = message; // 兼容旧版浏览器
    //   return message;
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   // 清除事件监听器
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

  // 切换底部bar题号
  const chooseQuestion = (part: number, question: number) => {
    setPart(part);
    // 找出是哪个type
    const targetPart = questionType[part];
    let typeIndex = 0;
    let question_count = ["multi_choice", "map"].includes(
      targetPart.type_list[0].type
    )
      ? targetPart.type_list[0].question_list[0].answer_count
      : targetPart.type_list[0].question_list.length;
    if (targetPart && targetPart.type_list) {
      while (
        typeIndex < targetPart.type_list.length &&
        question_count - 1 < question
      ) {
        typeIndex++;
        if (
          ["multi_choice", "map"].includes(
            targetPart.type_list?.[typeIndex]?.type
          )
        ) {
          const totalAnswerCount = targetPart.type_list?.[
            typeIndex
          ]?.question_list.reduce(
            (total: number, item: any) => total + item.answer_count,
            0
          );
          question_count += totalAnswerCount;
        } else {
          question_count +=
            targetPart.type_list?.[typeIndex]?.question_list.length;
        }
      }
    }
    console.log(part, typeIndex, question);

    // 聚焦题目
    setCurrentFocus({
      type: targetPart.type_list[typeIndex].type,
      partIndex: part,
      typeIndex,
      questionIndex: question,
    });

    setTimeout(() => {
      if (targetPart.type_list[typeIndex].type === "fill_in_blanks") {
        inputRefs[part][question] && inputRefs[part][question].current.focus();
      }
    }, 0);
  };

  // 切换答案
  const changeChoice = (e: any, index: number, idx: number, type: string) => {
    console.log(e, index, idx, "change");
    switch (type) {
      case "choice":
        e.stopPropagation();
        questionType[part].type_list[index].question_list[idx].answer =
          e.target.value;
        break;
      case "multi_choice":
        questionType[part].type_list[index].question_list[idx].answer = e;
        break;
      case "fill_in_blanks":
        questionType[part].type_list[index].question_list[idx].answer =
          e.target.value;
        break;
    }
    setQuestionType([...questionType]);
  };

  // 选中内容
  const handleSelect = (e: any) => {
    console.log(e, "onMouseUp");
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

  // 聚焦题目事件
  const focusQues = (
    type: string,
    typeIndex: number,
    questionIndex: string
  ) => {
    console.log(type, typeIndex, questionIndex, "focus");
    setCurrentFocus({
      type,
      partIndex: part,
      typeIndex,
      questionIndex: Number(questionIndex) - 1,
    });
  };

  const [items, setItems] = useState([
    { id: "item-1", content: "Option 1" },
    { id: "item-2", content: "Option 2" },
    { id: "item-3", content: "Option 3" },
  ]);

  const [targets, setTargets] = useState([
    { id: "target-1", content: "Target 1", matchedItemId: null },
    { id: "target-2", content: "Target 2", matchedItemId: null },
    { id: "target-3", content: "Target 3", matchedItemId: null },
  ]);

  const handleDragEnd = (result) => {
    console.log("result.draggableId:", result.draggableId);
    console.log("result.destination:", result.destination);
    if (!result.destination) {
      return;
    }

    const sourceItem = items.find((item) => item.id === result.draggableId);
    const target = targets.find(
      (target) => target.id === result.destination.droppableId
    );

    // 更新匹配关系
    if (target) {
      const updatedTargets = [...targets];
      const matchedItem = items.find((item) => item.id === result.draggableId);

      if (matchedItem) {
        const targetIndex = updatedTargets.findIndex((t) => t.id === target.id);
        updatedTargets[targetIndex].matchedItemId = matchedItem.id;
        setTargets(updatedTargets);
      }
    }
  };

  const onDragStart = (result) => {
    console.log("onDragStart", result);
  };

  const onDragUpdate = (result) => {
    console.log("onDragUpdate", result);
  };
  return (
    <div className={styles.step_content}>
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
            <div key={index} onMouseUp={handleSelect}>
              <p className="font-1rem lh-2rem mb-20">{item.title}</p>
              {item.type === "fill_in_blanks" && (
                <div className="lh-3rem mb-30">
                  {item.article_content
                    .split("【blank】")
                    .map((i: any, idx: number) => (
                      <span key={idx}>
                        <span dangerouslySetInnerHTML={{ __html: i }} />
                        {idx < item.question_list.length && (
                          <Input
                            ref={
                              inputRefs[part][
                                Number(item.question_list[idx].no) - 1
                              ]
                            }
                            type="text"
                            className={styles.input_style}
                            value={item.question_list[idx].answer}
                            placeholder={item.question_list[idx].no}
                            onChange={(e) =>
                              changeChoice(e, index, idx, item.type)
                            }
                            onFocus={() =>
                              focusQues(
                                item.type,
                                index,
                                item.question_list[idx].no
                              )
                            }
                          />
                        )}
                      </span>
                    ))}
                </div>
              )}
              <div className="flex-jcb flex-wrap">
                {item.type === "choice" &&
                  item.question_list.map((i: any, idx: number) => (
                    <div key={idx} style={{ width: "50%" }} className="mb-30">
                      <p
                        className={`mb-20 lh-2rem font-1rem fwb pointer ${
                          currentFocus.type === "choice" &&
                          currentFocus.typeIndex === index &&
                          currentFocus.questionIndex === Number(i.no) - 1
                            ? styles.selected_background
                            : ""
                        }`}
                        onClick={() => focusQues(item.type, index, i.no)}
                      >{`${i.no} ${i.question}`}</p>
                      <Radio.Group
                        style={{ fontSize: "1rem" }}
                        value={i.answer}
                        onChange={(e) => changeChoice(e, index, idx, item.type)}
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
                {item.type === "multi_choice" &&
                  item.question_list.map((i: any, idx: number) => (
                    <div key={idx} style={{ width: "50%" }} className="mb-30">
                      <p
                        className={`mb-20 lh-2rem font-1rem fwb pointer ${
                          currentFocus.type === "multi_choice" &&
                          currentFocus.typeIndex === index &&
                          currentFocus.questionIndex >=
                            Number(i.no.split("-")[0]) - 1 &&
                          currentFocus.questionIndex <=
                            Number(i.no.split("-")[1]) - 1
                            ? styles.selected_background
                            : ""
                        }`}
                        onClick={() =>
                          focusQues(item.type, index, i.no.split("-")[0])
                        }
                      >{`${i.no} ${i.question}`}</p>
                      <Checkbox.Group
                        style={{ fontSize: "1rem" }}
                        value={i.answer}
                        onChange={(e) => changeChoice(e, index, idx, item.type)}
                      >
                        <Space direction="vertical">
                          {i.options.map((value: any, id: number) => (
                            <Checkbox
                              value={value.label}
                              key={id}
                              onChange={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              {value.label}. {value.text}
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    </div>
                  ))}
              </div>
              <DragDropContext
                onDragEnd={handleDragEnd}
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
              >
                {item.type === "matching" && (
                  // <div style={{ display: "flex" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Droppable droppableId="items" direction="vertical">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    margin: "5px",
                                    cursor: "move",
                                  }}
                                >
                                  {item.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    <Droppable droppableId="targets" direction="vertical">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {targets.map((target, index) => (
                            <Draggable
                              key={target.id}
                              draggableId={target.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    border: `2px dashed ${
                                      target.matchedItemId ? "green" : "#ccc"
                                    }`,
                                    padding: "10px",
                                    margin: "5px",
                                  }}
                                >
                                  {target.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  // </div>
                )}
              </DragDropContext>
            </div>
          ))}
        </Card>
        <TestBar
          chooseQuestion={chooseQuestion}
          questionList={listeningQuestionNumber}
          currentFocus={currentFocus}
        />
      </div>
    </div>
  );
};

export default ListeningTest;
