import React, { useState } from "react";
import styles from "./styles.module.less";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Card, Button, Form, Tag, Input, Select, message } from "antd";
import type { TabsProps } from "antd";
import Upload from "../../../components/upload";
import DynamicForm from "../../../components/dynamicForm";
import cloneDeep from "lodash/cloneDeep";
import CustomizedTest from "../../customizedTest";

interface questionType {
  title: string;
  subtitles: string;
  picture: any;
}

const WritingConfigDetail: React.FC = () => {
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
  const [formData, setFormData] = useState<questionType[]>(
    Array.from({ length: 2 }, (_, index) => ({
      title: "",
      subtitles: "",
      picture: [
        {
          url: "https://img.keaitupian.cn/newupload/04/1713949003169283.jpg",
        },
      ],
    }))
  );

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const itemForm = (index: number) => {
    return (
      <DynamicForm
        formType="item"
        formConfig={{
          name: "form" + index,
          height: "calc(100vh - 335px)",
          ...layoutProps,
        }}
        formData={formData[index]}
        onSubmit={(form) => {
          console.log(form, formData, "form");
        }}
        formItemsConfig={[
          {
            name: "title",
            label: "主标题",
            type: "ReactQuill",
            customBtn: false,
            placeholder: "请输入主标题",
            wrapperCol: {
              span: 10,
            },
          },
          {
            name: "subtitles",
            label: "副标题",
            type: "ReactQuill",
            customBtn: false,
            placeholder: "请输入副标题",
            wrapperCol: {
              span: 10,
            },
          },
          {
            name: "picture",
            label: "图片",
            type: "Upload",
            fileType: "image",
            multiple: true,
            fileLimit: 5,
            visible: () => index === 0,
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
  ];

  return (
    <div className={styles.writing_config}>
      {contextHolder}
      <Input placeholder="请输入该套写作名称" className="w-300 mb-10" />

      <Card style={{ height: "calc(100vh - 265px)" }}>
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
export default WritingConfigDetail;
