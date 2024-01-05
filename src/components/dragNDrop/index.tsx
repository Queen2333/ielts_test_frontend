import React, { useState, useRef } from "react";
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
  targetList: Target[];
  optionList: Option[];
  currentFocus: {
    type: string;
    partIndex: number;
    typeIndex: number;
    questionIndex: number;
  };
  dropEnd: (targets: Target[]) => void;
  clickTarget: (no: string) => void;
}

const DragDropComponent: React.FC<dragProps> = ({
  targetList,
  optionList,
  currentFocus,
  dropEnd,
  clickTarget,
}) => {
  const [options, setOptions] = useState<Option[]>(optionList);

  const [targets, setTargets] = useState<Target[]>(targetList);

  const dragItem = useRef<HTMLDivElement | null>(null);

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

    if (dragItem.current) {
      // 将 option 放回原来的位置
      const draggedOption = optionList.find(
        (option) => option.id === draggedItemId
      );
      if (draggedOption) {
        const originalIndex = optionList.indexOf(draggedOption);

        // 在原始的位置插入被拖拽项
        setOptions((prevOptions) => [
          ...prevOptions.slice(0, originalIndex),
          draggedOption,
          ...prevOptions.slice(originalIndex),
        ]);
      }
    }

    // 更新 targets，确保 matchedOption 设置为 null，isDraggingOver 设置为 false
    const updatedTargets = targets.map((target) => ({
      ...target,
      matchedOption:
        target.matchedOption?.id === draggedItemId
          ? null
          : target.matchedOption,
      isDraggingOver: false,
    }));

    setTargets(updatedTargets);
    dropEnd(updatedTargets);
    dragItem.current = null;
  };

  // target框触发的结束事件
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    console.log(e, "drop");

    // 一个框只能有一个选项
    const targetItem = targets.find((target) => target.id === targetId);
    if (targetItem?.matchedOption) return;

    const draggedOption = options.find((option) => option.id === draggedItemId);
    if (draggedOption) {
      //  更新在外面的选项
      const updatedOptions = options.filter(
        (option) => option.id !== draggedItemId
      );
      setOptions(updatedOptions);

      // 更新target的状态
      const updatedTargets = targets.map((target) => {
        if (target.id === targetId) {
          return {
            ...target,
            matchedOption: draggedOption,
            isDraggingOver: false,
          };
        } else if (target.matchedOption?.id === draggedItemId) {
          return { ...target, matchedOption: null, isDraggingOver: false };
        }
        return target;
      });

      setTargets(updatedTargets);
      dropEnd(updatedTargets);
    }
    dragItem.current = null;
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    const isDraggingOver =
      targetElement?.getAttribute("data-target-id") === targetId;

    const updatedTargets = targets.map((target) => ({
      ...target,
      isDraggingOver: target.id === targetId && isDraggingOver,
    }));
    setTargets(updatedTargets);
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target-id");
    if (targetId) {
      console.log(e, targetId, "enter");
      // handleDragEnterAction(targetId); // 处理拖拽进入时的逻辑
      // 例如，添加拖拽进入时的样式
      // e.currentTarget.classList.add(styles["drag-enter"]); // 请替换为你的实际样式类名
    }
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target-id");
    if (targetId) {
      console.log(targetId, "leave");
      targets.map((item) => {
        if (item.id === targetId) {
          item.isDraggingOver = true;
        }
      });
      setTargets(targets);
    }

    // 重置样式或移除视觉效果
    // e.currentTarget.classList.remove(styles["drag-enter"]); // 请替换为你的实际样式类名
  };

  const handleClick = (no: string) => {
    clickTarget(no);
  };
  return (
    <div className={styles["drag-drop-matching-container"]}>
      <div
        className={styles["targets-container"]}
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
        {targets.map((target) => (
          <div key={target.id} className={styles["droppable-target"]}>
            {target.content}
            <div
              className={`pointer ${styles["matched-option"]} ${
                target.isDraggingOver ? styles["drag-over"] : ""
              } ${
                currentFocus.partIndex * 10 + currentFocus.questionIndex ===
                Number(target.no) - 1
                  ? styles["focused"]
                  : ""
              }`}
              onDragOver={(e) => {
                const targetElement = document.elementFromPoint(
                  e.clientX,
                  e.clientY
                );
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
                  onDragStart={(e) =>
                    handleDragStart(e, target.matchedOption!.id)
                  }
                  onDragEnd={(e) => handleDragEnd(e, target)}
                >
                  {target.matchedOption.label}.{target.matchedOption.content}
                </div>
              )}
              {!target.matchedOption && target.no}
            </div>
          </div>
        ))}
      </div>
      <div className={styles["options-container"]}>
        {options.map((option) => (
          <div
            key={option.id}
            id={option.id}
            className={styles["draggable-option"]}
            draggable
            onDragStart={(e) => handleDragStart(e, option.id)}
          >
            {option.label}.{option.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropComponent;
