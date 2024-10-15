import { useEffect } from "react";

function useToggleBodyScroll() {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []); // Empty dependency array ensures effect runs only once on mount
}
export default useToggleBodyScroll;
