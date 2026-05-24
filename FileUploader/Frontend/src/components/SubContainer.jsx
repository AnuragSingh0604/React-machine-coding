import React, { useState } from "react";

const SubContainer = ({
  handler,
  dragHandler
}) => {
  const [dragStatus, setDragStatus] =
    useState(false);

  return (
    <div
      className="subcontainer"
      style={{
        border: dragStatus
          ? "2px dashed green"
          : "2px dashed transparent"
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragStatus(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragStatus(false);
      }}
      onDrop={(e) => {
        e.preventDefault();

        setDragStatus(false);

        dragHandler(e);
      }}
    >
      <div className="iconContainer">
        <img
          src="uploader.jpg"
          alt="uploader"
        />
      </div>

      <span>Drag & Drop files here</span>

      <span>Or</span>

      <input
        id="input"
        type="file"
        onChange={handler}
        hidden
        multiple
      />

      <label htmlFor="input">
        Browse Files
      </label>
    </div>
  );
};

export default SubContainer;