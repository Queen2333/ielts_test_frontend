import React, { useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import { useLocation, useNavigate } from "react-router-dom";

const ListeningStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toNextStep = () => {
    console.log(location.state, "location");
    navigate("/writingModule", {
      state: {
        id: location.state.id,
      },
    });
  };

  return (
    <div className={styles.step_content}>
      <TestHeader type="reading" seconds={3600} />
      <div className={styles.info_box}>
        <h5 className={`c-font fwb ${styles.title}`}>IELTS Academic Writing</h5>
        <p
          className={`font-14 fwn ${styles.desc}`}
          style={{ marginBottom: "1rem" }}
        >
          Time: 1 hour
        </p>
        <h5 className={`c-font fwb ${styles.title}`}>
          INSTRUCTIONS TO CANDIDATES
        </h5>
        <div
          className="font-14"
          style={{ marginBottom: "1rem", marginLeft: "25px" }}
        >
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>Answer both parts.</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>
              You can change your answers at any time during the test.
            </span>
          </div>
        </div>
        <h5 className={`c-font fwb ${styles.title}`}>
          INFORMATION FOR CANDIDATES
        </h5>
        <div
          className="font-14"
          style={{ marginBottom: "1rem", marginLeft: "25px" }}
        >
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>There are two parts in this test.</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>
              Part 2 contributes twice as much as Part 1 to the writing score.
            </span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>
              The test clock will show you when there are 10 minutes and 5
              minutes remaining.
            </span>
          </div>
        </div>
        <div className={`${styles.content_text} font-14 tac`}>
          Do not click 'Start test' until you are told to do so.
        </div>
        <div className="flex-jcc">
          <div
            className="confirm_btn"
            style={{ marginTop: "1rem" }}
            onClick={() => toNextStep()}
          >
            Start test
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningStep3;