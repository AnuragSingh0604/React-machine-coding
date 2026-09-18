export const tabsData = [
  {
    id: "overview",
    label: "Overview",
    data: {
      title: "Dashboard Overview",
      description: "A quick overview of your workspace.",
      stats: [
        {
          label: "Total Users",
          value: 1250,
        },
        {
          label: "Active Projects",
          value: 24,
        },
        {
          label: "Completed Tasks",
          value: 856,
        },
        {
          label: "Pending Tasks",
          value: 142,
        },
      ],
    },
  },

  {
    id: "users",
    label: "Users",
    data: {
      title: "Users",
      users: [
        {
          id: 1,
          name: "Rahul Sharma",
          email: "rahul@example.com",
          role: "Admin",
          status: "Active",
        },
        {
          id: 2,
          name: "Priya Singh",
          email: "priya@example.com",
          role: "Developer",
          status: "Active",
        },
        {
          id: 3,
          name: "Amit Kumar",
          email: "amit@example.com",
          role: "Designer",
          status: "Inactive",
        },
        {
          id: 4,
          name: "Neha Verma",
          email: "neha@example.com",
          role: "Manager",
          status: "Active",
        },
      ],
    },
  },

  {
    id: "projects",
    label: "Projects",
    data: {
      title: "Projects",
      projects: [
        {
          id: 101,
          name: "E-commerce Platform",
          owner: "Rahul Sharma",
          status: "In Progress",
          progress: 65,
        },
        {
          id: 102,
          name: "HR Management System",
          owner: "Priya Singh",
          status: "Completed",
          progress: 100,
        },
        {
          id: 103,
          name: "Mobile Application",
          owner: "Amit Kumar",
          status: "Planning",
          progress: 20,
        },
      ],
    },
  },

  {
    id: "tasks",
    label: "Tasks",
    data: {
      title: "Tasks",
      tasks: [
        {
          id: 201,
          title: "Design login page",
          assignedTo: "Amit Kumar",
          priority: "High",
          status: "Completed",
        },
        {
          id: 202,
          title: "Create authentication API",
          assignedTo: "Priya Singh",
          priority: "High",
          status: "In Progress",
        },
        {
          id: 203,
          title: "Write unit tests",
          assignedTo: "Rahul Sharma",
          priority: "Medium",
          status: "Pending",
        },
        {
          id: 204,
          title: "Deploy application",
          assignedTo: "Neha Verma",
          priority: "Low",
          status: "Pending",
        },
      ],
    },
  },

  {
    id: "settings",
    label: "Settings",
    data: {
      title: "Settings",
      settings: [
        {
          id: 1,
          name: "Email Notifications",
          enabled: true,
        },
        {
          id: 2,
          name: "Push Notifications",
          enabled: false,
        },
        {
          id: 3,
          name: "Dark Mode",
          enabled: true,
        },
        {
          id: 4,
          name: "Two-Factor Authentication",
          enabled: true,
        },
      ],
    },
  },
];