import { useEffect, useState } from "react";

interface UseScrollPositionHook {
  scrollY: number;
}

const useScrollPosition = (): UseScrollPositionHook => {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  const handleScroll = (): void => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY };
};

export default useScrollPosition;
