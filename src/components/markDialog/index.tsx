import React, { useState, useEffect } from "react";
import styles from "./styles.module.less";
import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
interface markProps {
  mousePosition: number[];
  isShow: boolean;
  handleMark: (type: string) => void;
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
  const [sectionText, setSectionText] = useState("");

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
    console.log(text, "text");
    console.log(sectionText, text === sectionText, "selectionRange");

    text === sectionText && text && sectionText
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
    setSectionText(text);
  }, [selectionRange]);

  const handleClick = (e: any, type: string) => {
    e.stopPropagation();
    if (highlighter) {
      switch (type) {
        case "highlight":
          highlighter.highlightRanges("highlight", [selectionRange]);
          // rangy.getSelection().removeAllRanges();
          break;
        case "note":
          highlighter.highlightRanges("note", [selectionRange]);
          // rangy.getSelection().removeAllRanges();
          break;
        case "clear":
          const highlights = highlighter.getIntersectingHighlights([
            selectionRange,
          ]);
          highlights.forEach((highlight: any) => {
            highlight.unapply();
          });
          break;
        case "clear all":
          highlighter.removeAllHighlights();
          break;
      }
    } else {
      console.error("Highlighter or selection range is not initialized");
    }
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
