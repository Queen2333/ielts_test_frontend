import React, { useEffect, useState } from "react";
import { Table, Select, Input, Button } from "antd";
const { TextArea } = Input;
import type { ColumnsType } from "antd/es/table";

interface pageItem {
  total: number;
  current: number;
  pageSize: number;
}

interface ColumnConfig {
  dataIndex: string;
  key: string;
  title: string;
  editType?: string;
  options?: ((field: any) => void) | any[];
  mode?: ((field: any) => void) | string;
  minWidth?: number | string;
  visible?: (row: any) => void;
  render?: (text: any, record: any) => void;
  onChange?: (value: any, field: any, index: number) => void;
}

interface DynamicTableProps {
  columns: ColumnsType<any> & ColumnConfig[];
  dataList: any[];
  pagination?: pageItem | false;
  loading?: boolean;
  rowKey?: string;
  field?: any;
  addText?: string;
  addTableRow?: (field: any) => void;
  updateTableData?: (
    data: any,
    column: ColumnConfig,
    field: any,
    index: number
  ) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  dataList,
  pagination,
  loading,
  rowKey,
  field,
  addText,
  addTableRow,
  updateTableData,
}) => {
  const [data, setData] = useState(dataList);

  const renderEditableCell = (
    record: any,
    column: ColumnConfig,
    index: number
  ) => {
    const {
      dataIndex,
      editType,
      options,
      visible,
      render,
      mode,
      minWidth,
      onChange,
      ..._column
    } = column;

    const components: any = {
      Input: (
        <Input
          {..._column}
          value={record[column.key]}
          onChange={(e) => {
            const newData = [...data];
            newData[index][column.key] = e.target.value;
            setData(newData);
            onChange && onChange(record[column.key], field, index);
            updateTableData && updateTableData(record, column, field, index);
          }}
        />
      ),
      Select: (
        <Select
          options={typeof options === "function" ? options(field) : options}
          mode={typeof mode === "function" ? mode(field) : mode}
          {..._column}
          value={record[column.key]}
          style={{ minWidth: minWidth + "px" }}
          onChange={(val) => {
            const newData = [...data];
            newData[index][column.key] = val;
            setData(newData);
            onChange && onChange(record[column.key], field, index);
            updateTableData && updateTableData(record, column, field, index);
          }}
        />
      ),
      TextArea: (
        <TextArea
          {..._column}
          value={record[column.key]}
          style={{ display: "block" }}
          onChange={(e) => {
            const newData = [...data];
            newData[index][column.key] = e.target.value;
            setData(newData);
            onChange && onChange(record[column.key], field, index);
            updateTableData && updateTableData(record, column, field, index);
          }}
        />
      ),
    };
    return editType ? components[editType] : record[dataIndex];
  };

  const visibleColumns = columns.filter((column: ColumnConfig) => {
    if (!column.visible) return true; // 如果没有visible属性，显示该列
    return data.every((record: any) => column.visible!({ record, field })); // 判断所有行数据是否都满足visible函数条件
  });

  const editableColumns = visibleColumns.map((column: any) => ({
    ...column,
    render: column.editType
      ? (text: any, record: any, index: number) =>
          renderEditableCell(record, column, index)
      : typeof column.render === "function"
      ? (text: any, record: any, index: number) =>
          column.render(text, record, index, field)
      : column.render, // 渲染可编辑单元格
  }));

  const addRow = () => {
    addTableRow && addTableRow(field);
    const newData = [...dataList];
    setData(newData);
  };
  return (
    <div>
      {addText && (
        <Button onClick={addRow} type="primary" className="mb-10">
          {addText}
        </Button>
      )}
      <Table
        rowKey={rowKey}
        columns={editableColumns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
};

export default DynamicTable;
