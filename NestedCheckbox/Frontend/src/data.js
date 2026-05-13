const checkboxData = [
  {
    id: "1",
    label: "Frontend",
    status: "indeterminate",
    children: [
      {
        id: "2",
        label: "React",
        status: "checked",
        children: [
          {
            id: "4",
            label: "Hooks",
            status: "checked",
            children: [
              {
                id: "12",
                label: "useEffect",
                status: "checked",
                children: [
                  {
                    id: "13",
                    label: "Cleanup",
                    status: "checked",
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "5",
            label: "Context API",
            status: "checked",
            children: []
          }
        ]
      },
      {
        id: "3",
        label: "Vue",
        status: "unchecked",
        children: []
      }
    ]
  },

  {
    id: "6",
    label: "Backend",
    status: "indeterminate",
    children: [
      {
        id: "7",
        label: "Node.js",
        status: "indeterminate",
        children: [
          {
            id: "9",
            label: "Express",
            status: "checked",
            children: [
              {
                id: "14",
                label: "Middleware",
                status: "checked",
                children: [
                  {
                    id: "15",
                    label: "Auth",
                    status: "checked",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "8",
        label: "Python",
        status: "unchecked",
        children: []
      }
    ]
  },

  {
    id: "10",
    label: "Database",
    status: "unchecked",
    children: [
      {
        id: "11",
        label: "MongoDB",
        status: "unchecked",
        children: [
          {
            id: "16",
            label: "Aggregation",
            status: "unchecked",
            children: []
          }
        ]
      }
    ]
  }
];

export default checkboxData;