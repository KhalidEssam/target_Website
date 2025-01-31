import { useEffect } from "react";
import { useSelector } from "react-redux";

const useDirection = () => {
  const direction = useSelector((state) => state.language.direction);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
    document.body.style.direction = direction; // Ensure CSS supports it
  }, [direction]);
};

export default useDirection;
