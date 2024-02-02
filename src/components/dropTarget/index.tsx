import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.less";

interface Option {
  id: string;
  label: string;
  content: string;
}

interface Target {
  id: string;
  content: string;
  matchedOption: Option | null;
  isDraggingOver: boolean;
  no: string;
}

interface dragProps {
  targetItem: Target;
  optionList: Option[];
  currentFocus: {
    type: string;
    partIndex: number;
    typeIndex: number;
    questionIndex: number;
  };
  readingQuestionNumber?: any[];
  startPoint: {
    e: React.DragEvent | null;
    id: string;
  };
  dropEnd: (targets: Target) => void;
  clickTarget: (no: string) => void;
  updateOptions: (option: any) => void;
}

const DropTargetComponent: React.FC<dragProps> = ({
  targetItem,
  optionList,
  currentFocus,
  readingQuestionNumber,
  startPoint,
  dropEnd,
  clickTarget,
  updateOptions,
}) => {
  const [target, setTarget] = useState<Target>(targetItem);
  const dropTargetRef = useRef(null);
  const dragItem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(startPoint, "startPoint");
    if (startPoint.e) handleDragStart(startPoint.e, startPoint.id);
  }, [startPoint]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    dragItem.current = e.currentTarget as HTMLDivElement;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  // option触发的结束事件
  const handleDragEnd = (e: React.DragEvent, target: any) => {
    // const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    console.log(e, target, "end");

    if (!target.isDraggingOver) return;
    const draggedItemId = target.matchedOption?.id;

    // 更新 targets，确保 matchedOption 设置为 null，isDraggingOver 设置为 false
    const updatedTargets = target.map((item: any) => ({
      ...item,
      matchedOption:
        String(item.matchedOption?.id) === String(draggedItemId)
          ? null
          : item.matchedOption,
      isDraggingOver: false,
    }));

    setTarget(updatedTargets);
    dropEnd(updatedTargets);
    dragItem.current = null;
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    const isDraggingOver =
      String(targetElement?.getAttribute("data-target-id")) ===
      String(targetId);

    target.isDraggingOver =
      String(target.id) === String(targetId) && isDraggingOver;
    setTarget(target);
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target-id");
    if (targetId) {
      // console.log(e, targetId, "enter");
      // handleDragEnterAction(targetId); // 处理拖拽进入时的逻辑
      // 例如，添加拖拽进入时的样式
      // e.currentTarget.classList.add(styles["drag-enter"]); // 请替换为你的实际样式类名
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    console.log(e, "drop");

    const draggedOption = optionList.find(
      (option) => String(option.id) === String(draggedItemId)
    );
    if (draggedOption) {
      //  更新在外面的选项
      updateOptions(draggedOption);
      // 更新target的状态

      if (String(target.id) === String(targetId)) {
        target.matchedOption = draggedOption;
        target.isDraggingOver = false;
      } else if (String(target.matchedOption?.id) === String(draggedItemId)) {
        target.matchedOption = null;
        target.isDraggingOver = false;
      }
      setTarget(target);
      dropEnd(target);
    }
    dragItem.current = null;
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target-id");
    if (targetId) {
      // console.log(targetId, "leave");
      if (String(target.id) === String(targetId)) {
        target.isDraggingOver = true;
      }
      setTarget(target);
    }

    // 重置样式或移除视觉效果
    // e.currentTarget.classList.remove(styles["drag-enter"]); // 请替换为你的实际样式类名
  };

  const handleClick = (no: string) => {
    clickTarget(no);
  };

  const formatNo = (no: string) => {
    const length =
      readingQuestionNumber?.[currentFocus.partIndex].children.length;
    return (
      currentFocus.partIndex * length + currentFocus.questionIndex ===
      Number(no) - 1
    );
  };

  return (
    <div
      className={styles["droppable-target"]}
      onDrop={(e) => {
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);

        if (targetElement) {
          const targetId = targetElement.getAttribute("data-target-id");
          if (targetId) {
            handleDrop(e, targetId);
          }
        }
      }}
      onDragOver={(e) => {
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        const targetId = targetElement?.getAttribute("data-target-id");
        if (targetId) {
          handleDragOver(e, targetId);
        }
      }}
    >
      {target.content}
      <div
        ref={dropTargetRef}
        className={`pointer ${styles["matched-option"]} ${
          target.isDraggingOver ? styles["drag-over"] : ""
        } ${formatNo(target.no) ? styles["focused"] : ""}`}
        onDragOver={(e) => {
          const targetElement = document.elementFromPoint(e.clientX, e.clientY);
          const targetId = targetElement?.getAttribute("data-target-id");
          if (targetId) {
            handleDragOver(e, targetId);
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => handleClick(target.no)}
        data-target-id={target.id}
        data-droppable-target={true}
      >
        {target.matchedOption && (
          <div
            className={styles["draggable-option"]}
            data-option-id={target.matchedOption!.id}
            ref={dragItem}
            draggable
            onDragStart={(e) => handleDragStart(e, target.matchedOption!.id)}
            onDragEnd={(e) => handleDragEnd(e, target)}
          >
            {target.matchedOption.label}.{target.matchedOption.content}
          </div>
        )}
        {!target.matchedOption && target.no}
      </div>
    </div>
  );
};

export default DropTargetComponent;
