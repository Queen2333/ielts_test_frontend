import React, { useState, useEffect } from "react";
import styles from "./styles.module.less";
import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
import closeIcon from "../../assets/close_icon.png";
import { Input } from "antd";

interface markProps {
  mousePosition: number[];
  isShow: boolean;
  handleMark: () => void;
  selectionRange: any;
  selection: any;
}

const MarkDialog: React.FC<markProps> = ({
  mousePosition,
  isShow,
  handleMark,
  selectionRange,
  selection,
}) => {
  const [highlighter, setHighlighter] = useState<any>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    rangy.init();
    // // 检查是否已创建 highlighter
    if (!highlighter) {
      let h = highlighter;
      h = rangy.createHighlighter();
      h.addClassApplier(rangy.createClassApplier("highlight"));
      h.addClassApplier(rangy.createClassApplier("note"));
      setHighlighter(h);
    }
  }, []);

  useEffect(() => {
    const text = selectionRange?.toString();
    if (text) {
      const highlights = highlighter.getIntersectingHighlights([
        selectionRange,
      ]);
      const className = highlights[0]?.classApplier.className;
      className === "highlight" || className === "note"
        ? setBtnDisabled(false)
        : setBtnDisabled(true);
    }
  }, [selectionRange]);

  const handleClick = (e: any, type: string) => {
    e.stopPropagation();
    if (highlighter && selectionRange) {
      switch (type) {
        case "highlight":
          selection.removeAllRanges();
          highlighter.highlightRanges("highlight", [selectionRange]);
          break;
        case "note":
          selection.removeAllRanges();
          highlighter.highlightRanges("note", [selectionRange]);
          setShowNote(true);
          break;
        case "clear":
          if (!btnDisabled) {
            const highlights = highlighter.getIntersectingHighlights([
              selectionRange,
            ]);
            highlighter.removeHighlights(highlights);
          }
          break;
        case "clear all":
          if (!btnDisabled) {
            highlighter.removeAllHighlights();
          }
          break;
      }
    } else {
      console.error("Highlighter or selection range is not initialized");
    }
    handleMark();
  };

  const saveNote = async (e: any) => {
    // e.stopPropagation();
    console.log(e);
    // setShowNote(false);
  };
  return (
    <div>
      {showNote && (
        <div
          className={styles.notebook}
          style={{
            left: `${mousePosition[0]}px`,
            top: `${mousePosition[1]}px`,
          }}
        >
          <div className={styles.note_header}>
            <div
              className="flex-alc"
              style={{ width: "16px" }}
              onClick={(e) => saveNote(e)}
            >
              <img src={closeIcon} alt="" className={styles.close_icon} />
            </div>
          </div>
          <div className={styles.note_edit}>
            <Input size="middle" />
            <Input.TextArea size="middle" className="mt-6" autoSize />
          </div>
        </div>
      )}
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
            className={`${styles.handle} ${
              btnDisabled ? styles.btnDisabled : null
            }`}
            onMouseUp={(e) => handleClick(e, "clear")}
          >
            Clear
          </p>
          <p
            className={`${styles.handle} ${
              btnDisabled ? styles.btnDisabled : null
            }`}
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
