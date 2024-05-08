import React, { useState } from "react";
import styles from "./styles.module.less";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Card, Button, Form, Tag, Input, Select, message } from "antd";
import DynamicForm from "../../../components/dynamicForm";
interface questionType {
  name: string;
  listening_id: string | number | null;
  reading_id: string | number | null;
  writing_id: string | number | null;
}

const TestConfigDetail: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const layoutProps = {
    labelCol: {
      span: 3,
      offset: 2,
    },
    wrapperCol: {
      span: 10,
    },
  };
  const [formData, setFormData] = useState<questionType>({
    name: "",
    listening_id: null,
    reading_id: null,
    writing_id: null,
  });

  return (
    <div className={styles.test_config}>
      {contextHolder}
      <Card style={{ height: "calc(100vh - 212px)" }} className="pt-10">
        <DynamicForm
          formType="item"
          formConfig={{
            name: "form",
            ...layoutProps,
          }}
          formData={formData}
          onSubmit={(form) => {
            console.log(form, formData, "form");
          }}
          formItemsConfig={[
            {
              name: "name",
              label: "套题名称",
              type: "Input",
              placeholder: "请输入测试名称",
            },
            {
              name: "listening_id",
              label: "听力套题",
              type: "Select",
              placeholder: "请选择听力套题",
              options: [{ label: "listening-1", value: 2112 }],
            },
            {
              name: "reading_id",
              label: "阅读套题",
              type: "Select",
              placeholder: "请选择阅读套题",
            },
            {
              name: "writing_id",
              label: "写作套题",
              type: "Select",
              placeholder: "请选择写作套题",
            },
          ]}
        />
      </Card>
    </div>
  );
};
export default TestConfigDetail;
