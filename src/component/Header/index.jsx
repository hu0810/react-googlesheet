import React from "react";

import { HeaderButton } from "../Button";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <h1>神隆專案</h1>
      <div className="right-container">
        <div className="form">
          <label htmlFor="file_name">檔案名稱：</label>
          <input type="text" placeholder="請輸入檔案名稱" />
          <HeaderButton type="download">下載</HeaderButton>
        </div>
        <HeaderButton type="finish">完成</HeaderButton>
      </div>
    </div>
  );
};

export default Header;
