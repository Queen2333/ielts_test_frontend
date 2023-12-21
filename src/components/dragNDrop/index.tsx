import React, { useState, useRef } from "react";
import styles from "./styles.module.less";

interface Option {
  id: string;
  content: string;
}

interface Target {
  id: string;
  content: string;
  matchedOption: string | null;
}

const DragDropComponent: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    { id: "option-1", content: "Option 1" },
    { id: "option-2", content: "Option 2" },
    { id: "option-3", content: "Option 3" },
  ]);

  const [targets, setTargets] = useState<Target[]>([
    { id: "target-1", content: "Target 1", matchedOption: null },
    { id: "target-2", content: "Target 2", matchedOption: null },
    { id: "target-3", content: "Target 3", matchedOption: null },
  ]);

  const dragItem = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    dragItem.current = e.currentTarget as HTMLDivElement;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedOption = options.find((option) => option.id === draggedItemId);

    if (draggedOption) {
      const updatedOptions = options.filter(
        (option) => option.id !== draggedItemId
      );
      setOptions(updatedOptions);

      const updatedTargets = targets.map((target) => {
        if (target.id === targetId) {
          return { ...target, matchedOption: draggedOption };
        } else if (target.matchedOption?.id === draggedItemId) {
          return { ...target, matchedOption: null };
        }
        return target;
      });

      setTargets(updatedTargets);
    }

    dragItem.current = null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    // Add styles or visual indication as needed
  };

  const handleDragLeave = () => {
    // Reset styles or remove visual indication as needed
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    const validTarget = targetElement?.classList.contains(
      styles["droppable-target"]
    );

    if (!validTarget && dragItem.current) {
      setOptions([
        ...options,
        { id: dragItem.current.id, content: dragItem.current.innerText },
      ]);
      const updatedTargets = targets.map((target) => {
        if (target.matchedOption?.id === dragItem.current?.id) {
          return { ...target, matchedOption: null };
        }
        return target;
      });
      setTargets(updatedTargets);
    }

    dragItem.current = null;
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
        onDragOver={handleDragOver}
      >
        {targets.map((target) => (
          <div
            key={target.id}
            className={styles["droppable-target"]}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            data-target-id={target.id}
          >
            {target.content}
            <div className={styles["matched-option"]}>
              {target.matchedOption && (
                <div
                  className={styles["draggable-option"]}
                  ref={dragItem}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, target.matchedOption!.id)
                  }
                  onDragEnd={handleDragEnd}
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
