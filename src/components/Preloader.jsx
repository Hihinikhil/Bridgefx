import { useEffect, useRef } from "react";

export default function Preloader() {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.classList.add("done");
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloader" ref={ref} id="preloader">
      <span>BRIDGEFX</span>
    </div>
  );
}
