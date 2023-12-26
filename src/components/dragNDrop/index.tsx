import React, { useState, useRef } from "react";
import styles from "./styles.module.less";

interface Option {
  id: string;
  content: string;
}

interface Target {
  id: string;
  content: string;
  matchedOption: Option | null;
  isDraggingOver: boolean;
}

const DragDropComponent: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    { id: "option-1", content: "Option 1" },
    { id: "option-2", content: "Option 2" },
    { id: "option-3", content: "Option 3" },
  ]);

  const [targets, setTargets] = useState<Target[]>([
    {
      id: "target-1",
      content: "Target 1",
      matchedOption: null,
      isDraggingOver: false,
    },
    {
      id: "target-2",
      content: "Target 2",
      matchedOption: null,
      isDraggingOver: false,
    },
    {
      id: "target-3",
      content: "Target 3",
      matchedOption: null,
      isDraggingOver: false,
    },
  ]);

  const dragItem = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    dragItem.current = e.currentTarget as HTMLDivElement;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  // option触发的结束事件
  const handleDragEnd = (e: React.DragEvent, target: any) => {
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    const validTarget = targetElement?.classList.contains(
      styles["droppable-target"]
    );
    const draggedItemId =
      dragItem.current?.getAttribute("data-option-id") || "";

    if (!validTarget && dragItem.current) {
      // 将 option 放回原来的位置
      setOptions([
        ...options,
        { id: draggedItemId, content: dragItem.current.innerText },
      ]);
    }

    console.log(draggedItemId, "end");

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

    dragItem.current = null;
  };

  // target框触发的结束事件
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    console.log(e, draggedItemId, "drop");

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
    console.log("enter");
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target-id");
    if (targetId) {
      // handleDragEnterAction(targetId); // 处理拖拽进入时的逻辑

      // 例如，添加拖拽进入时的样式
      e.currentTarget.classList.add(styles["drag-enter"]); // 请替换为你的实际样式类名
    }
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("leave");
    // 重置样式或移除视觉效果
    e.currentTarget.classList.remove(styles["drag-enter"]); // 请替换为你的实际样式类名
  };

  return (
    <div className={styles["drag-drop-matching-container"]}>
      <div className={styles["options-container"]}>
        {options.map((option) => (
          <div
            key={option.id}
            id={option.id}
            className={styles["draggable-option"]}
            draggable
            onDragStart={(e) => handleDragStart(e, option.id)}
          >
            {option.content}
          </div>
        ))}
      </div>
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
          <div
            key={target.id}
            className={`${styles["droppable-target"]} ${
              target.isDraggingOver ? styles["drag-over"] : ""
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
            data-target-id={target.id}
          >
            {target.content}
            <div className={styles["matched-option"]}>
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
                  {target.matchedOption.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropComponent;
