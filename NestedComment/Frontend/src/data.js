const allComments = {
  comments: {
    "1": {
      id: "1",
      parentId: null,
      author: "Anurag",
      text: "This is the first root comment",
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      parentId: "1",
      author: "Rahul",
      text: "Reply to first comment",
      children: ["4"]
    },
    "3": {
      id: "3",
      parentId: "1",
      author: "Priya",
      text: "Another reply to first comment",
      children: []
    },
    "4": {
      id: "4",
      parentId: "2",
      author: "Karan",
      text: "Reply to Rahul",
      children: []
    },
    "5": {
      id: "5",
      parentId: null,
      author: "Sneha",
      text: "Second root comment",
      children: []
    }
  }
};

export default allComments;