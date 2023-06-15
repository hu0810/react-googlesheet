import { nanoid } from "nanoid";
import React from "react";
import { IoClose } from "react-icons/io5";

import "./index.css";

const HeaderButton = (props) => {
  const { type } = props;
  const handleClick = (type) => {
    return () => {
      console.log("尚未開發");
    };
  };
  return (
    <button className="default" onClick={handleClick(type)}>
      {props.children}
    </button>
  );
};

const InputButton = (props) => {
  const { type, sectionBlocks, setSectionBlocks } = props;
  const handleClick = (type) => {
    // 新增section至表單建構區
    if (type === "section") {
      return () => {
        const newSectionBlocks = [
          ...sectionBlocks,
          { id: nanoid(), name: type, inputBlockList: [] },
        ];
        setSectionBlocks(newSectionBlocks);
      };
    } else {
      return () => {
        //判斷有沒有已存在的section block
        if (sectionBlocks.length > 0) {
          // 取得當前section數
          const lastSectionIndex = sectionBlocks.length - 1;

          // 創建一個新的input block list並於末尾增加一個新的input block
          const newInputBlockList = [
            ...sectionBlocks[lastSectionIndex].inputBlockList,
            { id: nanoid(), name: type },
          ];

          // 創建一個新的section blocks
          const newSectionBlocks = [...sectionBlocks];

          // 更新section block 狀態
          newSectionBlocks[lastSectionIndex] = {
            ...sectionBlocks[lastSectionIndex],
            inputBlockList: newInputBlockList,
          };

          // 將新狀態更新至sectionblocks，並渲染到網頁上
          setSectionBlocks(newSectionBlocks);
        } else {
          const newSectionBlocks = [
            ...sectionBlocks,
            {
              id: nanoid(),
              name: "section",
              inputBlockList: [{ id: nanoid(), name: type }],
            },
          ];
          setSectionBlocks(newSectionBlocks);
        }
      };
    }
  };
  return (
    <button className="default" onClick={handleClick(type)}>
      {props.children}
    </button>
  );
};

const CloseButton = (props) => {
  const { type, sectionIndex, sectionBlocks, setSectionBlocks } = props;
  const handleClose = () => {
    if (type === "section") {
      // 取得欲刪除的section index
      const sectionCloseIndex = sectionIndex;

      // 複製一個sectionBlocks，並命名為newSectionBlocks
      const newSectionBlocks = [...sectionBlocks];

      // 將欲刪除的section從newSectionBlocks中移除
      newSectionBlocks.splice(sectionCloseIndex, 1);

      // 更新狀態
      setSectionBlocks(newSectionBlocks);
    } else {
      const { id, inputBlockList } = props;

      // 取得欲刪除的section index
      const sectionCloseIndex = sectionIndex;

      // 取得欲刪除的input block所在的index
      const inputBlockCloseIndex = inputBlockList.findIndex(
        (inputBlock) => inputBlock.id === id
      );

      // 複製一個inputBlockList並命名為newInputBlockList
      const newInputBlockList = [...inputBlockList];

      // 將欲刪除的input block從newInputBlockList中移除
      newInputBlockList.splice(inputBlockCloseIndex, 1);

      // 複製一個新的sectionBlocks
      const newSectionBlocks = [...sectionBlocks];

      // 將新的inputBlockList更新至newSectionBlockList
      newSectionBlocks[sectionCloseIndex] = {
        ...sectionBlocks[sectionCloseIndex],
        inputBlockList: newInputBlockList,
      };

      // 更新狀態
      setSectionBlocks(newSectionBlocks);
    }
  };
  return (
    <div onClick={handleClose} className="icon-close">
      <IoClose />
    </div>
  );
};
export { HeaderButton, InputButton, CloseButton };
