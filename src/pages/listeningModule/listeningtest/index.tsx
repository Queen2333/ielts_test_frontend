import React, { useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import TestBar from "../../../components/testBar";
import { useLocation } from "react-router-dom";
import { Card } from "antd";

const ListeningStep3: React.FC = () => {
  const location = useLocation();

  const toNextStep = () => {
    console.log(location.state, "location");
  };

  return (
    <div className={styles.step_content}>
      <TestHeader />
      <div className={styles.test_content}>
        <Card>
          <p className={`${styles.part_title} font-28 fwb`}>Part 1</p>
          <p className={`${styles.part_desc} font-16`}>
            Listen and answer questions 1-10.
          </p>
        </Card>
        <Card className={`${styles.test_card} overflow_auto`}></Card>
        <TestBar />
      </div>
    </div>
  );
};

export default ListeningStep3;
