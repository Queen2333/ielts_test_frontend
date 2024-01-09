import React, { useState } from 'react';
import styles from "./styles.module.less";
import { Slider } from 'antd';
import timerIcon from "../../assets/timer.png";
import volumeIcon from "../../assets/volume.png";
import { QuestionCircleOutlined } from '@ant-design/icons';

interface headerProps {
  type: string;
  seconds: number;
}

const TestHeader: React.FC<headerProps> = ({ type, seconds }) => {
  const [isHover, setIsHover] = useState(false);
  let hoverTimer: any;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => {
      setIsHover(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setIsHover(false);
  };

  const secondsToMMSS = (seconds: number) => {
    // 计算分钟和秒数
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // 将分钟和秒数格式化为两位数
    var minutesStr = minutes < 10 ? "0" + minutes : minutes;
    var secondsStr =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    // 构建 mm:ss 格式的字符串
    var formattedTime = minutesStr + ":" + secondsStr;

    return formattedTime;
  };

  return (
    <div className={`${styles.header} flex-alc-jcs`}>
      <div className="c-white" style={{ width: "500px", textWrap: "nowrap" }}>
        test name
      </div>
      <div className="flex-alc">
        <img src={timerIcon} alt="" className={styles.timer} />
        <div
          className={`${styles.time_text} pointer`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHover && <span>{secondsToMMSS(seconds)}</span>}
          {!isHover && <span>{(seconds / 60).toFixed(0)} minutes</span>}
          <span> left</span>
        </div>
      </div>
      <div className={`${styles.helper} flex-jce`}>
        {type === "listening" && (
          <>
            <QuestionCircleOutlined
              style={{ color: "#ccc", fontSize: "16px", marginRight: "10px" }}
            />
            <img src={volumeIcon} alt="" className={styles.volume_icon} />
            <Slider
              defaultValue={30}
              style={{ width: "100px", padding: "1px" }}
              tooltip={{
                open: false,
              }}
              railStyle={{
                background: "#e0e0e0",
                height: "10px",
                borderRadius: "10px",
              }}
              trackStyle={{ background: "grey", height: "10px" }}
            />
          </>
        )}

        <div className={`${styles.submit_btn} ${styles.normal_btn}`}>
          Finish test
        </div>
        <div className={`${styles.normal_btn} ml-10`}>Setting</div>
        <div className={`${styles.normal_btn} ml-10`}>Help</div>
        <div className={`${styles.normal_btn} ml-10`}>Hide</div>
      </div>
    </div>
  );
};


export default TestHeader;