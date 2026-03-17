const fileData = {
  items: {
    "1": {
      id: "1",
      name: "src",
      type: "folder",
      parentId: null,
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      name: "components",
      type: "folder",
      parentId: "1",
      children: ["5"]
    },
    "3": {
      id: "3",
      name: "App.js",
      type: "file",
      parentId: "1",
      children: []
    },
    "4": {
      id: "4",
      name: "package.json",
      type: "file",
      parentId: null,
      children: []
    },
    "5": {
      id: "5",
      name: "CommentBox.jsx",
      type: "file",
      parentId: "2",
      children: []
    }
  }
};

export default fileData;