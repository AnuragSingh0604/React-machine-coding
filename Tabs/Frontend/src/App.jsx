import React, { useState } from "react";
import { tabsData } from "./data";
import Tabs from "./Tabs";

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const activeTabData = tabsData[activeTab];

  return (
    <div className="container">
      <div className="tabContainer">
        {tabsData.map((item, index) => (
          <button
            key={item.id}
            className={index === activeTab ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Tabs data={activeTabData} />
    </div>
  );
};

export default App;