import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/dynamicTable";

const WritingConfigList: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("listening");
  const [pageQuery, setPageQuery] = useState({
    total: 100,
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([
    {
      id: 0,
      index: 1,
      key: 1,
      name: "C18-Listening-Test 4",
      status: 1,
    },
    {
      id: 1,
      index: 2,
      key: 2,
      name: `C18-Listening-Test 3`,
      status: 2,
    },
    {
      id: 2,
      index: 3,
      key: 3,
      name: `C18-Listening-Test 2`,
      status: 3,
    },
  ]);

  const columns: any[] = [
    { title: "序号", key: "index", dataIndex: "index", width: 120 },
    { title: "名称", key: "name", dataIndex: "name", width: 200 },
    { title: "状态", key: "status", dataIndex: "status", width: 120 },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text: object) => (
        <div>
          <Button type="link" onClick={() => goToTest(text)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => {}}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  const goToTest = (text: any) => {
    console.log(text);
    navigate("/testStep1", {
      state: {
        id: text.id,
        type: currentTab,
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <DynamicTable
        columns={columns}
        dataList={dataList}
        pagination={pageQuery}
        loading={loading}
      />
    </div>
  );
};

export default WritingConfigList;