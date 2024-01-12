import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
  size: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
}

const getScreenSizeCategory = (
  width: number
): "2xl" | "xl" | "lg" | "md" | "sm" | "xs" => {
  if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  } else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
  } else if (width >= 680) {
    return "sm";
  } else {
    return "xs";
  }
};

const useScreenSize = (): ScreenSize => {
  const isClient = typeof window === "object";

  const [screenSize, setScreenSize] = useState<ScreenSize>(() => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
    size: isClient ? getScreenSizeCategory(window.innerWidth) : "xs",
  }));

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setScreenSize((prev) => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight,
        size: getScreenSizeCategory(window.innerWidth),
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return screenSize;
};

export default useScreenSize;
