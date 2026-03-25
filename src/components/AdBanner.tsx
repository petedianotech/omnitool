import { useEffect, useRef } from "react";

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent multiple script injections during re-renders or React Strict Mode
    if (containerRef.current && !containerRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://walkingdrunkard.com/9fc9a6f41a43aed836682c580cbaacec/invoke.js";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-8">
      <div id="container-9fc9a6f41a43aed836682c580cbaacec" ref={containerRef}></div>
    </div>
  );
}
