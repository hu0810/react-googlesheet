import React, { useState } from 'react';
import "./index.css";

function ImageUploader() {
  const [image, setImage] = useState('');

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.items;
    for (let i = 0; i < pasteData.length; i++) {
      if (pasteData[i].type.indexOf('image') === 0) {
        const imageURL = URL.createObjectURL(pasteData[i].getAsFile());
        setImage(imageURL);
      }
    }
  };

  const handleDelete = () => {
    setImage(null);
  };

  return (
    <div className="image-paste-area">
      <textarea
        className="image-paste-area__textarea"
        onPaste={handlePaste}
        placeholder="貼上圖片"
      ></textarea>
      {image && (
        <div className="image-paste-area__preview">
          <img className="image-paste-area__image" src={image} alt="Pasted" />
          <div className="image-paste-area__actions">
            <button className="image-paste-area__delete-btn" onClick={handleDelete}>
              刪除圖片
            </button>
          </div>
        </div>
      )}
    </div>
  ) 
};


export default ImageUploader;