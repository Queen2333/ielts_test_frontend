import React, { useState } from "react";
import styles from "./styles.module.less";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Card, Button, Form, Tag, Input, message } from "antd";
import type { TabsProps } from "antd";
import Upload from "../../../components/upload";
import DynamicForm from "../../../components/dynamicForm";
import cloneDeep from "lodash/cloneDeep";

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
  const [formData, setFormData] = useState(
    Array.from({ length: 4 }, (_, index) => ({
      items: [
        {
          title: "",
          type: null,
          article_content: "",
          question_list: [
            {
              no: "1",
              question: "",
              options: [
                { label: "A", value: "" },
                { label: "B", value: "" },
                { label: "C", value: "" },
                { label: "D", value: "" },
              ],
              answer: "",
            },
          ],
        },
      ],
    }))
  );
  const [options, setOptions] = useState(
    Array.from({ length: 4 }, (_, idx) =>
      Array.from({ length: 10 }, (_, index) => ({
        label: idx * 10 + index + 1,
        value: idx * 10 + index + 1,
        disabled: false,
      }))
    )
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

  const itemForm = (index: number) => {
    return (
      <DynamicForm
        formType="list"
        formConfig={{
          name: "form" + index,
          height: "calc(100vh - 385px)",
          ...layoutProps,
        }}
        setForm={(data) => {
          console.log(data, formData, "change form");
          const newData = [...formData];

          newData[index].items.push(data);
          setFormData(newData);
        }}
        formItemsConfig={[
          {
            name: "type",
            label: "题型",
            type: "Select",
            options: typeOptions,
            placeholder: "请选择",
            rules: [{ required: true, message: "题型不能为空" }],
            onChange: (val: string, field: any) => {
              const arr = cloneDeep(formData);
              arr[index].items[field.name].type = val;
              setFormData(arr);
            },
          },
          {
            name: "title",
            label: "标题",
            type: "Input",
            placeholder: "请输入",
            rules: [{ required: true, message: "标题不能为空" }],
          },
          {
            name: "question_list",
            label: "题目列表",
            type: "TableEdit",
            addRow: (e: any, field: any) => {
              console.log(e, field, "add");
              const arr = cloneDeep(formData);
              const length = arr[index].items[field.name].question_list.length;
              if (length >= 10) {
                messageApi.open({
                  type: "warning",
                  content: "每个Part题目数不能超过10",
                });
                return;
              }
              arr[index].items[field.name].question_list.push({
                no: "",
                question: "",
                options: [],
                answer: "",
              });
              setFormData(arr);
            },
            data: (field: any) =>
              formData[index].items[field.name].question_list,
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
                width: 400,
                editable: true,
                editType: "TextArea",
                placeholder: "请输入题干",
                rows: 3,
              },
              {
                title: "选项",
                key: "options",
                dataIndex: "options",
                width: 300,
                render: (text: any[]) => {
                  return (
                    <div>
                      {text.map((item, index) => (
                        <div key={index} className="flex-alc mb-5">
                          <Tag color="blue">{item.label}</Tag>
                          <Input value={item.value} placeholder="请输入" />
                        </div>
                      ))}
                    </div>
                  );
                },
              },
              {
                title: "答案",
                key: "answer",
                dataIndex: "answer",
                width: 120,
                editable: true,
                editType: "Select",
                placeholder: "请选择正确答案",
                options: [
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "D", value: "D" },
                ],
              },
            ],
          },
          {
            name: "article_content",
            label: "文章内容",
            type: "ReactQuill",
            placeholder: "请输入文章内容",
            visible: (field: any) =>
              formData[index].items[field.name].type === "fill_in_blanks",
          },
        ]}
        formData={formData[index]}
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
        <Upload buttonTxt="上传音频" fileType="audio" />
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
