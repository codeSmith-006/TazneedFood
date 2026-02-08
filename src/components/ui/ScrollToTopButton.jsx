"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-20 md:bottom-6 z-40 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
    >
      <ArrowUpOutlined />
    </button>
  );
};

export default ScrollToTopButton;
