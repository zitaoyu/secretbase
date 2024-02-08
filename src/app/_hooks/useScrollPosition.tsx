import { useState, useEffect } from "react";

interface UseScrollPositionHook {
  scrollY: number;
}

const useScrollPosition = (): UseScrollPositionHook => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = (): void => {
    if (typeof window !== "undefined") {
      setScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return { scrollY };
};

export default useScrollPosition;
