import Editor from "ckeditor5-self";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Parse from "html-react-parser";
import { React, useState } from "react";
import { MdEditNote } from "react-icons/md";
import ImageUploader from "../ImageUploader";
import "./index.css";

function InputBlock(props) {
  const { type } = props;
  const [inputText, setInputText] = useState("");
  const [showCKEditor, setShowCKEditor] = useState({
    CKEditor: true,
    inputText: false,
  });

  if (type === "time") {
    return (
      <div className="input-item">
        <label>時間：</label>
        <div className="select-card">
          <input type="number" min={0} placeholder="時間" />
          <select name="time">
            <option value="sec">秒</option>
            <option value="min">分</option>
            <option value="hr">小時</option>
          </select>
        </div>
      </div>
    );
  } else if (type === "movement") {
    return (
      <div className="input-item">
        <label>動作：</label>
        <select name="movement">
          <option value="cut">cut</option>
          <option value="chop">chop</option>
          <option value="slice">slice</option>
        </select>
      </div>
    );
  } else if (type === "material") {
    return (
      <div className="input-item">
        <label>材料：</label>
        <input type="text" placeholder="請輸入材料名稱" />
        <div className="select-card">
          <input type="number" min={0} placeholder="數量" />
          <select name="movement">
            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>
    );
  } else if (type === "image") {
    return (
      <div className="input-item">
        <label>圖片：</label>
        <ImageUploader/>
      </div>
    );
  } else if (type === "text") {
    const updateEditorData = (e, editor) => {
      const data = editor.getData();
      setInputText(data);
      console.log(data);
    };
    const handleShowCKEditor = () => {
      setShowCKEditor({
        CKEditor: !showCKEditor.CKEditor,
        inputText: !showCKEditor.inputText,
      });
    };
    return (
      <div className="input-item editor">
        <div>
          <div
            className="edit"
            style={{ display: showCKEditor.CKEditor ? "inline-block" : "none" }}
          >
            <CKEditor
              editor={Editor}
              data={inputText}
              onChange={updateEditorData}
            />
          </div>
          <div
            style={{
              display: showCKEditor.inputText ? "inline-block" : "none",
            }}
          >
            {Parse(inputText)}
          </div>
        </div>
        <MdEditNote onClick={handleShowCKEditor} />
      </div>
    );
  } else if (type === "line") {
    return (
      <div className="input-item">
        <hr />
      </div>
    );
  }
}

export default InputBlock;
