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
import { listeningQuestionNumber } from "../../common/listeningData";
import MarkDialog from "../../../components/markDialog";
import DragNDrop from "../../../components/dragNDrop";

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
          The fees they should share: &#8203;【blank】&#8203; fees<br/>
          `,
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
          { label: "A", content: "flower", id: "1223" },
          { label: "B", content: "grass", id: "1244" },
          { label: "C", content: "glass", id: "1255" },
          { label: "D", content: "tree", id: "1266" },
          { label: "E", content: "leave", id: "1277" },
        ],
        question_list: [
          {
            id: "88",
            no: "11",
            content: "Anna",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: "99",
            no: "12",
            content: "Benny",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: "100",
            no: "13",
            content: "John",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: "111",
            no: "14",
            content: "James",
            matchedOption: null,
            isDraggingOver: false,
          },
        ],
      },
      {
        type: "map",
        title:
          "Label the map below.Write the correct letter, A-E, next to questions 16-20.",
        picture: "https://ieltscat-oss.xdf.cn/1004/1592987703205371.png",
        question_list: [
          {
            id: "120",
            no: "15",
            answer_count: 6,
            content: "residents",
            answer: "",
          },
          {
            id: "121",
            no: "16",
            answer_count: 6,
            content: "railway",
            answer: "",
          },
          {
            id: "122",
            no: "17",
            answer_count: 6,
            content: "playground",
            answer: "",
          },
          {
            id: "123",
            no: "18",
            answer_count: 6,
            content: "mountains",
            answer: "",
          },
          {
            id: "124",
            no: "19",
            answer_count: 6,
            content: "garden",
            answer: "",
          },
          {
            id: "125",
            no: "20",
            answer_count: 6,
            content: "hotel",
            answer: "",
          },
        ],
      },
    ],
  },
  {
    part: "Part 3",
    partNumber: "21-30",
    type_list: [
      {
        type: "choice",
        title: "Choose One letters, A-D.",
        question_list: [
          {
            id: "125",
            no: "21",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: "126",
            no: "22",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: "127",
            no: "23",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: "128",
            no: "24",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
        ],
      },
      {
        type: "multi_choice",
        title: "Choose TWO letters, A-E.",
        question_list: [
          {
            id: "129",
            no: "25-27",
            answer_count: 3,
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
            id: "130",
            no: "28-30",
            answer_count: 3,
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
    part: "Part 4",
    partNumber: "31-40",
    type_list: [
      {
        type: "fill_in_blanks",
        title: "Complete the notes below. Write ONE WORD ONLY for each answer.",
        article_content: `The total rent: Peter £ 110 & Jim £ &#8203;【blank】&#8203;<br/>
          Car parking: in the &#8203;【blank】&#8203;<br/>
          A place to buy things: &#8203;【blank】&#8203;, because Jim works there.<br/>
          The fees they should share: &#8203;【blank】&#8203; fees<br/>
          Recent interview:<br/>
          A company is not one entity comprised of components, but a living organism composed of cells.<br/>
          Manjeet's motto is&#8203;【blank】&#8203;<br/>
          The rate of staff turnover has been reduced.<br/>
          A &#8203;【blank】&#8203;can be from any other company.<br/>
          Grades are not used for&#8203;【blank】&#8203;<br/>
          The complaint form known as a &#8203;【blank】&#8203;has access to all employees online.<br/>
          The manager can receive any complaints concerning air conditioning, food quality and &#8203;【blank】&#8203;entitlement.<br/>
          A &#8203;【blank】&#8203;on the anonymous complaint was introduced in the new system.<br/>`,
        question_list: [
          {
            id: "131",
            no: "31",
            position: 10,
            answer: "",
          },
          {
            id: "132",
            no: "32",
            position: 25,
            answer: "",
          },
          {
            id: "133",
            no: "33",
            position: 40,
            answer: "",
          },
          {
            id: "134",
            no: "34",
            position: 50,
            answer: "",
          },
          {
            id: "135",
            no: "35",
            position: 50,
            answer: "",
          },
          {
            id: "136",
            no: "36",
            position: 50,
            answer: "",
          },
          {
            id: "137",
            no: "37",
            position: 50,
            answer: "",
          },
          {
            id: "138",
            no: "38",
            position: 50,
            answer: "",
          },
          {
            id: "139",
            no: "39",
            position: 50,
            answer: "",
          },
          {
            id: "140",
            no: "40",
            position: 50,
            answer: "",
          },
        ],
      },
    ],
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

  const findTypeIndex = (targetPart: any, question: number) => {
    let typeIndex = 0;
    let question_count = ["multi_choice"].includes(targetPart.type_list[0].type)
      ? targetPart.type_list[0].question_list[0].answer_count
      : targetPart.type_list[0].question_list.length;
    if (targetPart && targetPart.type_list) {
      while (
        typeIndex < targetPart.type_list.length &&
        question_count - 1 < question
      ) {
        typeIndex++;
        if (
          ["multi_choice"].includes(targetPart.type_list?.[typeIndex]?.type)
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
    return typeIndex;
  };

  // 切换底部bar题号
  const chooseQuestion = (part: number, question: number) => {
    setPart(part);
    // 找出是哪个type
    const targetPart = questionType[part];
    const typeIndex = findTypeIndex(targetPart, question);
    console.log(part, typeIndex, question);

    // const _questionNo =
    // 聚焦题目
    setCurrentFocus({
      type: targetPart.type_list[typeIndex].type,
      partIndex: part,
      typeIndex,
      questionIndex: question,
    });

    setTimeout(() => {
      if (
        ["fill_in_blanks", "map"].includes(targetPart.type_list[typeIndex].type)
      ) {
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
      case "map":
        questionType[part].type_list[index].question_list[idx].answer =
          e.target.value;
        break;
    }
    setQuestionType([...questionType]);
  };

  // 选中内容
  const handleSelect = (e: any) => {
    // console.log(e, "onMouseUp");
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
    const _questionIndex: number = formatNo(questionIndex);
    setCurrentFocus({
      type,
      partIndex: part,
      typeIndex,
      questionIndex: _questionIndex,
    });
  };

  const formatNo = (no: string) => {
    return Number(no) % 10 > 0
      ? (Number(no) % 10) - 1
      : Number(no) >= 10
      ? 9
      : Number(no) - 1;
  };

  // 匹配题拖拽结束
  const dropEnd = (targets: any[]) => {
    console.log(targets, "targets");
  };

  // 匹配题focus
  const clickTarget = (no: string) => {
    const targetPart = questionType[part];
    const _questionIndex: number = formatNo(no);
    const typeIndex = findTypeIndex(targetPart, _questionIndex);

    setCurrentFocus({
      type: "matching",
      partIndex: part,
      typeIndex,
      questionIndex: _questionIndex,
    });
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
                                formatNo(item.question_list[idx].no)
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
                          currentFocus.questionIndex === formatNo(i.no)
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
                            formatNo(i.no.split("-")[0]) &&
                          currentFocus.questionIndex <=
                            formatNo(i.no.split("-")[1])
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

              {item.type === "matching" && (
                <div className="mb-30">
                  <DragNDrop
                    optionList={item.options}
                    targetList={item.question_list}
                    currentFocus={currentFocus}
                    dropEnd={dropEnd}
                    clickTarget={clickTarget}
                  />
                </div>
              )}
              {item.type === "map" && (
                <div>
                  <img src={item.picture} alt="" className="mb-20" />
                  <div className="lh-3rem mb-30">
                    {item.question_list.map((i: any, idx: number) => (
                      <div key={idx} className="flex-alc">
                        <div className="mr-5">
                          {i.no}. {i.content}
                        </div>
                        <Input
                          ref={
                            inputRefs[part][
                              formatNo(item.question_list[idx].no)
                            ]
                          }
                          type="text"
                          className={styles.input_style}
                          value={item.question_list[idx].answer}
                          placeholder={item.question_list[idx].no}
                          onChange={(e) =>
                            changeChoice(e, index, idx, item.type)
                          }
                          onFocus={() => focusQues(item.type, index, i.no)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
