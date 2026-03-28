import { useEffect, useRef } from "react";

export default function Preloader({ isLoading }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        ref.current?.classList.add("done");
      }, 500);
      return () => clearTimeout(timer);
    } else {
      ref.current?.classList.remove("done");
    }
  }, [isLoading]);

  return (
    <div className="preloader" ref={ref} id="preloader">
      <span>BRIDGEFX</span>
    </div>
  );
}
