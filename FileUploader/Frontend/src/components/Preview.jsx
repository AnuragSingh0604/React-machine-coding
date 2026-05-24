import React, { useEffect, useState } from "react";

const Preview = ({ item,Delete }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!item) return;

    const objectUrl = URL.createObjectURL(item);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [item]);

  if (!item) return null;

  function formatSize(size) {
    if (size < 1024) return `${size} B`;

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function renderPreview() {
    // image
    if (item.type.startsWith("image/")) {
      return (
        <img
          src={url}
          alt="preview"
          className="previewImage"
        />
      );
    }

    // pdf
    if (item.type === "application/pdf") {
      return (
        <div className="filePlaceholder">
          PDF
        </div>
      );
    }

    // doc/docx
    if (
      item.type.includes("word") ||
      item.name.endsWith(".doc") ||
      item.name.endsWith(".docx")
    ) {
      return (
        <div className="filePlaceholder">
          DOC
        </div>
      );
    }

    return (
      <div className="filePlaceholder">
        FILE
      </div>
    );
  }

  return (
    <div className="previewCard">
      <div className="previewLeft">
        {renderPreview()}
      </div>

      <div className="previewRight">
        <h4>{item.name}</h4>

        <p>{formatSize(item.size)}</p>

       
      </div>
      <button onClick={()=>Delete(item)} className="delete">X</button>
    </div>
  );
};

export default Preview;