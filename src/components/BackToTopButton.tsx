// BackToTopButton.tsx
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full shadow-xl flex items-center gap-2
        bg-white text-saffron-700 border border-saffron-300 font-medium
        hover:bg-saffron-100 transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" />
       Back to Top
    </button>
  );
};

export default BackToTopButton;
