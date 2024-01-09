import React, { useState } from "react";
import styles from "./styles.module.less";
import TestHeader from "../../../components/testHeader";
import sound from "../../../assets/sound.png";
import warnIcon from "../../../assets/warning_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const ListeningStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toNextStep = () => {
    console.log(location.state, "location");
    navigate("/listeningStep3", {
      state: {
        id: location.state.id,
      },
    });
  };

  return (
    <div className={styles.step_content}>
      <TestHeader type="listening" seconds={1880} />
      <div className={styles.info_box}>
        <div className={styles.info_line}>
          <img src={sound} alt="" className={styles.check_icon} />
          <div className="font-14 fw-700">Test sound</div>
        </div>
        <div className={styles.info_content}>
          <div className="font-14" style={{ marginBottom: "1rem" }}>
            Put on your headphones and click the{" "}
            <span className="fwb">Play sound</span> button to play a sample
            sound.
          </div>
          <div className="flex-jcc">
            <div className={styles.confirm_btn}>Play sound</div>
          </div>
          <div className="flex-alc">
            <img
              src={warnIcon}
              alt=""
              style={{ width: "0.9rem", height: "0.9rem" }}
            />
            <div className={`${styles.content_text} font-14 ml-8`}>
              if you can not hear the sound clearly, please tell the invigilator
            </div>
          </div>
          <div className="flex-jcc">
            <div
              className={styles.confirm_btn}
              style={{ marginTop: "1rem" }}
              onClick={() => toNextStep()}
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningStep2;
