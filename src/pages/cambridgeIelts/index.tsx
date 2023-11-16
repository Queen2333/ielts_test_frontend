import React, { useState } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import PartTabs from '../../components/partTabs';
import DynamicTable from "../../components/dynamicTable";

const columns: any[] = [
  { title: '序号', key: 'index', dataIndex: 'index', width: 120 },
  { title: '名称', key: 'name', dataIndex: 'name', width: 200 },
  { title: '状态', key: 'status', dataIndex: 'status', width: 120 },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>去练习</a>,
  }
]

const CambridgeIelts: React.FC = () => {
  const [dataList, setDataList] = useState([
    {
      index: 1,
      key: 1,
      name: "C18-Listening-Test 4",
      status: 1,
    },
    {
      index: 2,
      key: 2,
      name: `C18-Listening-Test 3`,
      status: 2,
    },
    {
      index: 3,
      key: 3,
      name: `C18-Listening-Test 2`,
      status: 3,
    }
  ]);
  const selectTab = (key: string) => {
    console.log(key, "changeTab")
  }
  return <>
    <PartTabs selectTab={selectTab}/>
    <DynamicTable columns={columns} dataList={dataList}/>
  </>
}


export default CambridgeIelts;