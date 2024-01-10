import React, { useEffect, useState, useRef } from "react";
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
    partNumber: "1-13",
    article: `<h3 style="text-align: center; font-weight: bold">Phi Phi Island Resort</h3><br>
      The “Phi Phi Island Resort” is located in Phi Phi Leh island in Thailand, between the large island of Phuket and the west Strait of Malacca coast of the mainland. Phi Phi consists of six small islands 46km south of Phuket. Fine sandy beaches give way to soaring limestone cliffs to form spectacular scenery. Add crystal clear water, a refreshing lack of roads, plus a laid-back lifestyle, and it's easy to see why Phi Phi is one of southern Thailand's most popular destinations. <br>
      <br>
      The islands are administratively part of Krabi province. Ko Phi Phi is the largest island of the group, and is the most populated island of the group, although the beaches of the second largest island, Ko Phi Phi Leh are visited by many people as well. The rest of the islands in the group, including Bida Nok, Bida Noi, and Bamboo Island are not much more than large limestone rocks jutting out of the sea. The Islands are reachable by speedboats or Long-tail boats most often from Krabi Town or from various piers in Phuket Province. <br>
      <br>
      The islands came to worldwide prominence when Ko Phi Phi was used as a location for the 2000 BritishAmerican film The Beach. This attracted criticism, with claims that the film company had damaged the island's environment, since the producers bulldozed beach areas and planted palm trees to make it resemble description in the book, an accusation the film's makers contest. An increase in tourism was attributed to the film's release, which resulted in increases in waste on the Islands, and more developments in and around the Phi Phi Don Village. <br>
      <br>
      Unlike its larger brother Ko Phi Phi, Phi Phi Leh is a virgin island - it is almost untouched by human civilization. Surrounded by sheer limestone walls dotted with caves and passages the island's shallow blue-green lagoons and coral gardens are a snorkeler’s paradise. The island also has two magnificent beaches, Loh Samah and Maya Bay. <br>
      <br>
      The climate on Phi Phi Leh island is influenced by tropical monsoon winds. There are two seasons: the rainy season from May till December and the hot season from January till April. Average temperature ranges between 17–37 degrees Celsius. Average rainfall per year is about 2,231 millimetres, wettest in July and driest in February. <br>
      <br>
      The “Phi Phi Island Resort” is an eco-friendly hotel that aims at providing excellent service without hurting the local environment. This dreamy lodging in Thailand is as environmentally friendly as it gets. The building itself is built with natural materials, such as local stone and wood. Moreover, all utilities (such as cutlery, hygiene items, towels, kitchen utensils) are made of bio-degradable materials. <br>
      <br>
      The pool is created in the local stone quarry, so that the harmony of local landscape was not infringed.Since the water in the pool is replete with natural salts and minerals, there is no need in further disinfection with chlorinated compounds and the pool is absolutely chemical-free. <br>
      <br>
      The hotel provides soaps, gels and creams, which are all natural and organic. Waste is recycled to the garden via a bio-cycle septic system, and “Phi Phi Island Resort” uses hydro-electricity from a Pelton wheel and solar power. <br>
      <br>
      The restaurant values locally sourced products. That’s why only locally grown vegetables and fruits along with natural sea products are served. The resort ensures that fishing and croppage don’t contravene the local equilibrium of the island. <br>
      <br>
      Diving and snorkeling at Phi Phi Leh Island are excellent. Many dive companies offer all-inclusive trips only in this location. And other little secluded islands are accessible from “Phi Phi Island Resort” by long-tail boats. Visitors can take advantage of the free bike rentals, free shuttle service in an electric vehicle and even green spa, with all organic products. <br>
      <br>
      On the other hand, this beautiful resort combines the seclusion much sought after in Thailand with refinement of a 4.5 star resort. Privacy is certain on 70 tranquil acres of swaying coconut palms, fragrant gardens, and a half-mile of sparkling shore overlooking the crystal Andaman Sea. Spacious and secluded bungalows conform comfortably to the natural surroundings, welcoming stunning coastal vistas and cool sea breezes. Stylish furnishings, gracious hospitality and a private 800 metres stretch of pristine white sand beach lapped by the turquoise waters of the Andaman Sea create an idyllic setting for a green and calm holiday.`,
    type_list: [
      {
        type: "true_or_false",
        question_list: [
          {
            id: 1,
            no: "1",
            question: "Phi Phi is located 46km south of Phuket.",
            answer: "",
          },
          {
            id: 2,
            no: "2",
            question: "Phi Phi is located 46km south of Phuket.",
            answer: "",
          },
          {
            id: 3,
            no: "3",
            question: "Phi Phi is located 46km south of Phuket.",
            answer: "",
          },
          {
            id: 4,
            no: "4",
            question: "Phi Phi is located 46km south of Phuket.",
            answer: "",
          },
          {
            id: 5,
            no: "5",
            question: "Phi Phi is located 46km south of Phuket.",
            answer: "",
          },
        ],
      },
      {
        type: "choice",
        question_list: [
          {
            id: 6,
            no: "6",
            question:
              "After the space ship didn't show up on the fateful day, the members of flying saucer doomsday cult",
            answer: "",
            options: [
              {
                label: "A",
                text: "didn't want to admit the uncomfortable truth and still believed that the world would self destruct.",
              },
              {
                label: "B",
                text: "were embarrassed and humiliated because of their failure.",
              },
              {
                label: "C",
                text: "wanted media attention to say that they saved the planet.",
              },
            ],
          },
          {
            id: 7,
            no: "7",
            question:
              "The main reason why people fight cognitive dissonance is",
            answer: "",
            options: [
              { label: "A", text: "a desire to reduce the inner tension." },
              {
                label: "B",
                text: "people's unwillingness to accept their mistakes.",
              },
              {
                label: "C",
                text: "wish to avoid the awkward feeling of lying for not a good reason.",
              },
            ],
          },
        ],
      },
      {
        type: "multi_choice",
        question_list: [
          {
            id: 8,
            no: "8-10",
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
            id: 9,
            no: "11-13",
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
    part: "Part 2",
    partNumber: "14-26",
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
    partNumber: "27-40",
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
];
const ReadingTest: React.FC = () => {
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
      case "true_or_false":
        e.stopPropagation();
        questionType[part].type_list[index].question_list[idx].answer =
          e.target.value;
        break;
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

  const computeQuestion = (item: any) => {
    const length = item.question_list.length;
    if (item.type === "multi_choice") {
      return `${item.question_list[0].no.split("-")[0]}${
        length > 1
          ? `-${Number(item.question_list[length - 1].no.split("-")[1])}`
          : ""
      }`;
    }
    return `${item.question_list[0].no}${
      length > 1 ? `-${Number(item.question_list[0].no) + length - 1}` : ""
    }`;
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
          <p className={`${styles.part_desc} font-16`}>
            Read the text below and answer questions
            {questionType[part].partNumber}.
          </p>
        </Card>
        <Card className={`${styles.test_card}`}>
          <div className="flex-jcb" onMouseUp={handleSelect}>
            {/* 文章内容 start*/}
            <div
              className={`overflow_auto ${styles.article_style}`}
              dangerouslySetInnerHTML={{ __html: questionType[part].article }}
            ></div>
            {/* 文章内容 end*/}
            {/* 题目 start */}
            <div
              style={{
                width: "40%",
                height: "calc(100vh - 310px)",
                padding: "10px",
              }}
              className="overflow_auto"
            >
              {questionType[part].type_list.map((item: any, index: number) => (
                <div key={index} className="font-16 lh-30">
                  <p className="fwb">{`Questions ${computeQuestion(item)}`}</p>
                  {item.type === "true_or_false" && (
                    <div>
                      <div>
                        <p>
                          {`Do the following statements agree with the information
                          given in Reading Passage ${part + 1} ?`}
                        </p>
                        <p className="mb-10">
                          {`In boxes ${computeQuestion(
                            item
                          )} on your answer sheet, write`}
                        </p>
                        <p className={`flex-alc`}>
                          <span className={styles.title_left}>TRUE</span>
                          <span>
                            if the statement is true according to the passage
                          </span>
                        </p>
                        <p className={`flex-alc`}>
                          <span className={styles.title_left}>FALSE</span>
                          <span>
                            if the statement is false according to the passage
                          </span>
                        </p>
                        <p className={`flex-alc mb-10`}>
                          <span className={styles.title_left}>NOT GIVEN</span>
                          <span>
                            if the information is not given in the passage
                          </span>
                        </p>
                      </div>
                      {item.question_list.map((i: any, idx: number) => (
                        <div key={idx} className="mb-30">
                          <p
                            className={`mb-20 lh-2rem font-1rem fwb pointer ${
                              currentFocus.type === "true_or_false" &&
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
                            onChange={(e) =>
                              changeChoice(e, index, idx, item.type)
                            }
                          >
                            <Space direction="vertical">
                              <Radio value="TRUE">TRUE</Radio>
                              <Radio value="FALSE">FALSE</Radio>
                              <Radio value="NOT GIVEN">NOT GIVEN</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
                      ))}
                    </div>
                  )}
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
                  {item.type === "choice" && (
                    <div>
                      <p>Choose the correct letter.</p>
                      <p className="mb-10">
                        {`Write the correct letter in boxes ${computeQuestion(
                          item
                        )} on your answer
                        sheet.`}
                      </p>
                      {item.question_list.map((i: any, idx: number) => (
                        <div key={idx} className="mb-30">
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
                            onChange={(e) =>
                              changeChoice(e, index, idx, item.type)
                            }
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
                  )}
                  {item.type === "multi_choice" &&
                    item.question_list.map((i: any, idx: number) => (
                      <div key={idx} className="mb-30">
                        <p>{`Choose ${i.answer_count} correct answers.`}</p>
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
                          onChange={(e) =>
                            changeChoice(e, index, idx, item.type)
                          }
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
            </div>
            {/* 题目 end */}
          </div>
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

export default ReadingTest;
