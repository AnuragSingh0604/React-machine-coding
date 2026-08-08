import React, { useEffect, useRef } from "react";

const Post = ({ data, setPage, loading }) => {
  const targetElement = useRef(null);

  useEffect(() => {
    const target = targetElement.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [data, setPage, loading]);

  return (
    <div className="post">
      {data.map((item, index) => (
        <img
          key={item.id}
          className="image"
          src={item.download_url}
          alt={item.author}
          loading="lazy"
          ref={
            index === data.length - 1
              ? targetElement
              : null
          }
        />
      ))}
    </div>
  );
};

export default Post;