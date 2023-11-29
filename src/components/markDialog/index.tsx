import React, { useState } from "react";
import styles from "./styles.module.less";

interface markProps {
  mousePosition: number[];
  isShow: boolean;
  handleMark: (type: string) => void;
}

const MarkDialog: React.FC<markProps> = ({
  mousePosition,
  isShow,
  handleMark,
}) => {
  const handleClick = (e: any, type: string) => {
    e.stopPropagation();
    handleMark(type);
  };

  return (
    <div>
      {isShow && (
        <div
          className={styles.dialog}
          style={{
            left: `${mousePosition[0]}px`,
            top: `${mousePosition[1]}px`,
          }}
        >
          <p
            className={styles.handle}
            onMouseUp={(e) => handleClick(e, "highlight")}
          >
            Highlight
          </p>
          <p
            className={styles.handle}
            onMouseUp={(e) => handleClick(e, "note")}
          >
            Note
          </p>
          <p
            className={styles.handle}
            onMouseUp={(e) => handleClick(e, "clear")}
          >
            Clear
          </p>
          <p
            className={styles.handle}
            onMouseUp={(e) => handleClick(e, "clear all")}
          >
            Clear All
          </p>
        </div>
      )}
    </div>
  );
};

export default MarkDialog;
