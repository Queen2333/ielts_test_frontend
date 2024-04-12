import React from "react";
import { Table, Select, Input } from "antd";
const { TextArea } = Input;
import type { ColumnsType } from "antd/es/table";

interface pageItem {
  total: number;
  current: number;
  pageSize: number;
}

interface ColumnConfig {
  dataIndex: string;
  title: string;
  editable?: boolean;
  editType?: string;
  options?: any[];
}

interface DynamicTableProps {
  columns: ColumnsType<any> & ColumnConfig[];
  dataList: any[];
  pagination?: pageItem | false;
  loading?: boolean;
  rowKey?: string;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  dataList,
  pagination,
  loading,
  rowKey,
}) => {
  const renderEditableCell = (record: any, column: ColumnConfig) => {
    const { dataIndex, editable, editType, options, ..._column } = column;
    const components: any = {
      Input: <Input {..._column} />,
      Select: <Select options={options} {..._column} />,
      TextArea: <TextArea {..._column} style={{ display: "block" }} />,
    };
    return editable ? components[editType] : record[dataIndex];
  };

  const editableColumns = columns.map((column: any) => ({
    ...column,
    render: column.editable
      ? (text: any, record: any) => renderEditableCell(record, column)
      : column.render, // 渲染可编辑单元格
  }));

  return (
    <Table
      rowKey={rowKey}
      columns={editableColumns}
      dataSource={dataList}
      pagination={pagination}
      loading={loading}
    />
  );
};


export default DynamicTable;