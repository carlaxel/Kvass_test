import React, { useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styles from "./Image.module.css";
import ImageComponent from "./ImageComponent";

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export default function ImageContainer(props) {
  let { fileList, setFileList } = props;

  const onDragEnd = useCallback(
    result => {
      console.log(`${result.source.index} => ${result.destination.index}`);
      if (!result.destination) {
        return;
      }
      const list = reorder(
        [...fileList],
        result.source.index,
        result.destination.index
      );
      setFileList(list);
    },
    [fileList, setFileList]
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable"} direction="horizontal">
          {provided => (
            <div
              className={styles.ImageContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {fileList.map((file, index) => (
                <Draggable
                  key={file.Key || file.name}
                  draggableId={file.Key || file.name}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {file.name ? (
                        <ImageComponent
                          file={URL.createObjectURL(file)}
                          local
                        ></ImageComponent>
                      ) : (
                        <ImageComponent file={file}></ImageComponent>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
