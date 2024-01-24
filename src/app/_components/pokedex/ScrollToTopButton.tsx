"use client";
import { IoArrowUpOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      setShowButton(scrollY > screenHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return showButton ? (
    <button
      className={`fixed bottom-4 right-4 rounded-xl
                  border-2 border-default bg-content1 p-2 opacity-80 shadow-lg 
                  md:bottom-10 md:right-10 md:opacity-100`}
      onClick={scrollToTop}
    >
      <IoArrowUpOutline size={32} />
    </button>
  ) : null;
};
