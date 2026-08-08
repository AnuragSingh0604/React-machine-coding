import React, { useEffect, useState } from "react";
import Post from "./component/Post";

const states = {
  LOADING: "Loading",
  SUCCESS: "success",
  ERROR: "Error",
};

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState(states.LOADING);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setState(states.LOADING);

        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=3`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const newData = await res.json();

        if (ignore) return;

        if (newData.length > 0) {
          setData((prev) => [...prev, ...newData]);
          setState(states.SUCCESS);
        } else {
          setState(states.ERROR);
        }
      } catch (error) {
        if (!ignore) {
          setState(states.ERROR);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <>
      <Post
        data={data}
        setPage={setPage}
        loading={state === states.LOADING}
      />

      <div className="status">
        {state === states.LOADING && <div>Loading more...</div>}

        {state === states.ERROR && <div>Error</div>}
      </div>
    </>
  );
};

export default App;