import React, { useEffect, useState ,useRef} from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const intervalId=useRef(null);

  const prevHandler = () => {
     if(data.length===0) return;
    
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextHandler = () => {
     if(data.length===0) return;
    setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };
  const startInterval = () => {
   if(data.length===0) return;
  clearInterval(intervalId.current);
  intervalId.current = setInterval(nextHandler, 1000);
};
const stopInterval = () => {
  clearInterval(intervalId.current);
  intervalId.current = null;
};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=5"
        );
        const result = await response.json();

        setData(result.map((item) => item.download_url));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  useEffect(()=>{
    if(data.length===0){
      return;
    }
     startInterval();
    return ()=>(stopInterval);

  },[data.length])

  return (
    <div onMouseEnter={()=>stopInterval()} onMouseLeave={startInterval }className="container">
      {data.length > 0 && (
        <img src={data[index]} alt={`Slide ${index + 1}`} />
      )}

      <button onClick={prevHandler} className="btnLeft">
        &lt;
      </button>

      <button onClick={nextHandler} className="btnRight">
        &gt;
      </button>
    </div>
  );
};

export default App;