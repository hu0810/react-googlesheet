import { React, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";

import { CloseButton, InputButton } from "../Button";
import InputBlock from "./InputBlock";
import "./index.css";

const DATA = [];

// Section裡面item的拖拉功能
function SectionItem({
  name,
  id,
  inputBlockList,
  sectionIndex,
  sectionBlocks,
  setSectionBlocks,
}) {
  return (
    <div className="section-item">
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="section-header">
              <MdDragIndicator className="drag-indicator"/>
              <div>步驟 {sectionIndex + 1}：</div>
              <CloseButton
                type="section"
                sectionIndex={sectionIndex}
                sectionBlocks={sectionBlocks}
                setSectionBlocks={setSectionBlocks}
              />
            </div>
            {inputBlockList.map((inputItem, index) => (
              <Draggable
                draggableId={inputItem.id}
                key={inputItem.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="input-block"
                  >
                    <MdDragIndicator className="drag-indicator"/>
                    <InputBlock type={inputItem.name} />
                    <CloseButton
                      type="inputBlock"
                      id={inputItem.id}
                      inputBlockList={inputBlockList}
                      sectionIndex={sectionIndex}
                      sectionBlocks={sectionBlocks}
                      setSectionBlocks={setSectionBlocks}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

const Workspace = () => {
  const [sectionBlocks, setSectionBlocks] = useState(DATA);

  // 設定拖拉的邏輯
  const handleDragDrop = (result) => {
    const { destination, source, type } = result;
    // 未達成有效拖拉
    if (!destination) return;

    // 拖拉至原本的位置
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //section block拖拉區域的條件設定邏輯
    if (type === "section-block") {
      const sectionSourceIndex = source.index;
      const sectionDestinationIndex = destination.index;

      // 複製一個sections
      const newSectionOrder = [...sectionBlocks];
      // 將拖拉的元素從原本的位置剪切掉，並儲存在removeItem裡
      const [reorderSection] = newSectionOrder.splice(sectionSourceIndex, 1);
      // 將removeItem儲存至目標位置
      newSectionOrder.splice(sectionDestinationIndex, 0, reorderSection);

      // 更新sections的順序
      return setSectionBlocks(newSectionOrder);
    }

    // input block拖拉區域的條件設定邏輯 ------------------------------------------------

    // 儲存source以及destination的index至變數裡
    const inputSourceIndex = source.index;
    const inputDestinationIndex = destination.index;

    // 找出input block原本所屬的section block
    const sectionSourceIndex = sectionBlocks.findIndex(
      (sectionBlock) => sectionBlock.id === source.droppableId
    );

    // 找出input block將要加入的section block
    const sectionDestinationIndex = sectionBlocks.findIndex(
      (sectionBlock) => sectionBlock.id === destination.droppableId
    );

    // 新增一個儲存input block原本所屬的section block裡所有的input block list
    const newSourceInputBlockListOrder = [
      ...sectionBlocks[sectionSourceIndex].inputBlockList,
    ];

    // 新增一個儲存input block將要加入的section block裡所有的input block list
    const newDestinationInputBlockListOrder =
      source.droppableId !== destination.droppableId
        ? [...sectionBlocks[sectionDestinationIndex].inputBlockList]
        : newSourceInputBlockListOrder;

    // 將input block從原本所屬的section中移除，並將植儲存在reorderInputBlock這個變數
    const [reorderedInputBlock] = newSourceInputBlockListOrder.splice(
      inputSourceIndex,
      1
    );

    // 將reorderInputBlock加到目標section裡
    newDestinationInputBlockListOrder.splice(
      inputDestinationIndex,
      0,
      reorderedInputBlock
    );

    // 新增一個儲存sectionBlocks的容器
    const newSectionBlockOrder = [...sectionBlocks];

    // 將移除inputBlock的inputBlockList更新至新的sectionBlock裡
    newSectionBlockOrder[sectionSourceIndex] = {
      ...sectionBlocks[sectionSourceIndex],
      inputBlockList: newSourceInputBlockListOrder,
    };
    // 將加入inputBlock的inputBlockList更新至新的sectionBlock裡
    newSectionBlockOrder[sectionDestinationIndex] = {
      ...sectionBlocks[sectionDestinationIndex],
      inputBlockList: newDestinationInputBlockListOrder,
    };

    // 更新state並render新狀態
    setSectionBlocks(newSectionBlockOrder);

    // input block拖拉區域的條件設定邏輯 ------------------------------------------------
  };

  return (
    <div className="workspace">
      <div className="toolbox">
        <div>工具箱</div>
        <div className="sectionBlock">
          <InputButton
            type="section"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            步驟
          </InputButton>
        </div>

        <div className="inputBlock">
          <InputButton
            type="movement"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            動作
          </InputButton>

          <InputButton
            type="material"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            材料
          </InputButton>

          <InputButton
            type="time"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            時間
          </InputButton>

          <InputButton
            type="line"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            分割線
          </InputButton>
          <InputButton
            type="text"
            sectionBlocks={sectionBlocks}
            setSectionBlocks={setSectionBlocks}
          >
            文字
          </InputButton>
        </div>
      </div>
      <div className="contruct-box">
        {/* 表單建構區裡Section的拖拉功能 + HTML結構  */}
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="title">表單建構區</div>
          <Droppable droppableId="ROOT" type="section-block">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sectionBlocks.map((sectionItem, index) => (
                  <Draggable
                    draggableId={sectionItem.id}
                    index={index}
                    key={sectionItem.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <SectionItem
                          {...sectionItem}
                          sectionIndex={index}
                          sectionBlocks={sectionBlocks}
                          setSectionBlocks={setSectionBlocks}
                        />
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
    </div>
  );
};

export default Workspace;
