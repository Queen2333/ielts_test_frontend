import React, { useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import { useLocation, useNavigate } from "react-router-dom";

const ListeningStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toNextStep = () => {
    console.log(location.state, "location");
    navigate("/listeningModule");
  };

  return (
    <div className={styles.step_content}>
      <TestHeader />
      <div className={styles.info_box}>
        <h5 className={`c-font fwb ${styles.title}`}>IELTS Listening</h5>
        <p
          className={`font-14 fwn ${styles.desc}`}
          style={{ marginBottom: "1rem" }}
        >
          Time: Approximately 30 minutes
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
            <span>Answer all the questions.</span>
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
            <span>There are 40 questions in this test.</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>Each question carries one mark.</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>There are four parts to the test</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>You will hear each part once.</span>
          </div>
          <div className={`${styles.content_text} flex-alc`}>
            <span className={styles.dot}></span>
            <span>
              For each part of the test there will be time for you to look
              through the questions and time for you to check your answers.
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
