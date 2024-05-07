import React, { useMemo, useRef, useState, useCallback } from "react";
import { Form, Input, Select, Radio, Checkbox, Card, Button } from "antd";
import Upload from "../upload";
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
  onSubmit: (form: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formData,
  formConfig,
  formItemsConfig,
  formType,
  setForm,
  onSubmit,
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

  const renderComponent = (
    item: any,
    index: number,
    field: any = null,
    idx: number = 0
  ) => {
    const {
      visible,
      name,
      onClick,
      onChange,
      wrapperCol,
      addText,
      rowKey,
      addTableRow,
      fileType,
      multiple,
      fileLimit,
      changeFile,
      files,
      ..._item
    } = item;
    const components: any = {
      Input: (
        <Input {..._item} onChange={(e) => onChange && onChange(e, field)} />
      ),
      TextArea: (
        <TextArea {..._item} onChange={(e) => onChange && onChange(e, field)} />
      ),
      Select: (
        <Select {..._item} onChange={(e) => onChange && onChange(e, field)} />
      ),
      Radio: (
        <Radio.Group
          {..._item}
          onChange={(e) => onChange && onChange(e, field)}
        />
      ),
      Checkbox: (
        <Checkbox.Group
          {..._item}
          onChange={(e) => onChange && onChange(e, field)}
        />
      ),
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
        <TableEdit
          addText={addText}
          rowKey={rowKey}
          pagination={false}
          field={field}
          addTableRow={addTableRow}
          columns={item.columns}
          updateTableData={(record, column, field, idx) => {
            const _data = { ...data };
            _data.items[field.name][item.name][idx][column.key] =
              record[column.key];
            setData(_data);
            form.setFieldValue(
              ["items", field.name, item.name],
              _data.items[field.name][item.name]
            );
          }}
          dataList={
            formType === "list"
              ? data.items[field.name][item.name]
              : data[item.name]
          }
          loading={false}
        />
      ),
      Upload: (
        <Upload
          fileType={fileType}
          multiple={multiple}
          fileLimit={fileLimit}
          files={data.items[field.name][item.name]}
          changeFile={(e) => {
            form.setFieldValue(["items", field.name, item.name], e);
          }}
        />
      ),
    };

    const normFile = (e: any) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    return (
      (typeof item.visible === "function" ? item.visible(field) : true) && (
        <Form.Item
          {..._item}
          wrapperCol={item.wrapperCol}
          key={formType === "item" ? index : [field.name, index]}
          name={formType === "item" ? name : [field.name, name]}
          {...(item.type === "Upload"
            ? { valuePropName: item.name, getValueFromEvent: normFile }
            : {})}
        >
          {components[item.type]}
          {item.tip && <p>{item.tip}</p>}
        </Form.Item>
      )
    );
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
                        if (field.name > 0) remove(field.name);
                      }}
                    />
                  }
                >
                  {formItemsConfig.map((item: any, index: number) =>
                    renderComponent(item, index, field, idx)
                  )}
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => {
                  const obj = initializeObject(
                    data.items[0],
                    ["no", "label"],
                    ["matching_options", "question_list"]
                  );
                  add(obj);
                  setForm(obj);
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
        <Button
          type="primary"
          onClick={async () => {
            try {
              const values = await form.validateFields();
              console.log(values, "formData");
            } catch (err) {
              console.log(err, "error");
            }
          }}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
