import React from "react";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface pageItem {
  total: number;
  current: number;
  pageSize: number;
}

interface DynamicTableProps {
  columns: ColumnsType<any>;
  dataList: any[];
  pagination?: pageItem;
  loading?: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, dataList, pagination, loading }) => {

  return (
    <Table columns={columns} dataSource={dataList} pagination={pagination} loading={loading}/>
  )
}


export default DynamicTable;