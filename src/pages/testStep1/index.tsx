import React, { useState } from 'react';
import styles from "./styles.module.less";
import TestHeader from '../../components/testHeader';
import checkIcon from "../../assets/check_icon.png";
import tipIcon from "../../assets/tip_icon.png";
import closeIcon from "../../assets/close_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const TestStep1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toNextStep = () => {
    console.log(location.state, "state");
    navigate(`/${location.state.type}Step2`, {
      state: {
        id: location.state.id,
        type: location.state.type,
      },
    });
  };

  return (
    <div className={styles.step_content}>
      <TestHeader
        type={location.state.type}
        seconds={location.state.type === "reading" ? 3600 : 1880}
      />
      <div className={styles.info_box}>
        <div className={styles.info_line}>
          <img src={checkIcon} alt="" className={styles.check_icon} />
          <div className="font-14 fw-700">Confirm your details</div>
        </div>
        <div className={styles.info_content}>
          <div className={styles.title}>EXAMPLE</div>
          <div className="font-14" style={{ marginBottom: "1rem" }}>
            <div className={`${styles.content_text} flex-alc`}>
              <span className={styles.dot}></span>
              <span>Name:</span>
            </div>
            <div className={`${styles.content_text} flex-alc`}>
              <span className={styles.dot}></span>
              <span>Date of birth: XX-XX-XXXX</span>
            </div>
            <div className={`${styles.content_text} flex-alc`}>
              <span className={styles.dot}></span>
              <span>Candidate number: xxxx xxxx - 123456</span>
            </div>
          </div>
          <div className="flex-alc">
            <img
              src={tipIcon}
              alt=""
              style={{ width: "0.9rem", height: "0.9rem" }}
            />
            <div className={`${styles.content_text} font-14 ml-8`}>
              If your details aren’t correct, please inform the invigilator.
            </div>
          </div>
          <div className="flex-jcc">
            <div className={styles.confirm_btn} onClick={() => toNextStep()}>
              My details are correct
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.tip_dialog}>
      <div>
        <img src={closeIcon} alt="" />
      </div>
    </div> */}
    </div>
  );
};


export default TestStep1;