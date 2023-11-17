import React from "react";
import { Tabs, Button } from 'antd';
import styles from "./styles.module.less";

interface tabItem {
  title: string;
  key: string;
}

interface PartTabsProps {
  selectTab: (key: string) => void;
  goToRecords: () => void;
}

const tab_list: tabItem[] = [
  { title: "听力练习", key: "listening" },
  { title: "阅读练习", key: "reading" },
  { title: "写作练习", key: "writing" },
  { title: "套题模考", key: "testing" }
]

const PartTabs: React.FC<PartTabsProps> = ({ selectTab, goToRecords }) => {

  const changeTabs = (e: string) => {
    selectTab(e);
  }

  const goRecord = () => {
    goToRecords();
  }

  return (
    <div className={styles.tab_content}>
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
      <Button type="primary" className={styles.btn_style} onClick={() => goRecord()}>做题记录</Button>
    </div>
    
  )
}


export default PartTabs;