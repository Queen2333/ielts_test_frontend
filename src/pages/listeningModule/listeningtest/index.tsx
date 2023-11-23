import React, { useEffect, useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card } from "antd";

const part2Question: any = {
  0: "1-10",
  1: "11-20",
  2: "21-30",
  3: "31-40",
};
const ListeningStep3: React.FC = () => {
  const location = useLocation();
  const [part, setPart] = useState(0);

  const toNextStep = () => {
    console.log(location.state, "location");
  };

  const chooseQuestion = (part: number, question: number) => {
    console.log(part, question);
    setPart(part);
  };
  return (
    <div className={styles.step_content}>
      <TestHeader />
      <div className={styles.test_content}>
        <Card>
          <p className={`${styles.part_title} font-28 fwb`}>Part {part + 1}</p>
          <p className={`${styles.part_desc} font-16`}>
            Listen and answer questions {part2Question[part]}.
          </p>
        </Card>
        <Card className={`${styles.test_card} overflow_auto`}></Card>
        <TestBar chooseQuestion={chooseQuestion} />
      </div>
    </div>
  );
};

export default ListeningStep3;
