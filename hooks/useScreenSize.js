import { useState, useEffect } from "react";

const useScreenSize = (props) => {
  const [screenSize, setScreenSize] = useState({ width: 375, height: 812 });

  useEffect(() => {
    const updateScreenSize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", updateScreenSize);

    updateScreenSize();
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
