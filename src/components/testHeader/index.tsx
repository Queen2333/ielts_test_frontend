import React, { useState } from 'react';
import styles from "./styles.module.less";
import { Slider } from 'antd';
import timerIcon from "../../assets/timer.png";
import volumeIcon from "../../assets/volume.png";
import { QuestionCircleOutlined } from '@ant-design/icons';

const TestHeader: React.FC = () => {
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

  return <div className={`${styles.header} flex-alc-jcs`}>
      <div className="c-white" style={{ width: '500px' }}>test name</div>
      <div className="flex-alc">
        <img src={timerIcon} alt="" className={styles.timer} />
        <div
          className={`${styles.time_text} pointer`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          { isHover && <span>31 : 20</span> }
          { !isHover && <span>32 minutes</span> }
          <span> left</span>
        </div>
      </div>
      <div className={styles.helper}>
        <QuestionCircleOutlined style={{ color: '#ccc', fontSize: '16px', marginRight: '10px' }}/>
        <img src={volumeIcon} alt="" className={styles.volume_icon}/>
        <Slider
          defaultValue={30}
          style={{ width: '100px', padding: '1px' }}
          tooltip={{
            open: false
          }}
          railStyle={{ background: '#e0e0e0', height: '10px', borderRadius: '10px' }}
          trackStyle={{ background: 'grey', height: '10px' }}
        />
        <div className={`${styles.submit_btn} ${styles.normal_btn}`}>Finish test</div>
        <div className={`${styles.normal_btn} ml-10`}>Setting</div>
        <div className={`${styles.normal_btn} ml-10`}>Help</div>
        <div className={`${styles.normal_btn} ml-10`}>Hide</div>
      </div>
    </div>
}


export default TestHeader;