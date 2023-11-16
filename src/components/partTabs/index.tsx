import React from "react";
import { Tabs } from 'antd';

interface tabItem {
  title: string;
  key: string;
}

interface PartTabsProps {
  selectTab: (key: string) => void;
}

const tab_list: tabItem[] = [
  { title: "听力练习", key: "listening" },
  { title: "阅读练习", key: "reading" },
  { title: "写作练习", key: "writing" },
  { title: "套题模考", key: "testing" }
]

const PartTabs: React.FC<PartTabsProps> = ({ selectTab }) => {

  const changeTabs = (e: string) => {
    selectTab(e);
  }
  return (
    <Tabs
      defaultActiveKey="listening"
      type="card"
      size="middle"
      items={tab_list.map((item) => {
        return {
          label: item.title,
          key: item.key
        };
      })}
      onChange={(e) => changeTabs(e)}
    />
  )
}


export default PartTabs;