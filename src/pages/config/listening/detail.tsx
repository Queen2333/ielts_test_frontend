import React, { useState } from "react";
import styles from "./styles.module.less";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Card, Button, Form, Tag, Input, Select, message } from "antd";
import type { TabsProps } from "antd";
import Upload from "../../../components/upload";
import DynamicForm from "../../../components/dynamicForm";
import cloneDeep from "lodash/cloneDeep";

interface questionType {
  no: string;
  question?: string;
  options: any[];
  answer: null | string | any[];
  answer_count?: null | number;
  content?: string;
  matchedOption?: null | any;
  isDraggingOver?: boolean;
}

interface formItemType {
  title: string;
  type: null | string;
  article_content: string;
  picture: any[];
  matching_options: any[];
  question_list: questionType[];
}
interface formListType {
  items: formItemType[];
}

const ListenlingConfigDetail: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("1");
  const location = useLocation();
  const layoutProps = {
    labelCol: {
      span: 3,
      offset: 2,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [formData, setFormData] = useState<formListType[]>(
    Array.from({ length: 4 }, (_, index) => ({
      items: [
        {
          title: "",
          type: null,
          article_content: "",
          picture: [
            {
              url: "https://img.keaitupian.cn/newupload/04/1713949003169283.jpg",
            },
          ],
          matching_options: [{ label: "A", content: "" }],
          question_list: [
            {
              no: String(index * 10 + 1),
              question: "",
              options: [
                { label: "A", value: "" },
                { label: "B", value: "" },
                { label: "C", value: "" },
              ],
              answer: null,
            },
          ],
        },
      ],
    }))
  );

  const typeOptions = [
    { label: "填空题", value: "fill_in_blanks" },
    { label: "单选题", value: "choice" },
    { label: "多选题", value: "multi_choice" },
    { label: "匹配题", value: "matching" },
    { label: "地图题", value: "map" },
  ];
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const choiceTypeOptions = (type: string) => {
    return type === "choice"
      ? [
          { label: "A", value: "" },
          { label: "B", value: "" },
          { label: "C", value: "" },
        ]
      : [
          { label: "A", value: "" },
          { label: "B", value: "" },
          { label: "C", value: "" },
          { label: "D", value: "" },
          { label: "E", value: "" },
        ];
  };
  const findNo = (part: number, fieldIdx: number) => {
    if (fieldIdx === 0) {
      return String(
        part * 10 + formData[part].items[0].question_list.length + 1
      );
    }
    let no: number = 0;
    for (let i = 0; i <= fieldIdx; i++) {
      no += formData[part].items[i].question_list.length;
    }

    return String(part * 10 + no + 1);
  };
  const generateNextLabel = (charCode: string) => {
    if (!charCode) return "A";
    const nextCharCode = charCode.charCodeAt(0) + 1;
    return String.fromCharCode(nextCharCode);
  };
  const itemForm = (index: number) => {
    return (
      <DynamicForm
        formType="list"
        formConfig={{
          name: "form" + index,
          height: "calc(100vh - 385px)",
          ...layoutProps,
        }}
        formData={formData[index]}
        setForm={(data) => {
          console.log(data, formData, "change form");
          const newData = [...formData];
          newData[index].items.push(data);
          setFormData(newData);
        }}
        onSubmit={(form) => {
          console.log(form, formData, "form");
        }}
        formItemsConfig={[
          {
            name: "type",
            label: "题型",
            type: "Select",
            wrapperCol: {
              span: 10,
            },
            options: typeOptions,
            placeholder: "请选择",
            rules: [{ required: true, message: "题型不能为空" }],
            onChange: (val: string, field: any) => {
              const arr = [...formData];
              arr[index].items[field.name].type = val;
              arr[index].items[field.name].question_list.map(
                (item: questionType) => {
                  console.log(item, "change type");
                  item.options = choiceTypeOptions(
                    String(arr[index].items[field.name].type)
                  );
                  item.answer =
                    arr[index].items[field.name].type === "choice" ? null : [];
                }
              );
              setFormData(arr);
            },
          },
          {
            name: "title",
            label: "标题",
            type: "Input",
            placeholder: "请输入",
            wrapperCol: {
              span: 10,
            },
            rules: [{ required: true, message: "标题不能为空" }],
          },
          {
            name: "article_content",
            label: "文章内容",
            type: "ReactQuill",
            placeholder: "请输入文章内容",
            wrapperCol: {
              span: 10,
            },
            visible: (field: any) =>
              formData[index].items[field.name].type === "fill_in_blanks",
          },
          {
            name: "picture",
            label: "地图图片",
            type: "Upload",
            fileType: "image",
            multiple: true,
            fileLimit: 5,
            visible: (field: any) =>
              formData[index].items[field.name].type === "map",
            changeFile: (fileList: any[], field: any) => {
              const arr = [...formData];
              arr[index].items[field.name].picture[0].url = fileList[0].url;
              setFormData(arr);
            },
          },
          {
            name: "matching_options",
            label: "选项",
            type: "TableEdit",
            visible: (field: any) =>
              formData[index].items[field.name].type === "matching",
            addText: "新增选项",
            rowKey: "label",
            addTableRow: (field: any) => {
              const arr = [...formData];
              const idx =
                arr[index].items[field.name].matching_options.length - 1;
              arr[index].items[field.name].matching_options.push({
                label: generateNextLabel(
                  arr[index].items[field.name].matching_options[idx]?.label
                ),
                content: "",
              });
              setFormData(arr);
            },
            columns: [
              {
                title: "选项标签",
                key: "label",
                dataIndex: "label",
                placeholder: "请输入选项标签",
                width: 80,
              },
              {
                title: "选项内容",
                key: "content",
                dataIndex: "content",
                width: 300,
                editType: "Input",
                placeholder: "请输入选项内容",
                rows: 3,
              },
            ],
          },
          {
            name: "question_list",
            label: "题目列表",
            type: "TableEdit",
            rowKey: "no",
            visible: (field: any) => formData[index].items[field.name].type,
            addText: "新增题目",
            addTableRow: (field: any) => {
              const arr = [...formData];
              let length: number = 0;
              for (let i = 0; i <= field.name; i++) {
                length += arr[index].items[i].question_list.length;
              }
              if (length >= 10) {
                messageApi.warning("每个Part题目数不能超过10");
                return;
              }
              arr[index].items[field.name].question_list.push({
                no: findNo(index, field.name),
                question: "",
                options: choiceTypeOptions(
                  String(arr[index].items[field.name].type)
                ),
                answer:
                  arr[index].items[field.name].type === "choice" ? null : [],
                answer_count: null,
                content: "",
                matchedOption: null,
                isDraggingOver: false,
              });
              setFormData(arr);
            },
            columns: [
              {
                title: "题号",
                key: "no",
                dataIndex: "no",
                width: 80,
              },
              {
                title: "题干",
                key: "question",
                dataIndex: "question",
                width: 300,
                editType: "TextArea",
                placeholder: "请输入题干",
                rows: 3,
                visible: ({ field }: any) =>
                  ["choice", "multi_choice", "matching", "map"].includes(
                    String(formData[index].items[field.name].type)
                  ),
              },
              {
                title: "选项",
                key: "options",
                dataIndex: "options",
                width: 300,
                render: (
                  text: any[],
                  record: any,
                  _idx: number,
                  field: any
                ) => {
                  return (
                    <div>
                      {text.map((item: any, idx: number) => (
                        <div key={idx} className="flex-alc mb-5">
                          <Tag color="blue">{item.label}</Tag>
                          <Input
                            value={item.value}
                            placeholder="请输入"
                            onChange={(e) => {
                              const _formData = [...formData];
                              _formData[index].items[field.name].question_list[
                                _idx
                              ].options[idx].value = e.target.value;
                              setFormData(_formData);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  );
                },
                visible: ({ field }: any) =>
                  ["choice", "multi_choice"].includes(
                    String(formData[index].items[field.name].type)
                  ),
              },
              {
                title: "答案",
                key: "answer",
                dataIndex: "answer",
                width: 300,
                editType: "Input",
                placeholder: "请输入答案",
                visible: ({ field }: any) =>
                  formData[index].items[field.name].type === "map",
              },
              {
                title: "答案",
                key: "answer",
                mode: (field: any) =>
                  formData[index].items[field.name].type === "multi_choice"
                    ? "multiple"
                    : "",
                dataIndex: "answer",
                minWidth: 120,
                editType: "Select",
                placeholder: "请选择正确答案",
                options: (field: any) => {
                  switch (formData[index].items[field.name].type) {
                    case "choice":
                      return [
                        { label: "A", value: "A" },
                        { label: "B", value: "B" },
                        { label: "C", value: "C" },
                      ];

                    case "multi_choice":
                      return [
                        { label: "A", value: "A" },
                        { label: "B", value: "B" },
                        { label: "C", value: "C" },
                        { label: "D", value: "D" },
                        { label: "E", value: "E" },
                      ];
                    default:
                      return formData[index].items[
                        field.name
                      ].matching_options.map((val) => {
                        return {
                          label: val.label,
                          value: val.label,
                        };
                      });
                  }
                },
                visible: ({ field }: any) =>
                  ["choice", "multi_choice", "matching"].includes(
                    String(formData[index].items[field.name].type)
                  ),
              },
              {
                title: "答案",
                key: "answer",
                dataIndex: "answer",
                width: 120,
                editType: "Input",
                placeholder: "请输入正确答案",
                visible: ({ field }: any) =>
                  formData[index].items[field.name].type === "fill_in_blanks",
              },
            ],
          },
        ]}
      />
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Part 1",
      children: itemForm(0),
    },
    {
      key: "2",
      label: "Part 2",
      children: itemForm(1),
    },
    {
      key: "3",
      label: "Part 3",
      children: itemForm(2),
    },
    {
      key: "4",
      label: "Part 4",
      children: itemForm(3),
    },
  ];

  return (
    <div className={styles.listening_config}>
      {contextHolder}
      <Card>
        <Upload buttonTxt="上传音频" fileType="audio" multiple={true} />
      </Card>

      <Card className="mt-10">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          type="card"
        />
      </Card>
    </div>
  );
};
export default ListenlingConfigDetail;
