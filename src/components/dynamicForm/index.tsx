import React, { useMemo, useRef, useState, useCallback } from "react";
import { Form, Input, Select, Radio, Checkbox, Card, Button } from "antd";
const { TextArea } = Input;
import TableEdit from "../dynamicTable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.less";
import { CloseOutlined } from "@ant-design/icons";
import { initializeObject } from "../../utils/index";
import cloneDeep from "lodash/cloneDeep";

interface DynamicFormProps {
  formData: any;
  formConfig: any;
  formItemsConfig: any[];
  formType: string;
  setForm: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formData,
  formConfig,
  formItemsConfig,
  formType,
  setForm,
}) => {
  const editorRef = useRef(null);
  const [form] = Form.useForm();
  const [data, setData] = useState(formData);

  const customButtonHandler = useCallback(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection(true);
      if (range) editor.insertText(range.index, "【blank】");
    }
  }, []);

  const renderComponent = (item: any, index: number, field: any = null) => {
    const { visible, name, onClick, onChange, data, addRow, ..._item } = item;

    const components: any = {
      Input: <Input {...item} />,
      TextArea: <TextArea {...item} />,
      Select: (
        <Select
          {..._item}
          onChange={formType === "item" ? onChange : (e) => onChange(e, field)}
        />
      ),
      Radio: <Radio.Group {...item} />,
      Checkbox: <Checkbox.Group {...item} />,
      ReactQuill: (
        <ReactQuill
          ref={editorRef}
          theme="snow"
          className={styles.react_quill}
          {..._item}
          modules={{
            toolbar: {
              container: [["bold", "italic", "underline"], ["custom"]],
              handlers: {
                custom: customButtonHandler,
              },
            },
          }}
        />
      ),
      TableEdit: (
        <div>
          <Button
            onClick={
              formType === "item" ? item.addRow : (e) => item.addRow(e, field)
            }
            type="primary"
            className="mb-10"
          >
            新增题干
          </Button>
          <TableEdit
            rowKey="no"
            pagination={false}
            columns={item.columns}
            dataList={
              typeof item.data === "function" ? item.data(field) : item.data
            }
            loading={false}
          />
        </div>
      ),
    };
    return typeof item.visible === "function" ? (
      item.visible(field) && (
        <Form.Item
          {..._item}
          key={formType === "item" ? index : [field.name, index]}
          name={formType === "item" ? name : [field.name, name]}
        >
          {components[item.type]}
          {item.tip && <p>{item.tip}</p>}
        </Form.Item>
      )
    ) : (
      <Form.Item
        {..._item}
        key={formType === "item" ? index : [field.name, index]}
        name={formType === "item" ? name : [field.name, name]}
      >
        {components[item.type]}
        {item.tip && <p>{item.tip}</p>}
      </Form.Item>
    );
  };

  const submitForm = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      {...formConfig}
      form={form}
      initialValues={data}
      className="overflow_auto"
      style={{
        width: formConfig.width + "px",
        height: formConfig.height,
      }}
      onFinish={submitForm}
    >
      {formType === "item" &&
        formItemsConfig.map((item: any, index: number) =>
          renderComponent(item, index)
        )}
      {formType === "list" && (
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field, idx) => (
                <Card
                  size="small"
                  title={`题型 ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  {formItemsConfig.map((item: any, index: number) =>
                    renderComponent(item, index, field)
                  )}
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  setForm(initializeObject(data.items[0]));
                }}
                block
              >
                + 添加题型
              </Button>
            </div>
          )}
        </Form.List>
      )}
      <Form.Item
        wrapperCol={{
          ...formConfig.wrapperCol,
          offset: formType === "item" ? 5 : 0,
        }}
        className="mt-20"
      >
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
