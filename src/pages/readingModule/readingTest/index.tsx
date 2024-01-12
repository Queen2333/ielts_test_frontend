import React, { useEffect, useState, useRef, useMemo } from "react";
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
            id: 10,
            no: "14",
            content: "Anna",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: 11,
            no: "15",
            content: "Benny",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: 12,
            no: "16",
            content: "John",
            matchedOption: null,
            isDraggingOver: false,
          },
          {
            id: 13,
            no: "17",
            content: "James",
            matchedOption: null,
            isDraggingOver: false,
          },
        ],
      },
      {
        type: "fill_in_blanks",
        title: `Complete the notes.<br>
          Write <span style="font-weight: bold">ONE WORD ONLY</span> from the passage in each gap.`,
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
          The manager can receive any complaints concerning air conditioning, food quality and &#8203;【blank】&#8203;`,
        picture: "https://ieltscat-oss.xdf.cn/1004/1592987703205371.png",
        question_list: [
          {
            id: 14,
            no: "18",
            content: "residents",
            answer: "",
          },
          {
            id: 15,
            no: "19",
            content: "railway",
            answer: "",
          },
          {
            id: 16,
            no: "20",
            content: "playground",
            answer: "",
          },
          {
            id: 17,
            no: "21",
            content: "mountains",
            answer: "",
          },
          {
            id: 18,
            no: "22",
            content: "garden",
            answer: "",
          },
          {
            id: 19,
            no: "23",
            content: "hotel",
            answer: "",
          },
          {
            id: 20,
            no: "24",
            content: "hotel",
            answer: "",
          },
          {
            id: 21,
            no: "25",
            content: "hotel",
            answer: "",
          },
          {
            id: 22,
            no: "26",
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
            id: 23,
            no: "27",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: 24,
            no: "28",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: 25,
            no: "29",
            question: "The company deals mostly with:",
            answer: "",
            options: [
              { label: "A", text: "Big city." },
              { label: "B", text: "Nature holidays." },
              { label: "C", text: "Nepal." },
            ],
          },
          {
            id: 26,
            no: "30",
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
            id: 27,
            no: "31-33",
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
            id: 28,
            no: "34-36",
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
            id: 29,
            no: "37-40",
            answer_count: 4,
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
    e.stopPropagation();
    if (type === "multi_choice") {
      questionType[part].type_list[index].question_list[idx].answer = e;
    } else {
      questionType[part].type_list[index].question_list[idx].answer =
        e.target.value;
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
    const length = readingQuestionNumber[part].children.length;
    return Number(no) % length > 0
      ? (Number(no) % length) - 1
      : Number(no) >= length
      ? length - 1
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

  // 阅读题传入testBar的列表
  const readingQuestionNumber = useMemo(() => {
    let prevPartLastIndex = 0;
    return questionModule.map((part, partIndex) => {
      let count = part.type_list.reduce((total: number, item: any) => {
        return (
          total +
          (item.type === "multi_choice"
            ? item.question_list.reduce(
                (multiTotal: number, multiItem: any) =>
                  multiTotal + multiItem.answer_count,
                0
              )
            : item.question_list.length)
        );
      }, 0);
      const children = Array.from({ length: count }, (_, i) => ({
        idx: i + 1 + prevPartLastIndex,
        isReview: false,
        checked: i === 0,
      }));
      prevPartLastIndex += count;

      return {
        title: `Part${partIndex + 1}`,
        children: children,
      };
    });
  }, [questionModule]);

  const isFocus = (type: string, index: number, no: string) => {
    if (type === "multi_choice") {
      return (
        currentFocus.type === "multi_choice" &&
        currentFocus.typeIndex === index &&
        currentFocus.questionIndex >= formatNo(no.split("-")[0]) &&
        currentFocus.questionIndex <= formatNo(no.split("-")[1])
      );
    }
    return (
      currentFocus.type === type &&
      currentFocus.typeIndex === index &&
      currentFocus.questionIndex === formatNo(no)
    );
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
            {`Read the text below and answer questions ${questionType[part].partNumber}`}
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
                              isFocus("true_or_false", index, i.no)
                                ? styles.selected_background
                                : styles.not_selected
                            } ${styles.question_style}`}
                            onClick={() => focusQues(item.type, index, i.no)}
                          >{`${i.no} ${i.question}`}</p>
                          {isFocus("true_or_false", index, i.no) && (
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
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {item.type === "fill_in_blanks" && (
                    <div className="lh-3rem mb-30">
                      <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
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
                              isFocus("choice", index, i.no)
                                ? styles.selected_background
                                : styles.not_selected
                            } ${styles.question_style}`}
                            onClick={() => focusQues(item.type, index, i.no)}
                          >{`${i.no} ${i.question}`}</p>
                          {isFocus("choice", index, i.no) && (
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
                          )}
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
                            isFocus("multi_choice", index, i.no)
                              ? styles.selected_background
                              : styles.not_selected
                          } ${styles.question_style}`}
                          onClick={() =>
                            focusQues(item.type, index, i.no.split("-")[0])
                          }
                        >{`${i.no} ${i.question}`}</p>
                        {isFocus("multi_choice", index, i.no) && (
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
                        )}
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
          questionList={readingQuestionNumber}
          currentFocus={currentFocus}
        />
      </div>
    </div>
  );
};

export default ReadingTest;
